import Process from "./process.js";

export default class Session {
    /**
     * 
     * @param {number} session_id create a new session with provided session-id 
     */
    constructor(session_id) {
        /** @type {Process[]} */
        this.processList = [];

        /** @type {number} */
        this.session_id = session_id;
    }

    /**
     * Add a new process to the current session.
     * 
     * @param {Process} process - The process to add.
     */
    addProcess(process) {
        this.processList.push(process);
    }

    /**
     * Close the session and kill all active process.
     * @returns {void}
     */
    async close() {
        processList.forEach(process => {
            await process.kill();
        });
    }

    /**
     * Kill the process tagged to given process-id if it is in current session.
     *
     * @param {number} process_id - The process-id to kill.
     * @returns {number} process kill status.
     */
    kill(process_id) {
        const index = this.processList.findIndex(process => process.process_id === process_id);
        this.processList[index].kill().then(() => this.processList.splice(index, 0));
    }
}