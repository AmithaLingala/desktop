export default class Process {
    /**
     * Creates a process with the given process id
     * @param {number} pid process-id of this process.
     * @param {number} ppid process-id of the parent process.
     * @param {string} name name of current process.
     * @param {string} command command that started this process.
     */
    constructor(pid, ppid, name, command) {
        this.pid = pid;
        this.ppid = ppid;
        this.name = name;
        this.command = command;
    }

    /**
     * Kill the current process and free up resources.
     * @returns {Promise<void>}
     */
    async kill() {

    }
}