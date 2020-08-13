
export class Path {
    /**
     * A new path
     * @param {string} name name of file/folder.
     * @param {Path} parent absolute path of the parent, this path will be added in the parents child list.
     * @param {Patth[]} children child directories and files.
     */
    constructor(name, parent, children = []) {
        this.name = name;
        this.parent = parent;
        this.children = children;
        if (parent !== null) {
            this.parent.appendChild(this);
            this.path = parent.path + '/' + name;
        } else {
            this.path = '/' + name;
        }
    }

    /** Append children to this path
     * @param {Path[]} children child path list.
     */
    appendChildren(children) {
        this.children.push(...children);
    }


    /** Append a child to this path
     * @param {Path} child child path.
     */
    appendChild(child) {
        this.children.push(child);
    }
}

export default class Paths {
    constructor() {
        this._path_list = [];
        const root = new Path('/', null);
        
        this._path_list.push(root);
        new Path('root', root);
        const home = new Path('home', root);
        new Path('bin', root);
        new Path('opt', root);
        new Path('etc', root);
        new Path('proc', root);
        new Path('var', root);
        new Path('dev', root);
        this.user = new Path('user', home);
        this.videos = new Path('Videos', this.user);
        this.music = new Path('Music', this.user);
        this.pictures = new Path('Pictures', this.user);
        this.documents = new Path('Documents', this.user);
        this.desktop = new Path('Desktop', this.user);
    }
    getPathList() {
        return this._path_list;;
    }

    /** Update the path list with a new one (applicable only to the current session, when a new session is created, path list will change back to default) 
     * @param {Path[]} list list of new path
    */
    updatePathList(list) {
        this._path_list.splice(0, this._path_list.length, ...list);
    }
}
