# Day 02

## Agenda

- Warmup and solution [Serge Says](https://github.com/textchimp/sei32-homework/tree/master/warmups/week01/day04_sergeSays)
- Code along: make it work, then make it right mantra on `sumArray` and `multiplyArray`
- Code along [Shakespearean insult generator](https://github.com/textchimp/sei32/tree/master/week1/shakespearean-insult-generator)
- JavaScript Objects

## Warmup - Serge Says

Create a function that takes an input and returns Serge's response.

## Code along: make it work, then make it right 

Let's apply this mantra on `sumArray` and `multiplyArray`

### Examples

- Serge answers 'Sure.' if you ask him a question.
- Serge answers 'Woah, chill out!' if you yell at him (ALL CAPS).
- Serge says 'Fine. Be that way!' if you address him without actually saying anything.
- Serge answers 'Whatever.' to anything else.

## Code along: Shakespearean insult generator

Create a function that prints out in the console a randomly crafted insult based on 3 arrays:

- The first array contains a list of adjectives
- The second array also contains a list of adjectives
- The third array contains a list of nouns

Pick one random element from the first second and third array (firstAdjective, secondAdjective, noun), and produce an output like this one:

`Thou ${firstAdjective} ${secondAdjective} ${noun}!`

## JavaScript Objects

In JavaScript, an object is a standalone entity - filled with properties and types (or keys and values). 
It is very similar in structure to a dictionary.
So, most javascript objects will have keys and values attached to them - this could be considered as a variable 
that is attached to the object (also allows us to iterate through them).
They are sometimes called "associative arrays". 
Remember that they are not stored in any particular order (they can change order whenever).

### How to create an object

#### With object literal

```javascript
const newObject = {};
```

#### Using Object() constructor

```javascript
const newObject = new Object();
```

### How to add properties to an object

```javascript
// Remember to separate keys by commas!
const newObject = {  
  objectKey: 'Object Value',  
  anotherObjectKey: 'Another Object Value',  
  objectFunction: function () {​ 
    console.log('Hello, from object function');   
  }
};​
const anotherObject = {};
anotherObject.objectKey = "Object Value";
anotherObject.objectFunction = function() { console.log('Hello, from object function'); };
anotherObject['anotherObjectKey'] = 'Another Object Value';
```

### How to access properties of an object - dot vs square bracket

There are two ways to access the properties of an object:

### Dot notation

```javascript
console.log("HELLO".length);
```

### Square bracket notation

```javascript
console.log("HELLO"['length']);
```

Remember: like all JS variables - both the object name and property names are case sensitive.

### Let's build a car together

```javascript
const favouriteCar = {  
  manufacturer: "Jaguar",  
  year: 1963,  
  model: "E-Type"
};​
// Dot notation access to object properties
console.log(favouriteCar.year);

// Square bracket notation access to object properties
favouriteCar['year'];

//however, if we create a new variable 
const key = "year";
console.log(key); 
//=> "year"
//if we run the code via dot notation
console.log(favouriteCar.key);
//=> undefined

// via bracket (array-style) notation
console.log(favouriteCar[key]);
//=> 1963
​
//the things inside [] get evaluated
```

### Exercise time: The Recipe Card

Never forget another recipe!

Create an object to hold information on your favorite recipe. It should have properties for title (a string), 
servings (a number), and ingredients (an array of strings).

On separate lines (one `console.log` statement for each), log the recipe information so it looks like:

```text
Mole
Serves: 2
Ingredients:
cinnamon
cumin
cocoa
```

### How to iterate through an object

```javascript
Object.keys(favouriteCar); // Returns an array of all the keys in the specified object.
Object.getOwnPropertyNames(favouriteCar); // So does this
​
​const obj = {  
  a: 1,  
  b: 2,  
  c: 3
};​
​
//we use bracket notation to get value
for (const key in obj) {  
  console.log( `key: ${key}, value: ${obj[key]}`);
}
// key: a, value: 1
// key: b, value: 2
// key: c, value: 3
​
//however, for dot notation this won't work
for (const key in obj) {  
  console.log(`key: ${key}, value: ${obj.key}`);
}
// key: a, value: undefined
// key: b, value: undefined
// key: c, value: undefined
​
//if using dot notation, it will literally looking for the key called "key".
```

### Deleting properties of an object

```javascript
const favouriteCar = {  
  manufacturer: "Jaguar",  
  year: 1963,  
  model: "E-Type"
}​
delete favouriteCar.year;
console.log(favouriteCar);
//=>  { manufacturer: "Jaguar", model: "E-Type"}​    
```

### Exercise time: The Reading List

Keep track of which books you read and which books you want to read!

Create an array of objects, where each object describes a book and has properties for the title (a string), author (a string), and alreadyRead (a boolean indicating if you read it yet).
Iterate through the array of books. For each book, log the book title and book author like so: "The Hobbit by J.R.R. Tolkien".
Now use an if/else statement to change the output depending on whether you read it yet or not. If you read it, log a string like 'You already read "The Hobbit" by J.R.R. Tolkien', and if not, log a string like 'You still need to read "The Lord of the Rings" by J.R.R. Tolkien.'

### Comparing objects

In JavaScript objects are a reference type. Two distinct objects are never equal, even if they have the same properties. 
Only comparing the same object reference with itself yields true.

```javascript
// Two variables, two distict objects with the same properties
const fruit = { name: "apple" };
const fruitbear = { name: "apple" };
​fruit == fruitbear;
// => false
fruit === fruitbear;
// => false​
​
// Two variables, a single object
const fruit = { name: "apple" };
const fruitbear = fruit;  // Assigns fruit object reference to fruitbear
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

- Create an object to store the following information about your favorite movie
    - title (a string)
    - duration (a number), and
    - tags (an array of strings)
    
Create a function to print out the movie information like so: 

"Puff the Magic Dragon lasts for 30 minutes. Tags: Puff, Jackie, Living Sneezes."

## Homework

- [Javascript Bank​​](https://gist.github.com/wofockham/dacf2da17c743afb2b17)
- Bonus - read:
​   - [MDN - Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) - MDN is an amazing resource for JavaScript, HTML and CSS.
​   - [JavaScript Tutorials - Arrays​](http://javascript.info/array)
​   - [Speaking JavaScript - Arrays​](http://speakingjs.com/es5/ch01.html#basic_arrays)

## Solutions to class exercises

- [Exercises](https://gist.github.com/wofockham/3ed2b7662e0e067d4e2a)
- [Solutions](https://github.com/textchimp/sei32/tree/master/week1/objects-exercises)