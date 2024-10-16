import { OperatingSystem } from "../src/os";
import { EditableFile } from "../src/utilities/files";

describe('OperatingSystem', () => {
    describe("OperatingSystem Class", () => {
        test('(1 pts) should be able to create an instance', () => {
            let os = new OperatingSystem();
            expect(os).toBeInstanceOf(OperatingSystem);
        });
        test("(1 pts) should be able to open an existing file", () => {
            let os = new OperatingSystem();
            let file1 = new EditableFile("first.txt", "Hello, world!");
            let file2 = new EditableFile("second.txt", "Hola, mundo!");
            let file3 = new EditableFile("third.txt", "[blue]Wow![reset]");
            os.createFile(file1);
            os.createFile(file2);
            os.createFile(file3);
            expect(os.openFile("first.txt")).toEqual(file1);
            expect(os.openFile("second.txt")).toEqual(file2);
            expect(os.openFile("third.txt")).toEqual(file3);
        });
        test("(1 pts) should be able to create a new EditableFile", () => {
            let os = new OperatingSystem();
            let file = new EditableFile("test.txt", "Hello, world!");
            os.createFile(file);
            expect(os['files'][0]).toEqual(file);

            let os2 = new OperatingSystem();
            let file1 = new EditableFile("first.txt", "Hello, world!");
            let file2 = new EditableFile("second.txt", "Hola, mundo!");
            let file3 = new EditableFile("third.txt", "[blue]Wow![reset]");
            os2.createFile(file1);
            os2.createFile(file2);
            os2.createFile(file3);
            expect(os2['files']).toEqual([file1, file2, file3]);
        });
        
        test("(2 pts) should throw an error when opening a non-existent file", () => {
            let os = new OperatingSystem();
            let file1 = new EditableFile("apple.txt", "Hello, world!");
            let file2 = new EditableFile("banana.txt", "Hola, mundo!");
            os.createFile(file1);
            os.createFile(file2);
            expect(() => os.openFile("orange.txt")).toThrow("File not found: orange.txt");
            expect(() => os.openFile("grape.txt")).toThrow("File not found: grape.txt");
        });
        test("(2 pts) should throw an error when creating a file with the same name", () => {
            let os = new OperatingSystem();
            let file1 = new EditableFile("apple.txt", "Hello, world!");
            let file2 = new EditableFile("banana.txt", "Hola, mundo!");
            os.createFile(file1);
            os.createFile(file2);
            expect(() => {os.createFile(new EditableFile("apple.txt", "Hola, mundo!"))}).toThrow("File already exists: apple.txt");
            expect(() => {os.createFile(new EditableFile("banana.txt", "Hello, world!"))}).toThrow("File already exists: banana.txt");
        });
    });
});