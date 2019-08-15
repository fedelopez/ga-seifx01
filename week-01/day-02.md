# Day 02

What we covered today:

- Recap from previous lesson
- Introduction to JavaScript
- Declaring Variables
- Data Types
- Functions
- Coding Conventions
- Recommended JavaScript Readings

## Recap from previous lesson

### Solution to "IMDb top 250 CLI challenge"

`pbpaste | grep '(2007)' | wc -l`

## Slides

- ​[Variables and functions​](https://www.teaching-materials.org/javascript/slides/varsfunctions)
- ​[JavaScript control flow and logical operators​](https://www.teaching-materials.org/javascript/slides/controlflow.html) 

## Introduction to Javascript

JavaScript is the most popular programming language in the world by a long way. Since it's the language of the web, it works (almost) everywhere.

It provides a vast ecosystem (React, Vue.js, Angular, Node, ExpressJS, npm... and not only dominates the web but also has expanded its reach to the backend, mobile, and IoT. 

### History

- 1995 - At Netscape, Brendan Eich created "JavaScript".
- 1996 - Microsoft releases "JScript", a port for IE3.
- 1997 - JavaScript was standardized in the "ECMAScript" spec.
- 2005 - "AJAX" was coined and the web 2.0 age begins.
- 2006 - jQuery 1.0 was released.
- 2010 - Node.JS was released.
- 2015 - ECMAScript 6 was released.

## Declaring variables

Pre-ES6 (ECMA2015), variables were declared using `var`. However, ES6 introduced two new ways of declaring variables: `const` and `let`, which forces us to think about the variable before we declare it and makes debugging easier.

`const` allows you to declare a variable with a value which cannot be changed. It is scoped at the block level.
`let` allows you to do the same as const without the single assignment constraint.

In this course, we recommend you use `const` at first instance, and if you need to change the value of a variable, to instead declare your variable with `let`.

## Data Types

### Primitive Value Types

#### Strings

An immutable string of characters denoted by (back ticks), " " (double quotation marks) or ' ' (single quotation marks).

```
const greeting = "Hello Kitty";
const restaurant = `McDonalds`;
​
​console.log(greeting);
// => "Hello Kitty"
```

#### Numbers

Whole numbers (6, -102) or floating point numbers (5.8727)

```
const year = 2019;
const roughPi = 3.1415​;
​
console.log(year);
// => 2019
```

#### Boolean

Represents the logical values true or false.

```
const catsAreBest = true;
const dogsRule = false;​
​
console.log(catsAreBest);
// => true
console.log(dogsRule);
// => false
```

#### undefined

A variable has been declared but has not yet been assigned a value.

const winner;​
​
console.log(winner);
// => undefined

#### null

Represents something that has explicitly no value.

```
const goodPickupLines = null;​
​
console.log(goodPickUpLines);
// => null
```

### Variable Names

- Must begin with letters, $ or _
- Can only contain letters, numbers, $ and _
- Are case sensitive
- Do not use [reserved words](https://www.w3schools.com/js/js_reserved.asp)
- Choose clarity and meaning
- Pick a naming convention which is idiomatic to the language used and stick with it

```
// All Good!
let numPeople, $mainHeader, _num, _Num;​
​
// Nope.
let 2coolForSchool, soHappy!;
```

#### Variables can be stylised, camel vs snake case

```
const camelCase = "This variable is camel-cased, words are capitalized"
const snake_case = "This variable is snake-cased, words are separated by _"
```


### Variables store the result of expressions as well

#### String concatenation

```
let courseName = "SEI" + "FX01";
console.log(courseName);
// => "SEIFX01"
```

#### Exercise time: The Fortune Teller

Why pay a fortune teller when you can just program your fortune yourself?

- Store the following into variables: number of children, partner's name, geographic location, job title.
- Use adequate types for each variable
- Output your fortune to the screen like so: "You will be a X in Y, and married to Z with N kids."

#### Arithmetic operations

```
let testMultiplication = 5 * 7;
testMultiplication;
// => 35​

let x = 2 + 2;
console.log(x);
// => 4
```

#### Exercise time: The Age Calculator

Forgot how old someone is? Calculate it!

- Store the current year in a variable.
- Store their birth year in a variable.
- Calculate their 2 possible ages based on the stored values.
- Output them to the screen like so: "They are either NN or NN", substituting the values.

#### Use variables in expressions

```
let y = x * 3;
console.log(y);
// => 12
```

### Exercise time: The Lifetime Supply Calculator

Ever wonder how much a "lifetime supply" of your favorite snack is? Wonder no more!

- Store your current age into a variable.
- Store a maximum age into a variable.
- Store an estimated amount per day (as a number).
- Calculate how many you would eat total for the rest of your life.
- Output the result to the screen like so: "You will need NN to last you until the ripe old age of X".

### JavaScript is a Loosely Typed language

What this means is that we do not explicitly state what type of value will be stored by a variable - Javascript will figure out the type of value to be stored by looking at the type of the result of the expression. If that sounds confusing, remember:

- The result of the expression 10 is the number 5, so let y = 5 will give y the type of number.
- The result of the expression 5 + "cats" is "5cats", so var let z = 5 + "cats" will give z the type of string.
- A variable can be of only one type at one time, but the type of a particular variable can be reassigned.

```
let y = 2
console.log(typeof(y))
// number
y = 2 + ' cats';
console.log(typeof y);
// string
```

For a much more complex overview of the differences between loosely typed and strongly typed languages, [see here](https://en.wikipedia.org/wiki/Strong_and_weak_typing).​

### String Interpolation

String interpolation is available as part of ES6, denoted by backticks. To do this, we use ${} to insert variable names into the string. This saves us from adding discrete strings together with +
Backticks also allows us to have multi-line strings (not available when using quotation marks), which helps with the readability of your code.

#### Simple string substitution

``` 
const name = "Michelle"; // or `Michelle`
console.log(`Hello, ${name}!`);​
// => "Hello, Michelle!"​
```

### Multiple line Strings​

```
const firstName = 'Jane';
console.log(`Hello ${firstName}!
  How are you
  today?`);​
```

### Comments

Comments are human-readable lines of text that the computer will ignore. Comments are incredibly useful for leaving notes to yourself (and other developers) in your code - these comments might explain the purpose of a section of code or how a particularly complex function works, note any bugs in the code, or leave 'TODO' notes for yourself.

```
// This is a single line comment in JS​
/*    
  This is a block level comment    
  i.e. multiline
*/
```

## Functions

Functions are way to make a collection of statements re-usable. This is the most powerful thing in JavaScript.

Declaring functions: You need to declare functions before you can call them:

### Classic function declaration

```
function sayMyName () {    
  console.log( "Hello Jane" );
}​
```
​
But since functions are also data types, they can be stored in a variable!

### Function expression declaration

```
const sayMyName = function () {    
  console.log( "Hello Jane" );
}
```

If you want to see the difference between function declarations and function expressions, see this [blog post](https://javascriptweblog.wordpress.com/2010/07/06/function-declarations-vs-function-expressions/) and this [StackOverflow post](http://stackoverflow.com/questions/1013385/what-is-the-difference-between-a-function-expression-vs-declaration-in-javascript).

### Function Parameters and Arguments

The terms 'parameter' and 'argument' are often used interchangeably - the context usually makes the meaning clear, and only a real jerk would pull you up on it - but basically:

- Parameters are used to define a function;
- Arguments are used to invoke a function.

Functions in Javascript can accept as many named parameters (or arguments) as we want. We can then access and use those arguments from within the function. This is crazily powerful.

```
const sayMyName = function (firstName, lastName) {    
  console.log("Hello, " + firstName + " " + lastName + "!");
}​
sayMyName("Jane", "Birkin");
// => "Hello Jane Birkin!"​
```

#### We don't have to pass in plain data types, we can also pass in variables as arguments

```​
const name = "Serge";
const surname = "Gainsbourg";​
​
sayMyName(name, surname);
// => "Hello Serge Gainsbourg!"
```

### Return values

Functions won't automatically return the evaluation of the code within itself. You will need to add a return statement at the end of the function.

```
const addNumbers = function (num1, num2) {  
  result = num1 + num2;  
  return result;
}
const sum = addNumbers(5, 2);
​
console.log(​sum);
// => 7
```

### Exercise time: The Geometrizer

Calculate properties of a circle, using [the definitions here](http://math2.org/math/geometry/circles.htm).

Create 2 functions that calculate properties of a circle.

Create a function called `calculateCircumference`:

- Pass the `radius` to the function as argument.
- Calculate the circumference based on the radius, and output "The circumference is NN".

Create a function called `calculateArea`:

- Pass the `radius` to the function as argument.
- Calculate the area based on the radius, and output "The area is NN".

### Scope

JavaScript Variables have "function scope". They are visible only within the function in which they were declared.

In the example below, the variable localResult has "local scope" (i.e, it can only be used/accessed within the `addNumbers` function):

```
var addNumbers = function (num1, num2) {  
  var localResult = num1 + num2;  
  console.log( "The local result is: " + localResult );
}
​
​addNumbers(5, 7);
// => "The local result is 12"   
// Great. This worked, but...
​
​console.log(localResult);
// => undefined
// This returned 'undefined' because localResult is defined inside the addNumbers() 
//function - we can't see/use localResult "outside" of the addNumbers function.
```

But what if we wanted to access a variable that is assigned within a function from outside that function? We can declare the variable with "global" scope (outside the function), then assign a value to that variable within the scope of the function.

In the example below, the variable globalResult below has "global scope":

```
var globalResult;
var addNumbers = function (num1, num2) {  
  globalResult = num1 + num2;  
  console.log( "The global result is: " + globalResult );
}
​
​addNumbers(5, 7);
// => "The global result is 12"
​
console.log(globalResult);
// => 12
// Because this wasn't defined in the function, it is available outside the function.
```

If we assign a value to a variable inside a function without declaring the variable with var, the variable - which would ordinarily have local/function scope (ie, only be accessible within that function) - will become a global variable. This can cause a lot of problems - if you want a variable to be global, explicitly declare it globally.

### Quick recap: three things to remember about functions:

- You can pass things into functions as parameters/arguments
- You can return things from a function (to allow for chaining or usage in expressions)
- Variables declared in a function (or passed in as parameters to a function) have local scope (or function scope) - i.e. they are only accessible within that function. Variable scope is something important to get your head around.

### Javascript Variable Scope - Recommended Readings

For a more in-depth dive into Javascript variable scope, see:

- ​[Speaking Javascript (O'Reilly) - Ch 1: Basic JavaScript](http://speakingjs.com/es5/ch01.html#basic_var_scope_and_closures).
- ​[Everything You Wanted To Know About JavaScript​ scope](http://toddmotto.com/everything-you-wanted-to-know-about-javascript-scope/)
​- [Demystifying Javascript Variable Scope and Hoisting​](https://www.sitepoint.com/demystifying-javascript-variable-scope-hoisting/?utm_source=SitePoint&utm_medium=email&utm_campaign=Versioning)

### Exercise time: The Puppy Age Calculator

You know how old your dog is in human years, but what about dog years? Calculate it!

Write a function named `calculateDogAge` that:

- takes 1 argument: your puppy's age.
calculates your dog's age based on the conversion rate of 1 human year to 7 dog years.
- outputs the result to the screen like so: "Your doggie is NN years old in dog years!"

Call the function three times with different sets of values.

Bonus: Add an additional argument to the function that takes the conversion rate of human to dog years.

### Exercise time: The Temperature Converter`

It's hot out! Let's make a converter based on [the steps here](http://www.mathsisfun.com/temperature-conversion.html).

Create a function called celsiusToFahrenheit:

Store a celsius temperature into a variable.
Convert it to fahrenheit and output "NN°C is NN°F".
Create a function called fahrenheitToCelsius:
Now store a fahrenheit temperature into a variable.

Convert it to celsius and output "NN°F is NN°C."

## Coding Conventions

JavaScript is pretty flexible. We can use whatever terrible formatting we like and a computer will (generally) be able to understand it. But for maximum readability, it's important to follow conventions. There a whole bunch of these, and there are disagreements about some, but some generally accepted conventions are:

- Use newlines between statements;
- Use indentation to show blocks;
- Use camelCase for variable names (as discussed above).

```
// BAD
function addNumbers(num1,num2) {return num1 + num2;}​
​
function addNumbers(num1, num2) {
return num1 + num2;
}​
​
// GOOD
const addNumbers = function(num1, num2) {  
  return num1 + num2;
}
```

### Javascript Coding Conventions - Recommended Readings

For information relating to javascript style, see:

- ​[Idiomatic JS](https://github.com/rwaldron/idiomatic.js)
​- [Javascript Style Guides and Beautifiers​](http://addyosmani.com/blog/javascript-style-guides-and-beautifiers)
​- [AirBnB Style Guide](https://github.com/airbnb/javascript?utm_source=javascriptweekly&utm_medium=email)

## Recommended JavaScript Readings

- [You don't know JS](https://github.com/getify/You-Dont-Know-JS)
- ​[Eloquent JavaScript](http://eloquentjavascript.net)
- ​[Speaking JavaScript](http://speakingjs.com)