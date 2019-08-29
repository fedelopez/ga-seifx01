const Account = function (name, balance) {
    this.name = name;
    this.balance = balance;
    this.deposit = function (amount) {
        this.balance = this.balance + amount;
    };
    this.withdraw = function (amount) {
        const total = this.balance - amount;
        if (total >= 0) {
            this.balance = total;
        }
    }
};
const Bank = function (...accounts) {
    this.accounts = accounts;
    this.addAccount = function (accountName) {
        this.accounts.push(new Account(accountName, 0));
    };
    this.deposit = function (accountName, amount) {
        const account = findAccount(this.accounts, accountName);
        account.deposit(amount);
    };
    this.withdraw = function (accountName, amount) {
        const account = findAccount(this.accounts, accountName);
        account.withdraw(amount);
    };

    function findAccount(accounts, accountName) {
        for (const account of accounts) {
            if (account.name === accountName) {
                return account;
            }
        }
        return null;
    }
};

const gringottsBank = new Bank(
    new Account('Harry Potter', 300.99),
    new Account('Ron Weasley', 100.00)
);