import { Pixel } from "../src/pixel";
import {Screen} from "../src/screen";

describe("Screen", () => {
    describe("Constructor", () => {
        test("(1 pts) Can make normal sized screens", () => {
            const red = new Pixel(255, 0, 0);
            const green = new Pixel(0, 255, 0);
            const blue = new Pixel(0, 0, 255);
            const topRow = [red, green, blue];
            const bottomRow = [green, blue, red];
            const pixels = [topRow, bottomRow];
            const screen = new Screen(pixels);
            const validateScreen = (screen: Screen) => {
                expect(screen.getPixel(0, 0)).toEqual(red);
                expect(screen.getPixel(0, 1)).toEqual(green);
                expect(screen.getPixel(0, 2)).toEqual(blue);
                expect(screen.getPixel(1, 0)).toEqual(green);
                expect(screen.getPixel(1, 1)).toEqual(blue);
                expect(screen.getPixel(1, 2)).toEqual(red);
                // Now check mutability is okay; must still be a deep copy!
                expect(screen.getPixel(0, 0)).not.toBe(red);
                expect(screen.getPixel(0, 1)).not.toBe(green);
                expect(screen.getPixel(0, 2)).not.toBe(blue);
                expect(screen.getPixel(1, 0)).not.toBe(green);
                expect(screen.getPixel(1, 1)).not.toBe(blue);
                expect(screen.getPixel(1, 2)).not.toBe(red);
            };
            validateScreen(screen);
            // Now break the original arrays
            topRow.pop();
            topRow.pop();
            topRow.pop();
            bottomRow.pop();
            bottomRow.pop();
            bottomRow.pop();
            pixels.pop();
            pixels.pop();
            // And double check that our screen is still okay
            validateScreen(screen);
        });
        test("(3 pts) Throw errors when you make non-rectangular screens", () => {
            const red = new Pixel(255, 0, 0);
            const green = new Pixel(0, 255, 0);
            const blue = new Pixel(0, 0, 255);
            // Empty screen is fine
            expect(() => new Screen([])).not.toThrow();
            // Non-rectangular screen
            expect(() => new Screen([[red], [green, blue]])).toThrow("Input array is not rectangular");
            expect(() => new Screen([[red, green], [blue]])).toThrow("Input array is not rectangular");
            expect(() => new Screen([[red, green], [blue, red, green]])).toThrow("Input array is not rectangular");
            expect(() => new Screen([
                [red, green, blue], 
                [blue, red, green], 
                [green, blue, red, green]])).toThrow("Input array is not rectangular");
            expect(() => new Screen([
                [red, red, red],
                [red, red, red],
                [red, red, red],
                [red, red, red, red],
                [red, red, red]
            ])).toThrow("Input array is not rectangular");
        });
    });
    describe("getPixel", () => {
        test("(1 pts) Get Pixel works normally", () => {
            const red = new Pixel(255, 0, 0);
            const green = new Pixel(0, 255, 0);
            const blue = new Pixel(0, 0, 255);
            const screen = new Screen([
                [red, green, blue],
                [green, blue, red]
            ]);
            expect(screen.getPixel(0, 0)).toEqual(red);
            expect(screen.getPixel(0, 1)).toEqual(green);
            expect(screen.getPixel(0, 2)).toEqual(blue);
            expect(screen.getPixel(1, 0)).toEqual(green);
            expect(screen.getPixel(1, 1)).toEqual(blue);
            expect(screen.getPixel(1, 2)).toEqual(red);
        });
        test("(2 pts) getPixel throws an error for out of bounds", () => {
            const red = new Pixel(255, 0, 0);
            const green = new Pixel(0, 255, 0);
            const blue = new Pixel(0, 0, 255);
            const screen = new Screen([
                [red, green, blue],
                [green, blue, red]
            ]);
            expect(() => screen.getPixel(-1, 0)).toThrow("Index out of bounds: -1, 0");
            expect(() => screen.getPixel(0, 3)).toThrow("Index out of bounds: 0, 3");
            expect(() => screen.getPixel(2, 0)).toThrow("Index out of bounds: 2, 0");
            expect(() => screen.getPixel(2, 3)).toThrow("Index out of bounds: 2, 3");
            expect(() => screen.getPixel(3, 0)).toThrow("Index out of bounds: 3, 0");
            expect(() => screen.getPixel(3, 3)).toThrow("Index out of bounds: 3, 3");
            expect(() => screen.getPixel(0, -1)).toThrow("Index out of bounds: 0, -1");
        });
    });
    describe("setPixel", () => {
        test("(1 pts) Set Pixel works normally", () => {
            const red = new Pixel(255, 0, 0);
            const green = new Pixel(0, 255, 0);
            const blue = new Pixel(0, 0, 255);
            const screen = new Screen([
                [red, green, blue],
                [green, blue, red]
            ]);
            const yellow = new Pixel(255, 255, 0);
            screen.setPixel(0, 0, yellow);
            expect(screen.getPixel(0, 0)).toEqual(yellow);
            screen.setPixel(0, 1, yellow);
            expect(screen.getPixel(0, 1)).toEqual(yellow);
            screen.setPixel(0, 2, yellow);
            expect(screen.getPixel(0, 2)).toEqual(yellow);
            screen.setPixel(1, 0, yellow);
            expect(screen.getPixel(1, 0)).toEqual(yellow);
            screen.setPixel(1, 1, yellow);
            expect(screen.getPixel(1, 1)).toEqual(yellow);
            screen.setPixel(1, 2, yellow);
            expect(screen.getPixel(1, 2)).toEqual(yellow);
        });
        test("(2 pts) setPixel throws an error for out of bounds", () => {
            const red = new Pixel(255, 0, 0);
            const green = new Pixel(0, 255, 0);
            const blue = new Pixel(0, 0, 255);
            const screen = new Screen([
                [red, green, blue],
                [green, blue, red]
            ]);
            const yellow = new Pixel(255, 255, 0);
            expect(() => {screen.setPixel(-1, 0, yellow)}).toThrow("Index out of bounds: -1, 0");
            expect(() => {screen.setPixel(0, 3, yellow)}).toThrow("Index out of bounds: 0, 3");
            expect(() => {screen.setPixel(2, 0, yellow)}).toThrow("Index out of bounds: 2, 0");
            expect(() => {screen.setPixel(2, 3, yellow)}).toThrow("Index out of bounds: 2, 3");
            expect(() => {screen.setPixel(3, 0, yellow)}).toThrow("Index out of bounds: 3, 0");
            expect(() => {screen.setPixel(3, 3, yellow)}).toThrow("Index out of bounds: 3, 3");
            expect(() => {screen.setPixel(0, -1, yellow)}).toThrow("Index out of bounds: 0, -1");
        });
    });
});