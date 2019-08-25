# Day 03

## Agenda

- Remind to book 1:1 with Lucy Barnes for next week at https://calendly.com/lucy-barnes
- Setup Node and VS Code
- Advanced concepts using JavaScript objects

## Setup VS Code

Install [nvm](https://github.com/nvm-sh/nvm), a node version manager:

`brew install nvm`

nvm post-installation:

In your .bash_profile file:

```bash
export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh
```

Back to your shell, activate nvm and check it (if you have other shells opened and you want to keep them, do the same):
```
source ~/.bash_profile
nvm --version
0.34.0
```
Then install Node version 10.16.2

`nvm install 10.16.2`

Node should now be available:

```
node --version
v10.16.2
```

Install VS Code

`brew cask install visual-studio-code`

Install the following VS Code extensions:

- Code Runner
- ESLint

## More on JavaScript objects

- [Slides](https://github.com/textchimp/sei32/blob/master/week1/this-factories-and-constructors.pdf)

### Comparing objects

In JavaScript objects are a reference type. Two distinct objects are never equal, even if they have the same properties. 
Only comparing the same object reference with itself yields true.

```javascript
// Two variables, two distict objects with the same properties
const fruit = { name: "apple" };
const fruitbear = { name: "apple" };
fruit == fruitbear;
// => false
fruit === fruitbear;
// => false​
// Two variables, a single object
const fruit = { name: "apple" };
const fruitbear = fruit; // Assigns fruit object reference to fruitbear
​// Here fruit and fruitbear are pointing to same object
fruit == fruitbear;
// => true
fruit === fruitbear;
// => true
```

There's no simple way to compare objects using 'vanilla' JavaScript, but there are some JavaScript libraries that make 
object comparison easier - UnderscoreJS, for example, has an method - "_.isEqual", which tests equality based on object
properties. There are lots of alternatives - for example, check out [this](http://stackoverflow.com/questions/1068834/object-comparison-in-javascript) 
Stack Overflow thread - but I would stick to Underscore's method. Underscore is a great JavaScript library which we'll be talking about it in great detail later on.

### Underscore object comparison sneak peek

- Open the file `underscore-sneak-peek.html` from the command line using: `open underscore-sneak-peek.html -a "Google Chrome"`
- In Chrome, open the JS console (option+command+J) and see the program output

### Exercise time: The Movie Database

It's like IMDB, but much much smaller!

Create an object to store the following information about your favorite movie:

- title (a string)
- duration (a number), and
- tags (an array of strings)
    
Create a function to print out the movie information like so: 

`"Puff the Magic Dragon lasts for 30 minutes. Tags: Puff, Jackie, Living Sneezes."`

## Styling the console.log() with CSS properties

You can simply use CSS properties and modify accordingly.
To add styles to logs, the method expects %c within the first argument of console.log() and it picks up the very next argument as CSS style for the %c pattern argument text. 

```javascript
console.log("%cThis is a %cConsole.log", "background:black ; color: white", "color: red; font-size:25px");

//If you want to add multiple style, then simply add multiple %c text and add style arguments respectively.
console.log("%c first one %c second one", "background:black ; color: white", "background:blue; color: yellow");
```

## Advanced objects

### Methods

In JavaScript, functions are first-class citizens. This means that the language supports:

- Constructing new functions during the execution of a program
- Passing functions into other functions as arguments
- Storing functions in data structures

Since we can store functions in data structures, we can store a function as the property of an object - a function 
stored as the property of an object is called a 'method'.

We've already seen a bunch of methods - for example, when we call .toString() on a number, we are actually calling the 
.toString() method of the global Number object (which is a property of that object).

```javascript
const car = {
    maker: 'Fiat',
    start: function() {
      console.log('Starting the engine...');
    },
    stop: function() {
      console.log('Stopping the engine...');
    },
    moveForward: function() {
      console.log('Moving forward...');
    }
}
```

## Factories and Constructors

Both constructors and factories are "blue prints". They bootstrap development. 

### Factories

We can use 'factory' functions to create objects.

Let's create a cat with the properties age, breed, favourite food and the methods `meow` and `eats(food)`.

```javascript
const createCat = function(name, age, breed, favouriteFood) {
  // Our factory can include a default value for the objects it produces  
  if (favouriteFood === undefined) {    
    favouriteFood = "Bacon";  
  }  
  return {    
    name: name,    
    age: age,    
    breed: breed,    
    favouriteFood: favouriteFood,
    // Building on our knowledge of functions in objects (ie, methods), 
    //lets add a few methods to objects produced by this factory    
    meow: function() {      
      console.log("Meooooow");    
    },    
    eats: function(food) {      
      console.log(`Lewis eats ${food}`);    
    }  
  };
};​

const lewis = createCat("Lewis", 1, "Maine Coon", "Strawberries");​

const cats = [  
  createCat("Audrey", 1, "Domestic Shorthair", "Tuna"),  
  createCat("Lewis", 1, "Maine Coon", "Strawberries"),  
  createCat("Cooper", 1, "Domestic Shorthair")
]
```

### Constructors

Constructors are essentially factories for objects that are invoked via the new operator. When a constructor is invoked 
using the new operator, a constructor will:

- Create a new object
- Set `this` within the function to that object
- Return the object.

Normally, JS objects are only maps from strings to values, but JS also supports prototypal inheritance - something 
that is truly object-oriented. They are quite similar to classes in other languages.

```javascript
const Person = function (name, surname) {
    this.name = name;    
    this.surname = surname;
    
    this.fullName = function() {
      return `${this.name} ${this.surname}`; 
    }
};
```

### Exercise time: create cats using new 

Create a cat with the properties:

- name
- age
- breed
- favourite food and the methods 
- `meow` and `eats(food)`

this time using a constructor.

### Adding a new method to any Person instance

```javascript
Person.prototype.talk = function(sentence) {
  console.log(`${this.name} says ${sentence}`);
};
```

### We can also check to see if an object is an instance of a constructor

```javascript
typeof p
// Returns "object"
```

```​javascript
​p instanceof Point
// true
```

### We can also add new methods to existing objects from the core JS library

```javascript
String.prototype.reverse = function() {
    let acc = '';
    for (let i = this.length - 1; i > -1; i--) {
        acc += this.charAt(i);
    }   
    return acc;
};
"Hello".reverse();
"olleH"
```

### Exercise time: Palindromes

A palindrome is a word, number, phrase, or other sequence of characters which reads the same backward as forward, 
such as `madam` or `racecar`.

'is this a palindrome?'.isPalindrome() // false
'racecar'.isPalindrome() // true

Write a prototype function in the `String` class that returns `true` if the string is palindrome, false otherwise.

## Pairing Lab time: The Cash Register

Write a function called `cashRegister` that takes a shopping cart object. The object contains item names and prices (`itemName: itemPrice`). The function should return the total price of the shopping cart.

```javascript
// Input
const cartForParty = {  
  banana: "1.25",
  handkerchief: ".99",
  Tshirt: "25.01",
  apple: "0.60",
  nalgene: "10.34",
  proteinShake: "22.36"
};
// Output
cashRegister(cartForParty)); // 60.55
```

## Pairing Lab time: Credit Card Validation

- See instructions [here](https://gist.github.com/wofockham/dacf2da17c743afb2b17#the-cash-register)

## Advanced Functions

### The this keyword (AKA self)

The this keyword is one of the most powerful things in JavaScript, but also one of the hardest to understand. 
It gets insanely complicated, and there are a lot of exceptions to the simplistic generalizations below.

#### Global this in the browser

```javascript
const logThis = function () {    
  console.log(this); // will log the window object    
}​
```

#### Object this

```javascript
const objectFunction = {    
  testThis: function () {        
    console.log(this); // will log the objectFunction object
  }
};
objectFunction.testThis();​
```

### Event this

```javascript
const button = document.getElementById("myButton");
// This is a basic click handler - you aren't expected to understand this yet!
button.addEventListener("click", function() {    
  console.log(this);    
  // Will log the HTML element that this event ran on (button with id myButton)
});
```

### A simplistic generalization of this

- In a simple function (one that isn't in another function or object) - this stays as the default - window.
- In a function that is within an object, this is defined as the object - it's immediate parent.
- In an event handler (a function that is called based on browser interaction), this is defined as the element that was 
interacted with.

The this keyword is really useful when we have a function that accepts an object as an argument - we can use this to access properties of the object.

### Explicit binding

#### Using call and apply

```javascript
const sayHello = function() {    
  console.log("Hello, " + this.name);
};
const person = {    
  name: "Lewis"
};

// Using the .call method
sayHello.call(person);
// => "Hello, Lewis"

​// Using the .apply method
sayHello.apply(person);
// => "Hello, Lewis"
```

#### Using bind

```javascript
const hi = sayHello.bind(person);
// This creates a new function where the keyword "this" will always represent the 
//person object passed into the .bind method.
hi();
// => "Hello, Lewis"
```

#### new binding

```javascript
const Person = function(name) {    
  this.name = name;    
  this.sayHello = function() {        
    console.log("Hello, " + this.name);    
  }
};
const lewis = new Person("Lewis");
lewis.name;
// => "Lewis"
lewis.sayHello();
// => "Hello, Lewis"
```

### The arguments object

The arguments object is an array-like object that can be used to access the arguments passed into a function, regardless 
of whether they match named parameters.

#### Using arguments to create variadic functions

A variadic function is a function where the total number of parameters is unknown when the function is declared, and 
can vary when the function is called. We can use the arguments object to create variadic functions in JavaScript.

```javascript
const addNumbers = function() {  
  let sum = 0;  
  for (let i = 0; i < arguments.length; i++) {    
    sum += arguments[i];  
  }  
  return sum;
};
addNumbers(3, 5);
// => 8​​
addNumbers(3, 5, 7, 9);
// => 24
```

## Further Reading
​
- [Style console.log](http://voidcanvas.com/make-console-log-output-colorful-and-stylish-in-browser-node/)​
​- [Kyle Simpson - You Don't Know JS - this and Object Prototypes​](https://github.com/getify/You-Dont-Know-JS/tree/master/this%20%26%20object%20prototypes)
- [OOP in JS - Inheritance](http://phrogz.net/JS/classes/OOPinJS2.html)​

## Homework

- [MTA​​ Lab](https://gist.github.com/wofockham/8ac3c1d747f345d89d3d)
​- [JavaScript Readings​](https://gist.github.com/wofockham/8a702a9bf0a1456df7d4)