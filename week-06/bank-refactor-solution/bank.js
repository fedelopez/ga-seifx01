const Account = function (name, balance) {
    this.name = name;
    this.balance = balance;
    this.deposit = function (amount) {
        this.balance = this.balance + Number(amount);
    };
    this.withdraw = function (amount) {
        const total = this.balance - Number(amount);
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
    this.findAccount = function (accountName) {
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
        accountList.append(`<li>${account.displayString()}</li>`);
    }
}

function updateAccountBalance(accountName) {
    const account = gringottsBank.findAccount(accountName);
    const accountElement = $(`li:contains(${accountName})`);
    if (accountElement.length === 1) {
        accountElement.text(account.displayString());
    } else {
        $("#account-list").append(`<li>${account.displayString()}</li>`);
    }
}

$('#add-account-button').click(function() {
    const accountName = $('#account').val();
    gringottsBank.addAccount(accountName);
    updateAccountBalance(accountName);
});

$('#remove-account-button').click(function() {
    const accountName = $('#account').val();
    gringottsBank.removeAccount(accountName);
    $(`li:contains(${accountName})`).remove();
});

$('#deposit-button').click(function () {
    const accountName = $('#deposit-account-name').val();
    const amount = $('#deposit-amount').val();
    gringottsBank.deposit(accountName, amount);
    updateAccountBalance(accountName);
});

$('#withdraw-button').click(function () {
    const accountName = $('#deposit-account-name').val();
    const amount = $('#withdraw-amount').val();
    gringottsBank.withdraw(accountName, amount);
    updateAccountBalance(accountName);
});

displayAccounts(gringottsBank);