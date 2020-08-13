import Process from '/script/process.js';
import Paths from '/data/paths.js';

export default class Application extends Process {
    /**
     * 
     * @param {string} title Title of the current window.
     * @param {number} pid process-id for the current window. 
     * @param {number} ppid process-id for the parent.
     * @param {number} cms Command that launched this window, it is usually the path to app. 
     */
    constructor(link) {
        super('pid', 'ppid', 'title', 'cmd')
        this.box = document.createElement('div');
        this.box.style.backgroundColor = '#424242'
        this.box.classList.add('resize');
        const header = document.createElement('div');
        header.style.height = "20px";
        header.style.width = "100%";
        header.style.backgroundColor = "#000000";

        const frame = document.createElement('iframe');
        frame.src = link;
        frame.style.width = "100%";
        frame.style.height = "calc(100% - 25px)";

        this.box.appendChild(header);
        this.box.appendChild(frame);

        this.x = 200;
        this.y = 100;
        this.xOffset = 0;
        this.yOffset = 0;
        this.width = 500;
        this.headerHeight = 50;
        this.height = 200;
        this.setX(this.x);
        this.setY(this.y);
        this.box.style.position = 'absolute';
        this.box.style.width = (this.width + "px");
        this.box.style.height = (this.headerHeight + this.height + "px");


        document.body.appendChild(this.box);
        this.title = 'title';
        this.pwd = Paths.user;

    }

    getWidth() {
        return this.box.width;
    }
    setX(x) {
        this.x = x + this.xOffset;
        this.box.style.left = this.x + "px";
    }

    setY(y) {
        this.y = y + this.yOffset;
        this.box.style.top = this.y + "px";
    }

    /** Closes the window. This action does not free up resources used by the window, to do that, call exit() */
    close() {

    }

    /** Terminates the window and free up resources held by it */
    exit() {

    }

    /** Brings the window to forground */
    show() {

    }
}

const header = document.getElementById('header');