/*
# 5) Math

In this file, you are going to define a class named `Expression` that represents a mathematical expression.
This abstract class will have an abstract method `evaluate` that returns a number.
Then, you will define four subclasses of `Expression`:
- `Constant`, which represents a number
- `Add`, which represents the sum of two expressions
- `Sub`, which represents the difference of two expressions
- `Abs`, which represents the absolute value of an expression

At the bottom, there is a function `evaluate` that takes an `Expression` object and returns the result of evaluating it.
You will define your classes before the function, and then the function will use your classes to evaluate expressions.
Check out the tests to see how this class and its subclasses should behave in practice in conjunction with the function.
You may find the construction a little strange, but this is actually a common way of representing mathematical expressions
in programming languages.

5.1. Define the abstract `Expression` class. It should have an abstract method `evaluate` that returns a number.
5.2. Define a subclass `Constant` that extends `Expression` and represents a number. The class should have a private
    field `value` that is set in the constructor. Implement the `evaluate` method to simply return the `value` field.
5.3. Define a subclass `Add` that extends `Expression` and represents the sum of two expressions. The class should have
    two private fields `left` and `right` that are set in the constructor. Implement the `evaluate` method to return the
    sum of the results of evaluating the `left` and `right` fields.
5.4. Define a subclass `Sub` that extends `Expression` and represents the difference of two expressions. The class should
    have two private fields `left` and `right` that are set in the constructor. Implement the `evaluate` method to return the
    difference of the results of evaluating the `left` and `right` fields.
5.5. Define a subclass `Abs` that extends `Expression` and represents the absolute value of an expression. The class should
    have a private field `inner` that is set in the constructor. Implement the `evaluate` method to return the absolute
    value of the result of evaluating the `inner` field using the `Math.abs` builtin function.
*/

export abstract class Expression {
    evaluate(): number {
        return 0;
    }
}

export class Constant extends Expression {
    private value: number;

    constructor(_value: number) {
        super();
        this.value = _value;
    }

    evaluate(): number {
        return this.value;
    }
}

export class Add extends Expression {
    private left: number;
    private right: number;

    constructor(_left: Expression, _right: Expression) {
        super();
        this.left = _left.evaluate();
        this.right = _right.evaluate();
    }

    evaluate(): number {
        return this.left + this.right;
    }
}

export class Sub extends Expression {
    private left: number;
    private right: number;

    constructor(_left: Expression, _right: Expression) {
        super();
        this.left = _left.evaluate();
        this.right = _right.evaluate();
    }

    evaluate(): number {
        return this.left - this.right;
    }
}

export class Abs extends Expression {
    private inner: number;

    constructor(_inner: Expression) {
        super();
        this.inner = _inner.evaluate();
    }

    evaluate(): number {
        return Math.abs(this.inner);
    }
}

export function evaluate(expression: Expression): number {
    return expression.evaluate();
}
