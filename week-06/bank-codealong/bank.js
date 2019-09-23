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
    };
    this.displayString = function () {
        return `${this.name}: $${this.balance}`;
    }
};
const Bank = function (...accounts) {
    this.accounts = accounts;
    this.addAccount = function (accountName) {
        this.accounts.push(new Account(accountName, 0));
    };
    this.removeAccount = function (accountName) {
        const account = this.findAccount(accountName);
        const index = this.accounts.indexOf(account);
        this.accounts.splice(index, 1);
    };
    this.deposit = function (accountName, amount) {
        const account = this.findAccount(accountName);
        account.deposit(amount);
    };
    this.withdraw = function (accountName, amount) {
        const account = this.findAccount(accountName);
        account.withdraw(amount);
    };
    this.findAccount = function(accountName) {
        for (const account of this.accounts) {
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

function displayAccounts(bank) {
    const accountList = $("#account-list");
    accountList.empty();
    for (const account of bank.accounts) {
        const li = `<li>${account.displayString()}</li>`;
        accountList.append(li);
    }
}

$('#add-account-button').click(function() {
    const accountName = $('#account').val();
    gringottsBank.addAccount(accountName);
    displayAccounts(gringottsBank);
});

$('#remove-account-button').click(function () {
    const accountName = $('#account').val();
    gringottsBank.removeAccount(accountName);
    displayAccounts(gringottsBank);
});

$('#deposit-button').click(function () {
    const accountName = $('#deposit-account-name').val();
    const amount = Number($('#deposit-amount').val());
    gringottsBank.deposit(accountName, amount);
    const account = gringottsBank.findAccount(accountName);
    $(`li:contains(${account.name})`).text(account.displayString());
});

$('#withdraw-button').click(function () {
    const account = $('#deposit-account-name').val();
    const amount = Number($('#withdraw-amount').val());
    gringottsBank.withdraw(account, amount);
    displayAccounts(gringottsBank);
});

displayAccounts(gringottsBank);