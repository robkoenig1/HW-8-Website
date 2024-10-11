/*
# 6) History

The History class (defined in `src/utilities/abstract_history.ts`) is basically a thin wrapper
around a private array of immutable Action objects, detailing the history of some events. The
History class provides methods for adding and removing action records, as well as counting and
listing the actions.

Our senior colleague has requested an extension to the History class that limits the number of
actions it can remember. This new class, called LimitedHistory, should inherit from History and
add a limit to the number of actions it can hold. When the limit is exceeded, the oldest actions
should be removed.

There are a few other differences too:
- The addRecord method now returns ALL the records, instead of just the new one
- The countRecords ALWAYS returns the limit, instead of the actual number of records
- The removeRecord method now increments a removals counter

6.1. Create a class called `LimitedHistory` that extends the `History` class. The `LimitedHistory`
    class should have a private field `limit` that represents the maximum number of actions that
    can be remembered and another private field `removals` that represents the number of actions
    that have been removed. The constructor should take a limit as an argument, and initialize the
    removals to zero.
6.2. In `LimitedHistory`, override the `count` method to return the limit, instead of the actual
    number of actions.
6.3. In `LimitedHistory`, override the `remove` method to increment the removals counter and then
    call the `remove` method of the parent class using `super`.
6.4. In `LimitedHistory`, override the `add` method to remove the oldest action if the limit is
    exceeded. Note very carefully the precise order of operations:
    - Add the new action using the `add` method of the PARENT class
    - If the actual number of actions (accessible via the `count` method of the PARENT class) exceeds
        the limit (accessible via the `count` method of the CHILD class), call the `remove` method of 
        the CHILD class.
    - Return the toString representation of THIS class (not the added action instance).
    **NOTE**: In some places, it doesn't matter if you use `super` or `this`. But in other places,
        it matters a lot. In fact, calling the wrong method will cause your code to infinitely recurse,
        which will crash the program when it runs out of memory. So be very careful about which method
        you call!
 */
import { Action, History } from "./utilities/abstract_history";

export class LimitedHistory extends History {
    private limit: number;
    private removals: number;

    constructor(_limit: number) {
        super();
        this.limit = _limit;
        this.removals = 0;
    }

    count(): number {
        return this.limit;
    }

    remove(): void {
        this.removals++;
        super.remove();
    }

    add(input: Action): string {
        super.add(input);
        if (super.count() > this.count()) {
            this.remove();
        }
        return this.toString();
    }
}
