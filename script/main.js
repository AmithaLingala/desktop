import Application from './ui/application.js'
import AppList from '../data/apps.js';

const appList = [];
const appDrawer = document.getElementById('menu-drawer');

function toggleMenu() {
    const classes = document.getElementById('menu-drawer').classList;
    if (classes.contains('hide')) {
        classes.remove('hide');
    } else {
        classes.add('hide');
    }
}

for (let element of AppList.getApps()) {
    const tmpButton = document.createElement('button');
    tmpButton.classList.add('launcher');
    tmpButton.textContent = element.name;
    appDrawer.appendChild(tmpButton);
    appDrawer.appendChild(document.createElement('br'));

    tmpButton.onclick = () => {
        const tmpApp = new Application(element.link, element.width, element.height);
        appList.push(tmpApp);
        tmpApp.addCloseEventListener(function(appRef) {
            let index = appList.findIndex(item => item === appRef);
            appList.splice(index, 1);
        });
        toggleMenu();
    }
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
    app = appList.find(app => !(app.x > e.x ||
        app.y > e.y ||
        app.x + app.getWidth() < e.x ||
        app.y + app.headerHeight < e.y
    ));

    if (app !== undefined) {
        isMouseDown = true;
        app.xOffset = app.x - X;
        app.yOffset = app.y - Y;
    }
});
window.addEventListener("mouseup", function() {
    isMouseDown = false;
    app = null;
});