/*
# 3) Time

The abstract class Time (defined in `src/utilities/abstract_time.ts`) is used to represent a period of time.
It has a single field, `amount`, which represents the number of units of time. The class has two abstract
methods, `getSeconds` and `getUnits`, which should return the number of seconds and the name of the units,
respectively. The `toString` method returns a string representation of the time, including the amount and
units (correctly pluralizing the units if necessary).

The class has been imported below. You cannot modify the `Time` class, since we will replace it with a fresh
copy when grading your code. However, you can define new classes that extend the `Time` class!

3.1. Create a subclass called `Second` that represents a period of time in seconds. The `getSeconds` method
    should return the `amount` of time, and the `getUnits` method should return the string "second" (just the literal
    value).
    **NOTE**: Make sure you extend the `Time` class!
3.2. Create a subclass called `Minute` that represents a period of time in minutes. The `getSeconds` method
    should return the `amount` of time multiplied by 60, and the `getUnits` method should return the string "minute".
3.3. Create a subclass called `Hour` that represents a period of time in hours. The `getSeconds` method
    should return the `amount` of time multiplied by 3600, and the `getUnits` method should return the string "hour".

3.4. Define a function `totalTime` that takes an array of `Time` objects and returns the total number of seconds
    represented by the objects. The function should work with any type of `Time` object, polymorphically dispatching
    the appropriate `getSeconds` method.
3.5. Define a function `describeTimes` that takes an array of `Time` objects and returns a string that describes
    the total time represented by the objects. The string should use the `toString` method of each `Time` object
    to describe the total time in the array, separating each description with a comma and a space. If there is only
    one time, the string should not contain a comma and a space.
    **HINT**: Use the `join` method of arrays to join the strings together.
3.6. Define a function `parseTime` that takes a string and returns a `Time` object. The string will be in the format
    "X units", where "X" is a number and "units" is a string. The function should return a `Second` object if "units"
    is "second", a `Minute` object if "units" is "minute", and an `Hour` object if "units" is "hour". The units
    may have an "s" at the end, if there is more than one unit. For example, "5 seconds" or "1 hour". If the string
    does not match any of these formats, the function should return a new `Second` object with an amount of 0.
    **HINT**: Use the `split` method of strings to split the string into an array of two strings, and use the `parseInt`
        function to convert a string to a number.
*/

import { Time } from "./utilities/abstract_time";

export class Second extends Time {
    constructor(input: number){
        super(input)
    }
    getSeconds(): number{
        return this.amount
    }
    getUnits(): string{
        return "second"
    }
}

export class Minute extends Time {
    constructor(input: number){
        super(input)
    }
    getSeconds(): number{
        return this.amount * 60
    }
    getUnits(): string{
        return "minute"
    }
}

export class Hour extends Time {
    constructor(input: number){
        super(input)
    }
    getSeconds(): number{
        return this.amount * 3600
    }
    getUnits(): string{
        return "hour"
    }
}

export function totalTime(input: Time[]): number{
    let total: number = 0
    for (let time of input){
        total += time.getSeconds()
    }
    return total
}

export function describeTimes(input: Time[]): string{
    let total: string[] = []
    for (let time of input){
        total.push(time.toString())
    }
    return total.join(", ")
}

export function parseTime(input:string): Time{
    let splitInput: string[] = input.split(" ");
    let inputTime: number = parseInt(splitInput[0])
    let inputUnit: string = splitInput[1]
    if (inputUnit === "second" || inputUnit === "seconds"){
        return new Second(inputTime)
    } else if (inputUnit === "minute" || inputUnit === "minutes"){
        return new Minute(inputTime)
    } else if (inputUnit === "hour" || inputUnit === "hours"){
        return new Hour(inputTime)
    }
    return new Second(0)
}