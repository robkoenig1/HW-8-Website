/*
# 2. ExceptionalAccount

The BankAccount class available from the utilities/bank module has a deposit method that allows negative 
amounts to be deposited, and a withdraw method that allows more money to be withdrawn than is available.
It also has a getBalance method (but that one is fine).

2.1. Create a new class called ExceptionalAccount that extends BankAccount and overrides the deposit and
withdraw methods to throw an error if a negative amount is deposited or if more money is withdrawn than is available.

The errors should have the following messages (without square brackets):
- Cannot deposit negative amount [amount]
- Cannot withdraw negative amount [amount]
- Cannot withdraw [amount], only [balance] available

Use the `super` keyword to call the parent class methods and reuse their functionality.
You will not need to provide a constructor for the ExceptionalAccount class.
*/
import { BankAccount } from "./utilities/bank";

export class ExceptionalAccount extends BankAccount {
    deposit(amount: number): number {
        if (amount < 0) {
            throw new Error("Cannot deposit negative amount " + amount);
        }
        return super.deposit(amount);
    }

    withdraw(amount: number): number {
        if (amount < 0) {
            throw new Error("Cannot withdraw negative amount " + amount);
        }
        if (amount > super.getBalance()) {
            throw new Error(
                "Cannot withdraw " +
                    amount +
                    ", only " +
                    super.getBalance() +
                    " available",
            );
        }
        return super.withdraw(amount);
    }
}
