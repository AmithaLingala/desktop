import Paths from '../../data/paths.js'

const pathNode = document.getElementById('folders');

function generatePath(pathList, pathNode) {
    pathList.forEach(path => {
        const item = document.createElement('li');
        item.innerHTML = path.name;
        pathNode.appendChild(item);
    });
}


let pathList = new Paths().getPathList();
generatePath(pathList[0].children[1].children[0].children, pathNode);