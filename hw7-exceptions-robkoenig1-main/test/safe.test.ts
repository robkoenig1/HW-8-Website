import {safeMath, SilentAccount, Laptop, colorMath} from '../src/safe';
import {Constant, Add, Div} from '../src/math';
import { OperatingSystem } from '../src/os';
import * as colorize from '../src/utilities/colorize';

describe('safeMath', () => {
    let mockedLog: jest.Mock;
    let mockedError: jest.Mock;
    beforeEach(() => {
        mockedLog = console.log = jest.fn();
        mockedError = console.error = jest.fn();
    });
    afterEach(() => {
        mockedLog.mockRestore();
        mockedError.mockRestore();
    });

    test('(1 pts) safeMath should log the correct value', () => {
        const output = mockedLog.mock.calls;
        const errors = mockedError.mock.calls;
        safeMath(new Constant(2));
        safeMath(new Add(new Constant(7), new Constant(10)));
        safeMath(new Div(new Constant(10), new Add(new Constant(3), new Constant(2))));
        expect(output[0][0]).toBe(2);
        expect(output[1][0]).toBe(17);
        expect(output[2][0]).toBe(10/5);
        expect(errors.length).toBe(0);
    });
    test('(2 pts) evaluate should throw an error', () => {
        const output = mockedLog.mock.calls;
        const errors = mockedError.mock.calls;
        safeMath(new Div(new Constant(10), new Constant(0)));
        safeMath(new Div(new Constant(-50), new Constant(0)));
        safeMath(new Div(new Constant(0), new Constant(0)));
        expect(errors[0][0].toString()).toEqual("Error: Division by zero");
        expect(errors[1][0].toString()).toEqual("Error: Division by zero");
        expect(errors[2][0].toString()).toEqual("Error: Division by zero");
        expect(output.length).toBe(0);
    });
});

describe('SilentAccount', () => {
    test('(1 pts) Can do regular deposits and withdraws', () => {
        const mySafeAccount = new SilentAccount(500);
        expect(mySafeAccount.deposit(50)).toBe(550);
        expect(mySafeAccount.withdraw(10)).toBe(10);
        expect(mySafeAccount.deposit(0)).toBe(540);
        expect(mySafeAccount.withdraw(100)).toBe(100);
        expect(mySafeAccount.deposit(25)).toBe(465);
    });
    test('(1 pts) No errors when you deposit negative amounts', () => {
        const mySafeAccount = new SilentAccount(500);
        expect(mySafeAccount.deposit(-50)).toEqual(0);
        expect(mySafeAccount.deposit(-100)).toEqual(0);
        expect(mySafeAccount.getBalance()).toBe(500);
    });
    test('(1 pts) No errors when you withdraw negative amounts', () => {
        const mySafeAccount = new SilentAccount(500);
        expect(mySafeAccount.withdraw(-50)).toEqual(0);
        expect(mySafeAccount.withdraw(-100)).toEqual(0);
        expect(mySafeAccount.getBalance()).toBe(500);
    });
    test('(1 pts) No errors when you withdraw more than the balance', () => {
        const mySafeAccount = new SilentAccount(500);
        expect(mySafeAccount.withdraw(1000)).toEqual(0);
        expect(mySafeAccount.withdraw(501)).toEqual(0);
        expect(mySafeAccount.getBalance()).toBe(500);
    });
});

describe("Laptop", () => {
    test("(1 pts) Composition, not inheritance", () => {
        const laptop = new Laptop();
        expect(laptop['os']).toBeInstanceOf(OperatingSystem);
        expect(laptop).not.toBeInstanceOf(OperatingSystem);
    });
    test("(1 pts) Simple writeFile should create new files", () => {
        const laptop = new Laptop();
        laptop.writeFile("test.txt", "Hello, world!");
        expect(laptop['os']['files'][0].getName()).toBe("test.txt");
        expect(laptop['os']['files'][0].getContents()).toBe("Hello, world!");
        laptop.writeFile("test2.txt", "Hola, mundo!");
        expect(laptop['os']['files'][1].getName()).toBe("test2.txt");
        expect(laptop['os']['files'][1].getContents()).toBe("Hola, mundo!");
    });
    test("(1 pts) writeFile overwrites existing files", () => {
        const laptop = new Laptop();
        laptop.writeFile("test.txt", "Hello, world!");
        expect(laptop['os']['files'][0].getName()).toBe("test.txt");
        expect(laptop['os']['files'][0].getContents()).toBe("Hello, world!");
        laptop.writeFile("test.txt", "Hola, mundo!");
        expect(laptop['os']['files'][0].getName()).toBe("test.txt");
        expect(laptop['os']['files'][0].getContents()).toBe("Hola, mundo!");
    });
    test("(1 pts) loadStartupFile should return the contents of the file", () => {
        const laptop = new Laptop();
        laptop.writeFile("startup.txt", "Hello, world!");
        expect(laptop.loadStartupFile()).toBe("Hello, world!");
    });
    test("(1 pts) loadStartupFile should throw an error if the file doesn't exist", () => {
        const laptop = new Laptop();
        expect(() => laptop.loadStartupFile()).toThrow("Startup file not found");
    });
});

describe("colorMath", () => {
    let mockedLog: jest.SpyInstance;
    beforeEach(() => {
        mockedLog = jest.spyOn(colorize, 'colorLog');
    });
    afterEach(() => {
        mockedLog.mockRestore();
    });

    test('(2 pts) colorMath should log a working value', () => {
        colorMath(new Constant(2));
        colorMath(new Add(new Constant(7), new Constant(10)));
        colorMath(new Div(new Constant(10), new Add(new Constant(3), new Constant(2))));
        const output = mockedLog.mock.calls
                .map((args: string[]) => args.join(""))
                .join("\n");
        expect(output).toEqual("[blue]2\n[reset]\n[blue]17\n[reset]\n[blue]2\n[reset]");
    });
    test('(2 pts) colorMath should log a working Oh no! message', () => {
        colorMath(new Div(new Constant(10), new Constant(0)));
        colorMath(new Div(new Constant(-50), new Constant(0)));
        colorMath(new Div(new Constant(0), new Constant(0)));
        const output = mockedLog.mock.calls
                .map((args: string[]) => args.join(""))
                .join("\n");
        expect(output).toEqual("[yellow]Oh no!\n[reset]\n[yellow]Oh no!\n[reset]\n[yellow]Oh no!\n[reset]");
    });
});