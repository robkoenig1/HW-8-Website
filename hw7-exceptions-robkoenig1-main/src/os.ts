/*
# 4. Operating System

The `OperatingSystem` class below is used to manage files on a computer. 
It has a method `openFile` that takes a file name and returns a `EditableFile` object,
and a method `createFile` that adds a `EditableFile` object to the list of files.

4.1. Currently, if you try to open a non-existent file, it will just create the file.
    Modify the `openFile` method to instead throw an error if the file is not found, with the message:
    "File not found: [name]" (without square brackets).

4.2. The `createFile` method should not allow files with the same name to be created.
    Modify the method to throw an error if a file with the same name already exists, with the message:
    "File already exists: [name]" (without square brackets).
*/
import { EditableFile } from "./utilities/files";

/**
 * A class representing an operating system that manages files.
 */
export class OperatingSystem {
    private files: EditableFile[] = [];
    /**
     * Open a file in the operating system. If the file is not found, throw an error.
     * @param name The name of the file to open.
     * @returns The file with the given name.
     * @throws Error if the file is not found.
     */
    openFile(name: string): EditableFile {
        for (let file of this.files) {
            if (file.getName() === name) {
                return file;
            }
        }
        return new EditableFile(name, "");
    }

    /**
     * Create a file in an operating system. If the file already exists, throw an error.
     * @param newFile The file to create.
     * @throws Error if the file already exists.
     */
    createFile(newFile: EditableFile): void {
        this.files.push(newFile);
    }
}
