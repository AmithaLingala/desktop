import Application from './ui/application.js'
import AppList from '../data/apps.js';

const appList = [];

// Toggle app menu visibility
function toggleMenu() {
    const classes = document.getElementById('menu-drawer').classList;
    if (classes.contains('hide')) {
        classes.remove('hide');
    } else {
        classes.add('hide');
    }
}

// Generate category button
function generateCategoryButton(id, categoryName) {
    const wrapper = document.createElement('div');
    const categoryBtn = document.createElement('input');
    const categoryLabel = document.createElement('label');
    categoryBtn.type = 'radio';
    categoryBtn.name = 'radio';
    categoryBtn.id = 'radio-' + id;
    categoryBtn.value = categoryName;
    categoryLabel.htmlFor = 'radio-' + id;
    categoryLabel.innerHTML = categoryName;

    wrapper.appendChild(categoryBtn);
    wrapper.appendChild(categoryLabel);

    // Display apps belong to specific category on click
    categoryBtn.onclick = () => {
        const x = document.getElementsByClassName('appHolder');
        for (let i = 0; i < x.length; i++) {
            x[i].classList.add('hide');
        }
        document.getElementById(categoryName.replace(' ', '-')).classList.remove('hide');
    };
    return wrapper;
}

// Generate App list holder
function generateCategoryHolder(id, apps) {
    const categoryHolder = document.createElement('div');
    categoryHolder.id = id;
    categoryHolder.classList.add('hide', 'appHolder');
    for (let element of apps) {
        const tmpButton = document.createElement('button');
        tmpButton.classList.add('launcher');
        tmpButton.textContent = element.name;
        categoryHolder.appendChild(tmpButton);
        categoryHolder.appendChild(document.createElement('br'));

        tmpButton.onclick = () => {
            const tmpApp = new Application(element.link, element.width, element.height);
            appList.push(tmpApp);
            tmpApp.addCloseEventListener(function(appRef) {
                let index = appList.findIndex(item => item === appRef);
                appList.splice(index, 1);
            });

            // hide menu on app launch
            toggleMenu();
        }
    }
    return categoryHolder;
}

function generateAppMenuList(categoryName, apps) {
    // id to be used for buttons
    const id = categoryName.replace(' ', '-');

    // categories and wrapper for app list
    const categories = document.getElementById('categories');
    const genAppList = document.getElementById('app-list');

    categories.appendChild(generateCategoryButton(id, categoryName));
    genAppList.appendChild(generateCategoryHolder(id, apps));
}

function generateAppCategories() {
    const allApps = [];
    const categorizedApps = AppList.getApps();
    for (let key of Object.keys(categorizedApps)) {
        allApps.push(...categorizedApps[key]);
    }
    generateAppMenuList("All Applications", allApps);
    for (let key of Object.keys(categorizedApps)) {
        generateAppMenuList(key, categorizedApps[key]);
    }
    document.getElementById('All-Applications').classList.remove('hide');
}

document.getElementById('toggle-menu').onclick = toggleMenu;

/* Handle window drags  */
let isMouseDown = false;
let app = undefined;
window.addEventListener("mousemove", function(e) {
    if (isMouseDown && app !== undefined) {
        app.setX(e.x);
        app.setY(e.y);
    }
});

window.addEventListener("mousedown", function(e) {

    const X = e.x;
    const Y = e.y
    app = appList.find(app => !(app.x > X ||
        app.y > Y ||
        app.x + app.getWidth() < X ||
        app.y + app.headerHeight < Y
    ));

    if (app !== undefined) {
        isMouseDown = true;
        app.xOffset = app.x - X;
        app.yOffset = app.y - Y;
    }
    const rect = document.getElementById('menu-drawer').getBoundingClientRect();

    if ((rect.left > X ||
            rect.top > Y ||
            rect.left + rect.right < X ||
            rect.top + rect.bottom < Y
        )) {
        document.getElementById('menu-drawer').classList.add('hide');
    }
});
window.addEventListener("mouseup", function() {
    isMouseDown = false;
    app = null;
});

// Initialize and generate app menu
generateAppCategories();