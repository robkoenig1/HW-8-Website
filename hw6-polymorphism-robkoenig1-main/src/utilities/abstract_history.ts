/**
 * An immutable record of an action.
 */
export class Action {
    /**
     * Creates a new action with the given title and time.
     * @param title The title of the action
     * @param when The time the action occurred
     */
    constructor(
        private title: string,
        private when: number,
    ) {}
    /**
     * Gets the title of the action.
     * @returns The title of the action
     */
    getTitle(): string {
        return this.title;
    }
    /**
     * Gets the time the action occurred.
     * @returns The time the action occurred
     */
    getWhen(): number {
        return this.when;
    }
    /**
     * Returns a string representation of the action.
     * @returns A string representation of the action
     */
    toString(): string {
        return this.title + " at " + this.when;
    }
}

/**
 * A history of actions.
 */
export class History {
    /**
     * The list of actions.
     */
    private actions: Action[] = [];
    /**
     * Adds an action to the history.
     * @param action The action to add
     * @returns A string representation of the action
     */
    add(action: Action): string {
        this.actions.push(action);
        return action.toString();
    }
    /**
     * Removes the most oldest action from the history.
     */
    remove(): void {
        this.actions.shift();
    }
    /**
     * Returns the number of actions in the history.
     * @returns The number of actions in the history
     */
    count(): number {
        return this.actions.length;
    }
    /**
     * Returns a string representation of the history.
     * @returns A string representation of the history
     */
    toString(): string {
        let lines = [];
        for (let i = 0; i < this.count(); i++) {
            lines.push(i + ") " + this.actions[i]);
        }
        return lines.join("\n");
    }
}
