import Application from '/script/ui/application.js'

const appList = [];

function toggleMenu() {
    const classes = document.getElementById('menu-drawer').classList;
    if (classes.contains('hide')) {
        classes.remove('hide');
    } else {
        classes.add('hide');
    }
}

for (let element of document.getElementsByClassName('launcher')) {
    element.onclick = () => {
        const app = new Application(element.getAttribute('link'));
        appList.push(app);
        toggleMenu();
    }
}

document.getElementById('toggle-menu').onclick = toggleMenu;

//
let mouse_down = false;
let app = null;
window.addEventListener("mousemove", function(e) {
    if (mouse_down && app) {
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

    if (app) {
        mouse_down = true;
        app.xOffset = app.x - X;
        app.yOffset = app.y - Y;
    }
});
window.addEventListener("mouseup", function() {
    mouse_down = false;
    app = null;
});