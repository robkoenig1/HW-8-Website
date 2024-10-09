/*
# 2) Operating Systems

The `OperatingSystem` class below is used to manage files on a computer. 
It has methods for opening files of different types. However, the current
implementation uses separate methods for opening each type of file. This
makes the code difficult to maintain and extend.

2.1. Refactor the `OperatingSystem` class to have:
    - a single private `files` field (choose an appropriate type for this field, based on
        Polymorphism. You should NOT create any new classes for this field),
    - an `openFile` method that takes a string and returns a `BasicFile` object.
        If the file is not found, then return a new `BasicFile` object with the given
        name and an empty string as the contents.
    - a single `createFile` methods that consumes a `BasicFile` object and adds it to 
        the `files` field.
2.2. Create a new function called `makeTestOS` that consumes nothing and returns
    a new OperatingSystem object with several files. The OS should contain (in order):
    - one `BasicFile` with the name "first.txt" and the contents "Hello, world!"
    - one `EditableFile` with the name "second.txt" and the contents "Hola, mundo!"
    - one `ColorfulFile` with the name "third.txt" and the contents "[blue]Wow![reset]"
*/

import { BasicFile, ColorfulFile, EditableFile } from "./utilities/files";

export class OperatingSystem {
    private files: BasicFile[] = [];

    openFile(name: string): BasicFile {
        for (let file of this.files) {
            if (file.getName() === name) {
                return file;
            }
        }
        return new BasicFile(name, "");
    }

    createFile(newFile: BasicFile): void {
        this.files.push(newFile);
    }
    /*
    private readOnlyFiles: BasicFile[] = [];
    private editableFiles: EditableFile[] = [];
    private colorfulFiles: ColorfulFile[] = [];

    addReadOnlyFile(newFile: BasicFile): void {
        this.readOnlyFiles.push(newFile);
    }
    addEditableFile(newFile: EditableFile): void {
        this.editableFiles.push(newFile);
    }
    addColorfulFile(newFile: ColorfulFile): void {
        this.colorfulFiles.push(newFile);
    }

    openReadOnlyFile(name: string): BasicFile {
        for (let file of this.readOnlyFiles) {
            if (file.getName() === name) {
                return file;
            }
        }
        return new BasicFile(name, "");
    }
    openEditableFile(name: string): EditableFile {
        for (let file of this.editableFiles) {
            if (file.getName() === name) {
                return file;
            }
        }
        return new EditableFile(name, "");
    }
    openColorfulFile(name: string): ColorfulFile {
        for (let file of this.colorfulFiles) {
            if (file.getName() === name) {
                return file;
            }
        }
        return new ColorfulFile(name, "");
    }
    */
}

export function makeTestOS(): OperatingSystem{
    let newOS: OperatingSystem = new OperatingSystem()
    newOS.createFile(new BasicFile("first.txt", "Hello, world!"))
    newOS.createFile(new BasicFile("second.txt", "Hola, mundo!"))
    newOS.createFile(new BasicFile("third.txt", "[blue]Wow![reset]"))
    return newOS
}
