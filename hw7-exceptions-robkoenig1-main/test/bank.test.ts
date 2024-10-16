import {ExceptionalAccount} from "../src/bank";

describe("ExceptionalAccount", () => {
    test("(1 pts) Can do regular deposits and withdraws", () => {
        const mySafeAccount = new ExceptionalAccount(500);
        expect(mySafeAccount.deposit(50)).toBe(550);
        // Remember, withdraw returns the amount withdrawn
        expect(mySafeAccount.withdraw(10)).toBe(10);
        // Remember, deposit returns the new balance
        expect(mySafeAccount.deposit(0)).toBe(540);
        expect(mySafeAccount.withdraw(100)).toBe(100);
        expect(mySafeAccount.deposit(25)).toBe(465);
    });
    test("(2 pts) Throw errors when you deposit negative amounts", () => {
        const mySafeAccount = new ExceptionalAccount(500);
        expect(() => mySafeAccount.deposit(-50)).toThrow("Cannot deposit negative amount -50");
        expect(() => mySafeAccount.deposit(-100)).toThrow("Cannot deposit negative amount -100");
        expect(mySafeAccount.getBalance()).toBe(500);
    });
    test("(2 pts) Throw errors when you withdraw negative amounts", () => {
        const mySafeAccount = new ExceptionalAccount(500);
        expect(() => mySafeAccount.withdraw(-50)).toThrow("Cannot withdraw negative amount -50");
        expect(() => mySafeAccount.withdraw(-100)).toThrow("Cannot withdraw negative amount -100");
        expect(mySafeAccount.getBalance()).toBe(500);
    });
    test("(2 pts) Throw errors when you withdraw more than the balance", () => {
        const mySafeAccount = new ExceptionalAccount(500);
        // Cannot withdraw more than the balance
        expect(() => mySafeAccount.withdraw(1000)).toThrow("Cannot withdraw 1000, only 500 available");
        expect(() => mySafeAccount.withdraw(501)).toThrow("Cannot withdraw 501, only 500 available");
        expect(mySafeAccount.getBalance()).toBe(500);
    });
});