## Day 2

## Agenda

- What is TDD
- Why TDD
- Code Along: Bank website

## What is TDD

- [Martin Fowler's definition](https://martinfowler.com/bliki/TestDrivenDevelopment.html)

## Why TDD

- [Why TDD from Matt Parker](https://builttoadapt.io/why-tdd-489fdcdda05e)

## Code Along: Bank website

## Setup

Create the project root dir:

`mkdir tdd && cd tdd`

Initialise the node project:

`yarn init -y`

Add the library [Jest](https://jestjs.io/) with `dev` scope:

`yarn add jest --dev`

Jest is a JavaScript testing framework maintained by Facebook that works with a multitude of front-end frameworks and can even
be used to test node apps. It is specially well suited to test React apps. 

Update the `package.json` file with the following:

```json
{
  "name": "ga-tdd",
  "version": "1.0.0",
  "license": "MIT",
  "scripts": {
    "test": "jest"
  },
  "devDependencies": {
    "jest": "^24.9.0"
  }
}
```

We are also going to add the library [Faker](https://github.com/marak/Faker.js) to generate fake data:

`yarn add faker --dev`

Create a file named `bank.spec.js`

And paste the following:

```js
describe('Bank', function () {
    it('should pass', function () {
        expect(1).toBe(1)
    });
});
```

A note on `describe` and `it`:

It simply describes the suite of test cases enumerated by the "it" functions.
Each `it` function is a test. 

Go back to the command line and type `yarn test`:

```text
$ jest
 PASS  ./bank.spec.js
  Bank
    ✓ should pass (3ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.942s, estimated 1s
Ran all test suites.
✨  Done in 1.68s.
```

You are all set, let's learn about TDD!

### Part I: TDDing the logic

### Testing the bank initialisation

Replace the first test (which adds no value) with the following:

```js
it('creates a new bank with no accounts', function () {
    const Bank = require('./bank.js');
    const bank = new Bank();
    expect(bank.accounts().length).toBe(0)
});
```

#### Calling the shot

Before running the test say out loud what’s going to happen; how is the test going to fail?

Calling the shot is the only way we know we have written a good test. 
If the test fails for another reason it means that there is something wrong with the setup. 
If it passes when we expected it to fail, something is wrong. 

Calling the shot is how we test the test itself.

Read [TDD: Call your shots](https://markhneedham.com/blog/2010/07/28/tdd-call-your-shots)

#### Implementing the bank initialisation

After running the test we get this error message:

```bash
Error: Cannot find module './bank.js' from 'bank.spec.js'
``` 

Is this what you expected?

Let's fix our first test.

Create the file `bank.js`.

Now implement the method `accounts` by just returning an empty array:

```js
const Bank = function () {
    this.accounts = function () {
      return [];
    };
};

module.exports = Bank;
```

### Adding an account

Let's add a to add an account to the bank:

```js
it('adds a new account', function () {
    const Bank = require('./bank.js');
    const bank = new Bank();
    
    const accountName = faker.finance.accountName();
    bank.addAccount(accountName);
    
    const accounts = bank.accounts();
    expect(accounts.length).toBe(1);
    expect(accounts[0].accountName).toBe(accountName);
});
```

The bank class now has a new method `addAccount`. Each account is now tracked in a private field named `accounts`:

```js
const Bank = function () {
    const accounts = [];

    this.accounts = function () {
      return accounts;
    };

    this.addAccount = function(accountName) {
        accounts.push({accountName: accountName})
    }
};
```

Running `yarn test` shows both tests successful:

```text
±  |master S:3 U:2 ?:5 ✗| → yarn test
yarn run v1.17.3
$ jest
 PASS  ./bank.spec.js
  Bank
    ✓ creates a new bank with no accounts (27ms)
    ✓ adds a new account (1ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        1.495s, estimated 2s
Ran all test suites.
✨  Done in 2.13s.
```

### Refactoring

We have duplicated some code in our test class, can you tell what is it?

In TDD test classes are first-class citizens, and we take as much care of them as with the production classes.

Let's remove the duplication of the bank creation by introducing a `beforeEach`:

```js
const faker = require('faker');
const Bank = require('./bank.js');

describe('Bank', function () {
    let bank;
    
    beforeEach(function () {
        bank = new Bank();
    });

    it('creates a new bank with no accounts', function () {
        expect(bank.accounts().length).toBe(0)
    });

    it('adds a new account', function () {
        const accountName = faker.finance.accountName();
        bank.addAccount(accountName);

        const accounts = bank.accounts();
        expect(accounts.length).toBe(1);
        expect(accounts[0].accountName).toBe(accountName);
    });
});
``` 

### Deposit funds into an account

```js
it('deposits funds in an existing account', function () {
    const accountName = faker.finance.accountName();
    const amount = faker.finance.amount();
    bank.addAccount(accountName);
    bank.deposit(accountName, amount);

    const accounts = bank.accounts();
    expect(accounts[0].amount).toBe(Number(amount));
});
```

And now let's add a method that deposits the funds on the correct bank account:

```js
this.deposit = function (accountName, amount) {
    const account = accounts.find(function (account) {
        return account.accountName === accountName;
    });
    account.amount = account.amount + Number(amount);
};
```

It seems we have done our job, but we get this error:

```bash
TypeError: Cannot read property 'amount' of undefined
```

We need to retrofit the creation of accounts to initialise the amount to 0.

```js
this.addAccount = function(accountName) {
    accounts.push({accountName: accountName, amount: 0})
};
```

### Withdraw from an account

```js
it('withdraws funds from an existing account', function () {
    const accountName = faker.finance.accountName();
    const amount = 100;
    bank.addAccount(accountName);
    bank.deposit(accountName, amount);
    bank.withdraw(accountName, 73);

    const accounts = bank.accounts();
    expect(accounts[0].amount).toBe(27);
});
```

Similarly to `deposit`, we have to find the account and decrement the funds:

```js
this.withdraw = function (accountName, amount) {
    const account = accounts.find(function (account) {
        return account.accountName === accountName;
    });
    account.amount = account.amount - Number(amount);
}
```

#### Refactoring

Both methods `deposit` and `withdraw` have to find the desired account. Let's refactor that duplication:

Step 1: create a `findAccount` method inside Bank: 

```js
function findAccount(accountName) {
    return accounts.find(function (account) {
        return account.accountName === accountName;
    });
}
```

Step 2: use the newly created method in `deposit` and `withdraw`:

```js
this.deposit = function (accountName, amount) {
    const account = findAccount(accountName);
    account.amount = account.amount + Number(amount);
};

this.withdraw = function (accountName, amount) {
    const account = findAccount(accountName);
    account.amount = account.amount - Number(amount);
};
```

#### Exercise

Using TDD, create a calculator with the following methods:

- sum
- subtract
- multiply
- divide

### Part I: TDDing the UI

Add the library [Cypress](https://www.cypress.io)

`yarn add cypress --dev`

Cypress is a JS library to perform end to end tests in websites.

Initialise Cypress:

`yarn run cypress open`

This will initialise all the necessary files so that Cypress can run the end to end tests.

Remove all the files located in `cypress/integration`.

Add a task to run the end to end tests:

```text
...
  "scripts": {
    ...
    "e2e": "cypress run",
    ...
  },
...
```

Also add this in `package.json` to prevent `jest` from running Cypress test:

```text
...
    "jest": {
      "testPathIgnorePatterns": [
        "cypress/"
      ]
    }
...
```

Create a file named `bank.spec.js` under `cypress/integration`

```js
describe('Bank account', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1234')
  });

  it('adds an account', () => {
    cy.get('#account-list li').should('have.length', 0);
    cy.get('#account-name').type('My Savings Maximiser');
    cy.get('#add-account').click();
    cy.get('#account-list li').should('have.length', 1);
    cy.get('#account-list li').contains('My Savings Maximiser');
  })
});
```

If we run the tests now by invoking `yarn e2e` Cypress will complain that there is no app running in http://localhost:1234.

Let's start a dev server.

Add Parcel js to the project:

`yarn add parcel --dev`

And also jQuery:

`yarn add jquery`

Note that jQuery is not a `dev` dependency as we need it in production!

Create a script to start the local server:

```text
...
  "scripts": {
    ...
    "start": "parcel index.hml",
    ...
  },
...
```

Create an index.html file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Gringotts Bank</title>
</head>
<body>
<div>
    <label>
        Account Name
        <input id="account-name">
    </label>
    <button id="add-account">Add account</button>
    <ul id="account-list">
    </ul>
</div>
<script src="index.js"></script>
</body>
</html>
```

And the `index.js` with the business logic:

```js
import Bank from './bank'
import $ from 'jquery'

const bank = new Bank();

$('#add-account').click(function () {
    bank.addAccount($('#account-name').val());
    displayAccounts();
});

function displayAccounts() {
    const accountList = $('#account-list');
    accountList.empty();
    for (const account of bank.accounts()) {
        const li = `<li>${account.accountName}</li>`;
        accountList.append(li);
    }
}
```

## Homework

* Read ​[The Art of Agile Development: TDD](https://www.jamesshore.com/Agile-Book/test_driven_development.html)​
* Redo what we have covered today by yourself. Add missing functions

