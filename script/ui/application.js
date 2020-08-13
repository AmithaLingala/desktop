import Process from '../process.js';
import Paths from '../../data/paths.js';

export default class Application extends Process {
    /**
     * 
     * @param {string} title Title of the current window.
     * @param {number} pid process-id for the current window. 
     * @param {number} ppid process-id for the parent.
     * @param {number} cms Command that launched this window, it is usually the path to app. 
     */
    constructor(link, appWidth, appHeight) {
        super('pid', 'ppid', 'title', 'cmd')

        // Position variables
        this.x = 200;
        this.y = 100;
        this.xOffset = 0;
        this.yOffset = 0;
        this.width = !appWidth ? 500 : appWidth;
        this.headerHeight = 25;
        this.height = !appHeight ? 500 : appHeight;

        this._box = document.createElement('div');
        this._header = document.createElement('div');
        const button = document.createElement('button');
        button.textContent = "X";
        button.onclick = () => this.close();
        this._frame = document.createElement('iframe');
        this._frame.src = link;
        this._setupApp();

        this._header.appendChild(button);
        this._box.appendChild(this._header);
        this._box.appendChild(this._frame);


        document.body.appendChild(this._box);
        this.title = 'title';
        this.pwd = Paths.user;
        this.closeEvent = null;
    }

    _setupApp() {

        // Generate app window
        this._box.style.backgroundColor = '#424242'
        this._box.classList.add('resize');

        // Title bar
        this._header.style.height = this.headerHeight + "px";
        this._header.style.width = "100%";
        this._header.style.backgroundColor = "#000000";

        // Window content
        this._frame.style.width = "calc(100% - 5px)";
        this._frame.style.height = "calc(100% - 30px)";

        // Position app
        this.setX(this.x);
        this.setY(this.y);
        this._box.style.position = 'absolute';
        this._box.style.width = (this.width + "px");
        this._box.style.height = (parseInt(this.headerHeight) + parseInt(this.height) + "px");
    }

    getWidth() {
        return this._box.width;
    }
    setX(x) {
        this.x = x + this.xOffset;
        this._box.style.left = this.x + "px";
    }

    setY(y) {
        this.y = y + this.yOffset;
        this._box.style.top = this.y + "px";
    }

    /** Closes the window. This action does not free up resources used by the window, to do that, call exit() */
    close() {
        this._box.remove();
        if (this.closeEvent) {
            this.closeEvent.call({}, this);
        }
    }
    addCloseEventListener(listener) {
        this.closeEvent = listener;
    }

    /** Terminates the window and free up resources held by it */
    exit() {

    }

    /** Brings the window to forground */
    show() {

    }
}

const header = document.getElementById('header');