import { Pixel, makeColor } from "../src/pixel";

describe('Pixel class', () => {
    describe('Constructor', () => {
        test('(1 pts) Create Instance', () => {
            expect(new Pixel(0, 0, 0)).toEqual({ red: 0, green: 0, blue: 0 });
            expect(new Pixel(10, 77, 50)).toEqual({ red: 10, green: 77, blue: 50 });
            expect(new Pixel(255, 255, 255)).toEqual({ red: 255, green: 255, blue: 255 });
        });

        test('(1 pts) Create Instance with Invalid Values', () => {
            expect(new Pixel(-1, -1, -1)).toEqual({ red: -1, green: -1, blue: -1 });
            expect(new Pixel(55, -1, 44)).toEqual({ red: 55, green: -1, blue: 44 });
            expect(new Pixel(-50, 100, -44)).toEqual({ red: -50, green: 100, blue: -44 });
            expect(new Pixel(256, 256, 256)).toEqual({ red: 256, green: 256, blue: 256 });
            expect(new Pixel(256, 34, 27)).toEqual({ red: 256, green: 34, blue: 27 });
        });
    });

    describe('getRGB', () => {
        test('(1 pts) Get RGB works normally', () => {
            expect(new Pixel(0, 0, 0).getRGB()).toBe('rgb(0, 0, 0)');
            expect(new Pixel(40, 30, 20).getRGB()).toBe('rgb(40, 30, 20)');
            expect(new Pixel(255, 255, 255).getRGB()).toBe('rgb(255, 255, 255)');
        });

        test('(2 pts) getRGB throws an error for negative values', () => {
            expect(() => new Pixel(-1, 0, 0).getRGB()).toThrow('Invalid RGB values: -1, 0, 0');
            expect(() => new Pixel(0, -1, 0).getRGB()).toThrow('Invalid RGB values: 0, -1, 0');
            expect(() => new Pixel(0, 0, -1).getRGB()).toThrow('Invalid RGB values: 0, 0, -1');
            expect(() => new Pixel(-1, -1, -1).getRGB()).toThrow('Invalid RGB values: -1, -1, -1');
        });
        test('(2 pts) getRGB throws an error for values over 255', () => {
            expect(() => new Pixel(256, 0, 0).getRGB()).toThrow('Invalid RGB values: 256, 0, 0');
            expect(() => new Pixel(0, 256, 0).getRGB()).toThrow('Invalid RGB values: 0, 256, 0');
            expect(() => new Pixel(0, 0, 256).getRGB()).toThrow('Invalid RGB values: 0, 0, 256');
            expect(() => new Pixel(256, 256, 256).getRGB()).toThrow('Invalid RGB values: 256, 256, 256');
        });
        test('(1 pts) getRGB throws an error for mixing invalid values', () => {
            expect(() => new Pixel(-100, 128, 780).getRGB()).toThrow('Invalid RGB values: -100, 128, 780');
            expect(() => new Pixel(780, -100, 128).getRGB()).toThrow('Invalid RGB values: 780, -100, 128');
            expect(() => new Pixel(128, 780, -100).getRGB()).toThrow('Invalid RGB values: 128, 780, -100');
        });
    });
});

describe('makeColor', () => {
    test('(3 pts) Can make primary colors', () => {
        expect(makeColor("red")).toEqual(new Pixel(255, 0, 0));
        expect(makeColor("green")).toEqual(new Pixel(0, 255, 0));
        expect(makeColor("blue")).toEqual(new Pixel(0, 0, 255));
    });
    test('(3 pts) Other colors do not work', () => {
        expect(() => makeColor("yellow")).toThrow('Unknown color: yellow');
        expect(() => makeColor("purple")).toThrow('Unknown color: purple');
        expect(() => makeColor("orange")).toThrow('Unknown color: orange');
        expect(() => makeColor("cyan")).toThrow('Unknown color: cyan');
        expect(() => makeColor("ada")).toThrow('Unknown color: ada');
    });
});