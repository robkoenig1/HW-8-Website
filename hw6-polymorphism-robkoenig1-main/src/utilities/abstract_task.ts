/**
 * Task class representing some work to be completed.
 */
export class Task {
    /**
     * Whether the task is done.
     */
    private done: boolean = false;
    /**
     * Creates a new task with the given title.
     * @param title The title of the task
     */
    constructor(public title: string) {}
    /**
     * Marks the task as done.
     */
    finish() {
        this.done = true;
    }
    /**
     * Returns whether the task is done.
     * @returns Whether the task is done.
     */
    isDone(): boolean {
        return this.done;
    }
}
