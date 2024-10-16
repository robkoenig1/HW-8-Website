import {Expression, Constant, Add, Sub, Abs, Div, evaluate} from '../src/math';

describe('Expression', () => {
    describe("Existing Class", () => {
        test('(1 pts) evaluate should return the correct value', () => {
            let constant = new Constant(2);
            expect(constant.evaluate()).toBe(2);
            constant = new Constant(0);
            expect(constant.evaluate()).toBe(0);
            constant = new Constant(-50);
            expect(constant.evaluate()).toBe(-50);
            // Add class
            let add = new Add(new Constant(2), new Constant(3));
            expect(add.evaluate()).toBe(5);
            add = new Add(new Constant(0), new Constant(0));
            expect(add.evaluate()).toBe(0);
            add = new Add(new Constant(-50), new Constant(5));
            expect(add.evaluate()).toBe(-45);
            // Sub class
            let sub = new Sub(new Constant(2), new Constant(3));
            expect(sub.evaluate()).toBe(-1);
            sub = new Sub(new Constant(0), new Constant(0));
            expect(sub.evaluate()).toBe(0);
            sub = new Sub(new Constant(-50), new Constant(5));
            expect(sub.evaluate()).toBe(-55);
            // Abs class
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
    describe("Div Class", () => {
        test('(1 pts) Normal division should be fine', () => {
            let div = new Div(new Constant(10), new Constant(2));
            expect(div.evaluate()).toBe(10/2);
            div = new Div(new Constant(0), new Constant(10));
            expect(div.evaluate()).toBe(0);
            div = new Div(new Constant(-50), new Constant(5));
            expect(div.evaluate()).toBe(-50/5);
        });
        test('(2 pts) Division by zero should throw an error', () => {
            let div = new Div(new Constant(10), new Constant(0));
            expect(() => div.evaluate()).toThrow("Division by zero");
            div = new Div(new Constant(-50), new Constant(0));
            expect(() => div.evaluate()).toThrow("Division by zero");
            div = new Div(new Constant(0), new Constant(0));
            expect(() => div.evaluate()).toThrow("Division by zero");
        });
    });
    describe("evaluate Function", () => {
        test('(1 pts) works for existing stuff', () => {
            expect(evaluate(new Constant(2))).toBe(2);
            expect(evaluate(new Constant(-23))).toBe(-23);
            expect(evaluate(new Constant(0))).toBe(0);
            // Addition
            expect(evaluate(new Add(new Constant(2), new Constant(3)))).toBe(5);
            expect(evaluate(new Add(new Constant(-2), new Constant(3)))).toBe(1);
            expect(evaluate(new Add(new Constant(2), new Constant(-3)))).toBe(-1);
            // Subtraction
            expect(evaluate(new Sub(new Constant(2), new Constant(3)))).toBe(-1);
            expect(evaluate(new Sub(new Constant(-2), new Constant(3)))).toBe(-5);
            expect(evaluate(new Sub(new Constant(2), new Constant(-3)))).toBe(5);
            // Absolute value
            expect(evaluate(new Abs(new Constant(2)))).toBe(2);
            expect(evaluate(new Abs(new Constant(-2)))).toBe(2);
            expect(evaluate(new Abs(new Constant(0)))).toBe(0);
            expect(evaluate(new Abs(new Constant(-100)))).toBe(100);
            // Complex stuff
            // 1 + 3
            let expr: Expression = new Add(new Constant(1), new Constant(3));
            expect(evaluate(expr)).toBe(4);
            // 2 + 3 - |-4| = 1
            expr = new Add(new Constant(2), new Sub(new Constant(3), new Abs(new Constant(-4))));
            expect(evaluate(expr)).toBe(1);
            // |2- (3+4)| = 5
            expr = new Abs(new Sub(new Constant(2), new Add(new Constant(3), new Constant(4))));
            expect(evaluate(expr)).toBe(5);
            // | 100 - 200 |
            expr = new Abs(new Sub(new Constant(100), new Constant(200)));
            expect(evaluate(expr)).toBe(100);
        });
        test("(1 pts) works for division", () => {
            let div = new Div(new Constant(10), new Constant(2));
            expect(evaluate(div)).toBe(10/2);
            div = new Div(new Constant(0), new Constant(10));
            expect(evaluate(div)).toBe(0);
            div = new Div(new Constant(-50), new Constant(5));
            expect(evaluate(div)).toBe(-50/5);
            expect(()=> evaluate(new Div(new Constant(10), new Constant(0)))).toThrow("Division by zero");

            let complex = new Div(new Add(new Constant(10), new Constant(5)), new Constant(3));
            expect(evaluate(complex)).toBe((10+5)/3);
            complex = new Div(new Sub(new Constant(10), new Constant(5)), new Constant(3));
            expect(evaluate(complex)).toBe((10-5)/3);
            complex = new Div(new Constant(10), new Sub(new Constant(3), new Constant(3)));
            expect(()=> evaluate(complex)).toThrow("Division by zero");
        });
    });
});