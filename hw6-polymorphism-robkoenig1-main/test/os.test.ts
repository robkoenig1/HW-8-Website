import { OperatingSystem, makeTestOS } from "../src/os";
import { BasicFile, EditableFile, ColorfulFile } from "../src/utilities/files";

describe("OperatingSystem", () => {
    describe("OperatingSystem Class", () => {
        test("(1 pts) should be able to create an instance", () => {
            let os = new OperatingSystem();
            expect(os).toBeInstanceOf(OperatingSystem);
        });
        test("(1 pts) should be able to create a BasicFile", () => {
            let os = new OperatingSystem();
            let file = new BasicFile("test.txt", "Hello, world!");
            os.createFile(file);
            expect(os["files"][0]).toEqual(file);
        });
        test("(1 pts) should be able to open a file", () => {
            let os = new OperatingSystem();
            let file = new BasicFile("test.txt", "Hello, world!");
            os.createFile(file);
            expect(os.openFile("test.txt")).toEqual(file);
        });
        test("(1 pts) should be able to open a file that doesn't exist", () => {
            let os = new OperatingSystem();
            expect(os.openFile("test.txt")).toEqual(
                new BasicFile("test.txt", ""),
            );
        });
        test("(1 pts) should be able to create an EditableFile", () => {
            let os = new OperatingSystem();
            let file = new EditableFile("test.txt", "Hello, world!");
            os.createFile(file);
            expect(os["files"][0]).toEqual(file);
        });
        test("(1 pts) should be able to create a ColorfulFile", () => {
            let os = new OperatingSystem();
            let file = new ColorfulFile("test.txt", "Hello, world!");
            os.createFile(file);
            expect(os["files"][0]).toEqual(file);
        });
        test("(2 pts) should be able to create several files", () => {
            let os = new OperatingSystem();
            let file1 = new BasicFile("first.txt", "Hello, world!");
            let file2 = new EditableFile("second.txt", "Hola, mundo!");
            let file3 = new ColorfulFile("third.txt", "[blue]Wow![reset]");
            os.createFile(file1);
            os.createFile(file2);
            os.createFile(file3);
            expect(os["files"]).toEqual([file1, file2, file3]);
        });
        test("(2 pts) should be able to open several files", () => {
            let os = new OperatingSystem();
            let file1 = new BasicFile("first.txt", "Hello, world!");
            let file2 = new EditableFile("second.txt", "Hola, mundo!");
            let file3 = new ColorfulFile("third.txt", "[blue]Wow![reset]");
            os.createFile(file1);
            os.createFile(file2);
            os.createFile(file3);
            expect(os.openFile("first.txt")).toEqual(file1);
            expect(os.openFile("second.txt")).toEqual(file2);
            expect(os.openFile("third.txt")).toEqual(file3);
            expect(os.openFile("fourth.txt")).toEqual(
                new BasicFile("fourth.txt", ""),
            );
        });
        test("(2 pts) should be able to open a few different novel files", () => {
            let os = new OperatingSystem();
            let file1 = new ColorfulFile(
                "history.log",
                "[red]The year is 2020[reset]",
            );
            let file2 = new BasicFile(
                "todo.txt",
                "1. Finish this quiz\n2. Submit it\n3. Profit",
            );
            let file3 = new EditableFile(
                "notes.txt",
                "I need to remember to do the following:\n\n",
            );
            os.createFile(file1);
            os.createFile(file2);
            os.createFile(file3);
            expect(os.openFile("history.log")).toEqual(file1);
            expect(os.openFile("todo.txt")).toEqual(file2);
            expect(os.openFile("notes.txt")).toEqual(file3);
            expect(os.openFile("journal.txt")).toEqual(
                new BasicFile("journal.txt", ""),
            );
            os.createFile(
                new BasicFile(
                    "journal.txt",
                    "Dear Diary,\n\nToday was a good day.",
                ),
            );
            expect(os.openFile("journal.txt")).toEqual(
                new BasicFile(
                    "journal.txt",
                    "Dear Diary,\n\nToday was a good day.",
                ),
            );
        });
    });
    describe("makeTestOS Function", () => {
        test("(1 pts) should return an OperatingSystem", () => {
            let os = makeTestOS();
            expect(os).toBeInstanceOf(OperatingSystem);
            expect(os.openFile("first.txt")).toEqual(
                new BasicFile("first.txt", "Hello, world!"),
            );
            expect(os.openFile("second.txt")).toEqual(
                new EditableFile("second.txt", "Hola, mundo!"),
            );
            expect(os.openFile("third.txt")).toEqual(
                new ColorfulFile("third.txt", "[blue]Wow![reset]"),
            );
        });
    });
});
