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
    this.removeAccount = function (accountName) {
        const account = findAccount(this.accounts, accountName);
        const index = this.accounts.indexOf(account);
        this.accounts.splice(index, 1);
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
                console.log('FOund');
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
    const accountList = document.getElementById("account-list");
    while (accountList.firstChild) {
        accountList.removeChild(accountList.firstChild);
    }
    for (const account of bank.accounts) {
        const li = document.createElement("li");
        li.innerHTML = `${account.name}: $${account.balance}`;
        accountList.appendChild(li);
    }
}

document.getElementById('add-account-button').addEventListener('click', () => {
    gringottsBank.addAccount(document.getElementById('account').value);
    displayAccounts(gringottsBank);
});
document.getElementById('remove-account-button').addEventListener('click', () => {
    gringottsBank.removeAccount(document.getElementById('account').value);
    displayAccounts(gringottsBank);
});
document.getElementById('deposit-button').addEventListener('click', () => {
    const account = document.getElementById('deposit-account-name').value;
    const amount = Number(document.getElementById('deposit-amount').value);
    gringottsBank.deposit(account, amount);
    displayAccounts(gringottsBank);
});
document.getElementById('withdraw-button').addEventListener('click', () => {
    const account = document.getElementById('deposit-account-name').value;
    const amount = Number(document.getElementById('withdraw-amount').value);
    gringottsBank.withdraw(account, amount);
    displayAccounts(gringottsBank);
});
displayAccounts(gringottsBank);