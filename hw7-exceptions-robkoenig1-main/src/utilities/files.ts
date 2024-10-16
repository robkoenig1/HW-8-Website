import { colorize } from "./colorize";

/**
 * A read-only file that has a name, size, and contents.
 */
export class BasicFile {
    /**
     * A read-only representation of a file.
     * @param name The filename
     * @param contents The contents of the file
     */
    constructor(
        protected name: string,
        protected contents: string,
    ) {}
    /**
     * Gets the name of the file.
     * @returns The name of the file
     */
    getName(): string {
        return this.name;
    }
    /**
     * Gets the size of the file.
     * @returns The size of the file
     */
    getSize(): number {
        return this.contents.length;
    }
    /**
     * Gets the contents of the file.
     * @returns The contents of the file
     */
    getContents(): string {
        return this.contents;
    }
    /**
     * Copies the file.
     * @returns A new file with the same name and contents
     */
    copy(): BasicFile {
        return new BasicFile(this.name, this.contents);
    }
}

/**
 * A file that can be modified.
 */
export class EditableFile extends BasicFile {
    /**
     * Replace the contents of the file with the given text.
     * @param text The new contents of the file
     */
    write(text: string): void {
        this.contents = text;
    }
    /**
     * Append the given text to the contents of the file.
     * @param text The text to append
     */
    append(text: string): void {
        this.contents += text;
    }
    /**
     * Copies the file.
     * @returns A new EditableFile with the same name and contents
     */
    copy(): EditableFile {
        return new EditableFile(this.name, this.contents);
    }
}

/**
 * A file that can be modified and has colorized contents.
 */
export class ColorfulFile extends EditableFile {
    /**
     * Renders the contents of the file with color.
     * @returns The colorized contents of the file
     */
    render(): string {
        return colorize(this.contents);
    }
    /**
     * Copies the file.
     * @returns A new ColorfulFile with the same name and contents
     */
    copy(): ColorfulFile {
        return new ColorfulFile(this.name, this.contents);
    }
}
