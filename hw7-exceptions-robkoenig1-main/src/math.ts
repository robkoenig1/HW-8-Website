/*
# 5. Math

This file defines a class named `Expression` that represents a mathematical expression.
There are also four subclasses of `Expression`:
- `Constant`, which represents a number
- `Add`, which represents the sum of two expressions
- `Sub`, which represents the difference of two expressions
- `Abs`, which represents the absolute value of an expression

5.1. Define a new subclass `Div` that represents the division of two expressions, similar to `Add` and `Sub`.
    When the `evaluate` method is called, it should evaluate the numerator and denominator.
    If the denominator is zero, then throw an error: "Division by zero".
*/

/**
 * A class representing a mathematical expression.
 */
export abstract class Expression {
    abstract evaluate(): number;
}

/**
 * A class representing a constant number expression.
 */
export class Constant extends Expression {
    constructor(private value: number) {
        super();
    }
    evaluate(): number {
        return this.value;
    }
}

/**
 * A class representing an addition expression.
 */
export class Add extends Expression {
    constructor(
        private left: Expression,
        private right: Expression,
    ) {
        super();
    }
    evaluate(): number {
        return this.left.evaluate() + this.right.evaluate();
    }
}

/**
 * A class representing a subtraction expression.
 */
export class Sub extends Expression {
    constructor(
        private left: Expression,
        private right: Expression,
    ) {
        super();
    }
    evaluate(): number {
        return this.left.evaluate() - this.right.evaluate();
    }
}

/**
 * A class representing an absolute value expression.
 */
export class Abs extends Expression {
    constructor(private expr: Expression) {
        super();
    }
    evaluate(): number {
        return Math.abs(this.expr.evaluate());
    }
}

/**
 * A function that takes a math Expression and evaluates it to a number.
 * @param expression The math Expression to evaluate.
 * @returns The result of evaluating the expression.
 */
export function evaluate(expression: Expression): number {
    return expression.evaluate();
}
