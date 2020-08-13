import Application from './ui/application.js'

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
        const tmpApp = new Application(element.getAttribute('link'), element.getAttribute('app-width'), element.getAttribute('app-height'));
        appList.push(tmpApp);
        tmpApp.addCloseEventListener(function(appRef) {
            let index = appList.findIndex(item => item === appRef);
            appList.splice(index, 1);
        });
        toggleMenu();
    }
}

document.getElementById('toggle-menu').onclick = toggleMenu;

//
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