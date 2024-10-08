/**
 * Abstract class for time
 */
export abstract class Time {
    /**
     * Creates a new time object with the given amount of time.
     * @param amount The amount of time
     */
    constructor(protected amount: number) {}
    /**
     * Gets the amount of time in seconds.
     * @returns The amount of time in seconds
     */
    abstract getSeconds(): number;
    /**
     * Gets the units of time.
     * @returns The units of time
     */
    abstract getUnits(): string;
    /**
     * Returns a string representation of the time, with proper pluralization.
     * @returns A string representation of the time
     */
    toString(): string {
        if (this.amount === 1) {
            return this.amount + " " + this.getUnits();
        } else {
            return this.amount + " " + this.getUnits() + "s";
        }
    }
}
