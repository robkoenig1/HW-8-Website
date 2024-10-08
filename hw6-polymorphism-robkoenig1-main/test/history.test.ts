import { LimitedHistory } from "../src/history";
import { Action } from "../src/utilities/abstract_history";

describe("LimitedHistory", () => {
    describe("LimitedHistory Class", () => {
        test("(1 pts) should be able to create an instance", () => {
            let history = new LimitedHistory(5);
            expect(history).toBeInstanceOf(LimitedHistory);
            // Sneakily check the private variables
            expect(history["limit"]).toEqual(5);
            expect(history["actions"]).toEqual([]);
            expect(history["removals"]).toEqual(0);
        });
        test("(1 pts) should be able to call toString()", () => {
            let history = new LimitedHistory(3);
            expect(history.toString()).toEqual(
                "0) undefined\n1) undefined\n2) undefined",
            );
            history.add(new Action("first", 0));
            expect(history.toString()).toEqual(
                "0) first at 0\n1) undefined\n2) undefined",
            );
            history.add(new Action("second", 50));
            expect(history.toString()).toEqual(
                "0) first at 0\n1) second at 50\n2) undefined",
            );
            history.add(new Action("third", 100));
            expect(history.toString()).toEqual(
                "0) first at 0\n1) second at 50\n2) third at 100",
            );
        });
        test("(1 pts) the count should be constant", () => {
            let history = new LimitedHistory(5);
            history.add(new Action("first", 0));
            expect(history.count()).toBe(5);
            history.add(new Action("second", 50));
            expect(history.count()).toBe(5);
            history.add(new Action("third", 100));
            expect(history.count()).toBe(5);
            history.add(new Action("fourth", 150));
            expect(history.count()).toBe(5);
            history.add(new Action("fifth", 200));
            expect(history.count()).toBe(5);
            history.add(new Action("sixth", 250));
            expect(history.count()).toBe(5);
            // And try making another history with a different limit
            history = new LimitedHistory(10);
            expect(history.count()).toBe(10);
        });
        test("(1 pts) should be able to remove history", () => {
            let history = new LimitedHistory(10);
            history.add(new Action("first", 0));
            history.add(new Action("second", 50));
            history.add(new Action("third", 100));
            history.add(new Action("fourth", 150));
            history.add(new Action("fifth", 200));
            expect(history["actions"]).toEqual([
                new Action("first", 0),
                new Action("second", 50),
                new Action("third", 100),
                new Action("fourth", 150),
                new Action("fifth", 200),
            ]);
            history.remove();
            expect(history["actions"]).toEqual([
                new Action("second", 50),
                new Action("third", 100),
                new Action("fourth", 150),
                new Action("fifth", 200),
            ]);
            history.remove();
            expect(history["actions"]).toEqual([
                new Action("third", 100),
                new Action("fourth", 150),
                new Action("fifth", 200),
            ]);
            history.remove();
            history.remove();
            expect(history["actions"]).toEqual([new Action("fifth", 200)]);
            history.add(new Action("sixth", 250));
            expect(history["actions"]).toEqual([
                new Action("fifth", 200),
                new Action("sixth", 250),
            ]);
            history.remove();
            history.remove();
            expect(history["actions"]).toEqual([]);
            expect(history["removals"]).toEqual(6);
        });
        test("(1 pts) should be able to add to history", () => {
            let history = new LimitedHistory(5);
            let actions = [
                new Action("first", 0),
                new Action("second", 50),
                new Action("third", 100),
            ];
            history.add(actions[0]);
            expect(history["actions"]).toEqual([actions[0]]);
            history.add(actions[1]);
            expect(history["actions"]).toEqual([actions[0], actions[1]]);
            history.add(actions[2]);
            expect(history["actions"]).toEqual([
                actions[0],
                actions[1],
                actions[2],
            ]);
        });
        test("(4 pts) adding respects the rules", () => {
            let history = new LimitedHistory(3);
            let actions = [
                new Action("A", 25),
                new Action("B", 55),
                new Action("C", 82),
                new Action("D", 99),
                new Action("E", 120),
                new Action("F", 129),
            ];
            expect(history.add(actions[0])).toEqual(
                "0) A at 25\n1) undefined\n2) undefined",
            );
            expect(history.add(actions[1])).toEqual(
                "0) A at 25\n1) B at 55\n2) undefined",
            );
            expect(history.add(actions[2])).toEqual(
                "0) A at 25\n1) B at 55\n2) C at 82",
            );
            // And now we've bumped out the old element!
            expect(history.add(actions[3])).toEqual(
                "0) B at 55\n1) C at 82\n2) D at 99",
            );
            expect(history.add(actions[4])).toEqual(
                "0) C at 82\n1) D at 99\n2) E at 120",
            );
            expect(history.add(actions[5])).toEqual(
                "0) D at 99\n1) E at 120\n2) F at 129",
            );
            expect(history["removals"]).toEqual(3);
        });
    });
});
