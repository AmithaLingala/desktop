import Paths from '../../data/paths.js'

let pathNode = null;

let pathList = new Paths().user;
let pathHistory = [pathList];
let curentHistoryIndex = 0;

function generatePath() {
    if (pathNode) {
        pathNode.remove();
    }
    if (pathList.children.length === 0) {
        document.getElementById('placeholder').classList.remove('hide');
        return;
    }
    document.getElementById('placeholder').classList.add('hide');
    pathNode = document.createElement('dl');
    pathNode.id = "folders";
    pathNode.classList.add("folder-container");
    pathList.children.forEach(path => {
        const box = document.createElement('div');
        box.classList.add('folder-container');
        const itemdt = document.createElement('dt');
        const itemdd = document.createElement('dd');
        itemdd.onclick = itemdt.onclick = () => {
            pathHistory.splice(curentHistoryIndex + 1);
            pathList = path;
            pathHistory.push(pathList);
            curentHistoryIndex += 1;
            generatePath();
        };
        itemdt.classList.add('folder');
        itemdd.innerHTML = path.name;
        box.appendChild(itemdt);
        box.appendChild(itemdd);
        pathNode.appendChild(box);
    });
    document.getElementById("window").appendChild(pathNode);
}

document.getElementById('back').onclick = () => {
    if (curentHistoryIndex - 1 >= 0) {
        pathList = pathHistory[curentHistoryIndex - 1];
        curentHistoryIndex -= 1;
    }
    pathHistory.push(pathList);
    generatePath();
};


document.getElementById('next').onclick = () => {
    if (curentHistoryIndex + 1 < pathHistory.length) {
        pathList = pathHistory[curentHistoryIndex + 1];
        curentHistoryIndex += 1;
    }
    pathHistory.push(pathList);
    generatePath();
};
document.getElementById('parent').onclick = () => {
    if (pathList.parent) {
        pathList = pathList.parent;
        pathHistory.push(pathList);
        curentHistoryIndex += 1;
        generatePath();
    }
};
generatePath();