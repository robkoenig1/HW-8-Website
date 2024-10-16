/*
The BankAccount class below has a private balance field and three methods: deposit, withdraw, and getBalance. 
The deposit and withdraw methods modify the balance field, and the getBalance method returns the current balance.
*/

/**
 * Represents a bank account.
 */
export class BankAccount {
    private balance: number;
    constructor(balance: number) {
        this.balance = balance;
    }
    /**
     * Increase the balance by the given amount.
     * @param amount The amount to deposit.
     * @returns The new balance.
     */
    deposit(amount: number): number {
        this.balance += amount;
        return this.balance;
    }
    /**
     * Decrease the balance by the given amount.
     * @param amount The amount to withdraw.
     * @returns The amount withdrawn.
     */
    withdraw(amount: number): number {
        this.balance -= amount;
        return amount;
    }
    /**
     * Get the current balance.
     * @returns The current balance.
     */
    getBalance(): number {
        return this.balance;
    }
}