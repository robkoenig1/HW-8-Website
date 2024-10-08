import { TimedTask } from "../src/task";

describe("TimedTask", () => {
    describe("TimedTask Class", () => {
        test("(1 pts) should be able to create an instance", () => {
            let task = new TimedTask("test", 5);
            expect(task).toBeInstanceOf(TimedTask);
            expect(task.title).toEqual("test");
            expect(task.duration).toEqual(5);
        });
        test("(3 pts) isDone works correctly", () => {
            let task = new TimedTask("Homework", 120);
            expect(task.isDone()).toBe(false);
            task.finish();
            expect(task.isDone()).toBe(false);
            task.duration = 0;
            expect(task.isDone()).toBe(true);
            task.duration = 100;
            expect(task.isDone()).toBe(false);
        });
        test("(3 pts) More isDone works correctly", () => {
            let task = new TimedTask("Gardening", 50);
            expect(task.isDone()).toBe(false);
            task.duration = 0;
            expect(task.isDone()).toBe(false);
            task.finish();
            expect(task.isDone()).toBe(true);
        });
    });
});
