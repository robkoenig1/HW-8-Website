import { Expression, Constant, Add, Sub, Abs, evaluate } from "../src/math";

describe("Expression", () => {
    describe("Constant Class", () => {
        test("(1 pts) should return the correct value", () => {
            let constant = new Constant(2);
            expect(constant.evaluate()).toBe(2);
            constant = new Constant(0);
            expect(constant.evaluate()).toBe(0);
            constant = new Constant(-50);
            expect(constant.evaluate()).toBe(-50);
        });
    });
    describe("Add Class", () => {
        test("(1 pts) should return the correct value", () => {
            let add = new Add(new Constant(2), new Constant(3));
            expect(add.evaluate()).toBe(5);
            add = new Add(new Constant(0), new Constant(0));
            expect(add.evaluate()).toBe(0);
            add = new Add(new Constant(-50), new Constant(5));
            expect(add.evaluate()).toBe(-45);
        });
    });
    describe("Sub Class", () => {
        test("(1 pts) should return the correct value", () => {
            let sub = new Sub(new Constant(2), new Constant(3));
            expect(sub.evaluate()).toBe(-1);
            sub = new Sub(new Constant(0), new Constant(0));
            expect(sub.evaluate()).toBe(0);
            sub = new Sub(new Constant(-50), new Constant(5));
            expect(sub.evaluate()).toBe(-55);
        });
    });
    describe("Abs Class", () => {
        test("(1 pts) should return the correct value", () => {
            let abs = new Abs(new Constant(-2));
            expect(abs.evaluate()).toBe(2);
            abs = new Abs(new Constant(2));
            expect(abs.evaluate()).toBe(2);
            abs = new Abs(new Constant(0));
            expect(abs.evaluate()).toBe(0);
            abs = new Abs(new Constant(-100));
            expect(abs.evaluate()).toBe(100);
        });
    });
    describe("evaluate Function", () => {
        test("(1 pts) works for constants", () => {
            expect(evaluate(new Constant(2))).toBe(2);
            expect(evaluate(new Constant(-23))).toBe(-23);
            expect(evaluate(new Constant(0))).toBe(0);
        });
        test("(1 pts) works for adds", () => {
            expect(evaluate(new Add(new Constant(2), new Constant(3)))).toBe(5);
            expect(evaluate(new Add(new Constant(-2), new Constant(3)))).toBe(
                1,
            );
            expect(evaluate(new Add(new Constant(2), new Constant(-3)))).toBe(
                -1,
            );
        });
        test("(1 pts) works for subs", () => {
            expect(evaluate(new Sub(new Constant(2), new Constant(3)))).toBe(
                -1,
            );
            expect(evaluate(new Sub(new Constant(-2), new Constant(3)))).toBe(
                -5,
            );
            expect(evaluate(new Sub(new Constant(2), new Constant(-3)))).toBe(
                5,
            );
        });
        test("(1 pts) works for abs", () => {
            expect(evaluate(new Abs(new Constant(2)))).toBe(2);
            expect(evaluate(new Abs(new Constant(-2)))).toBe(2);
            expect(evaluate(new Abs(new Constant(0)))).toBe(0);
            expect(evaluate(new Abs(new Constant(-100)))).toBe(100);
        });
        test("(1 pts) works for complex combinations", () => {
            // 1 + 3
            let expr: Expression = new Add(new Constant(1), new Constant(3));
            expect(evaluate(expr)).toBe(4);
            // 2 + 3 - |-4| = 1
            expr = new Add(
                new Constant(2),
                new Sub(new Constant(3), new Abs(new Constant(-4))),
            );
            expect(evaluate(expr)).toBe(1);
            // |2- (3+4)| = 5
            expr = new Abs(
                new Sub(
                    new Constant(2),
                    new Add(new Constant(3), new Constant(4)),
                ),
            );
            expect(evaluate(expr)).toBe(5);
            // | 100 - 200 |
            expr = new Abs(new Sub(new Constant(100), new Constant(200)));
            expect(evaluate(expr)).toBe(100);
        });
    });
});
