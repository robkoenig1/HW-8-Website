/*
# 4) Task

The class `Task` (defined inside `src/utilities/abstract_tasks.ts`) is used to represent a task that can be
completed. It has a private field `done` that indicates whether the task has been completed. The class
has a method `finish` that marks the task as done, and a method `isDone` that returns whether the task is done.
The class has been imported into this file, so it is available to be used.

4.1. Create a subclass called `TimedTask` that represents a task with a duration. The duration is a number
    of seconds that must pass before the task is considered done. The constructor should take a title and a
    duration (both of which can be public).
4.2. In `TimedTask`, override the `isDone` method to return whether the task has been finished AND that
    the duration is now zero or less. You will need to use the `super` keyword to call the `isDone` method
    of the parent class, within the `isDone` method of the subclass.
*/

import { Task } from "./utilities/abstract_task";

export class TimedTask extends Task {
    public duration: number;

    constructor(_title: string, _duration: number) {
        super(_title);
        this.duration = _duration;
    }

    isDone(): boolean {
        if (super.isDone() && this.duration <= 0) {
            return true;
        }
        return false;
    }
}
