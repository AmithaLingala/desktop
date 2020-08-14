import Paths from '../../data/paths.js'

const pathNode = document.getElementById('folders');

function generatePath(pathList, pathNode) {
    pathList.forEach(path => {
        const itemdt = document.createElement('dt');
        const itemdd = document.createElement('dd');
        itemdt.classList.add('folder');
        itemdd.innerHTML = path.name;
        pathNode.appendChild(itemdt);
        pathNode.appendChild(itemdd);
    });
}


let pathList = new Paths().getPathList();
generatePath(pathList[0].children[1].children[0].children, pathNode);