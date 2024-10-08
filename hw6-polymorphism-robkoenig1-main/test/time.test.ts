import {
    Hour,
    Minute,
    Second,
    describeTimes,
    parseTime,
    totalTime,
} from "../src/time";
import { Time } from "../src/utilities/abstract_time";

describe("Time", () => {
    describe("Second Class", () => {
        test("(1 pts) should return the correct number of seconds", () => {
            let second = new Second(2);
            expect(second.getSeconds()).toBe(2);
            second = new Second(1);
            expect(second.getSeconds()).toBe(1);
            second = new Second(50);
            expect(second.getSeconds()).toBe(50);
        });
        test("(1 pts) should return the correct units", () => {
            let second = new Second(2);
            expect(second.getUnits()).toBe("second");
        });
    });
    describe("Minute Class", () => {
        test("(1 pts) should return the correct number of seconds", () => {
            let minute = new Minute(2);
            expect(minute.getSeconds()).toBe(60 * 2);
            minute = new Minute(55);
            expect(minute.getSeconds()).toBe(60 * 55);
        });
        test("(1 pts) should return the correct units", () => {
            let minute = new Minute(2);
            expect(minute.getUnits()).toBe("minute");
        });
    });

    describe("Hour Class", () => {
        test("(1 pts) should return the correct number of seconds", () => {
            let hour = new Hour(2);
            expect(hour.getSeconds()).toBe(60 * 60 * 2);
            hour = new Hour(5);
            expect(hour.getSeconds()).toBe(60 * 60 * 5);
        });
        test("(1 pts) should return the correct units", () => {
            let hour = new Hour(2);
            expect(hour.getUnits()).toBe("hour");
        });
    });

    describe("totalTime Function", () => {
        test("(1 pts) should handle empty case", () => {
            let times: Time[] = [];
            expect(totalTime(times)).toBe(0);
        });
        test("(1 pts) should handle only one class", () => {
            let times: Time[] = [new Hour(50)];
            expect(totalTime(times)).toBe(3600 * 50);
        });
        test("(1 pts) should handle all three classes", () => {
            let times: Time[] = [new Hour(2), new Minute(2), new Second(2)];
            expect(totalTime(times)).toBe(3600 * 2 + 60 * 2 + 1 * 2);
        });
        test("(1 pts) should handle more complex combo of classes", () => {
            let times: Time[] = [
                new Hour(2),
                new Minute(2),
                new Second(2),
                new Hour(1),
                new Minute(1),
                new Second(1),
            ];
            expect(totalTime(times)).toBe(3600 * 3 + 60 * 3 + 3);
        });
    });

    describe("describeTimes Function", () => {
        test("(1 pts) should handle empty case", () => {
            let times: Time[] = [];
            expect(describeTimes(times)).toBe("");
        });
        test("(1 pts) should handle only one class", () => {
            let times: Time[] = [new Hour(50)];
            expect(describeTimes(times)).toBe("50 hours");
        });
        test("(1 pts) should handle all three classes", () => {
            let times: Time[] = [new Hour(2), new Minute(2), new Second(2)];
            expect(describeTimes(times)).toBe("2 hours, 2 minutes, 2 seconds");
        });
        test("(1 pts) should handle all three classes, singular", () => {
            let times: Time[] = [new Hour(1), new Minute(1), new Second(1)];
            expect(describeTimes(times)).toBe("1 hour, 1 minute, 1 second");
        });
        test("(1 pts) should handle more complex combo of classes", () => {
            let times: Time[] = [
                new Hour(2),
                new Minute(2),
                new Second(2),
                new Hour(1),
                new Minute(1),
                new Second(1),
            ];
            expect(describeTimes(times)).toBe(
                "2 hours, 2 minutes, 2 seconds, 1 hour, 1 minute, 1 second",
            );
        });
    });

    describe("parseTime Function", () => {
        test("(1 pts) should handle 1 second", () => {
            expect(parseTime("1 second")).toEqual(new Second(1));
        });
        test("(1 pts) should handle 1 minute", () => {
            expect(parseTime("1 minute")).toEqual(new Minute(1));
        });
        test("(1 pts) should handle 1 hour", () => {
            expect(parseTime("1 hour")).toEqual(new Hour(1));
        });
        test("(1 pts) should handle 2 seconds", () => {
            expect(parseTime("2 seconds")).toEqual(new Second(2));
        });
        test("(1 pts) should handle 2 minutes", () => {
            expect(parseTime("2 minutes")).toEqual(new Minute(2));
        });
        test("(1 pts) should handle 2 hours", () => {
            expect(parseTime("2 hours")).toEqual(new Hour(2));
        });
        test("(1 pts) should handle messed up time", () => {
            expect(parseTime("50 doggos")).toEqual(new Second(0));
        });
    });
});
