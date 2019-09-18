# Day 02

The almighty $

## Agenda

- Warm-up: 99 bottles of beer
- JavaScript - Libraries
- JavaScript - jQuery - Introduction

### Warm-up

* [99 Bottles of Beer](https://github.com/Yiannimoustakas/sei31-homework/tree/master/warmups/week02/day04_99_bottles)

### Slides

* ​[jQuery - Introduction​​](https://www.teaching-materials.org/_deprecated/jquery)

## JavaScript Libraries

### What is a library?

A collection of reusable methods designed for a particular purpose. You just reference a javascript file with a 
particular library in it - and away you go!

jQuery is one of the most common JavaScript library on the web today. As of 2016, it was used in:

* Over 43 million websites, including:
  * Over 12% of all websites;
  * Over 78% of the top million websites;

## jQuery Introduction

### What is jQuery

An open source JavaScript library that simplifies the interaction between HTML and JavaScript. 
A JavaScript library is collection of reusable methods for a particular purpose.

It was created by John Resig in 2005, and released in January of 2006.

Built in an attempt to simplify the existing DOM APIs and abstract away cross-browser issues.

### Why jQuery?

* Well documented
* Lots of plugins
* Small-ish size (~23kb)
* Everything works in IE 6+, Firefox 2+, Safari 3+, Chrome, and Opera 9+

### What does it do for us?

* Data Manipulation
* DOM Manipulation
* Events
* AJAX
* Effects and Animation
* HTML Templating
* Widgets / Theming
* Graphics / Chart
* App Architecture

### Why use it?

```javascript
// No library:
const images = document.getElementsByTagName("img");
for (let i = 0; i < images.length; i++) {  
  images[i].style.display = "none";
}

// jQuery:
$('img').hide();
```

### The basics

**Select | Manipulate | Admire**

```javascript
const paragraphs = $("p");
paragraphs.addClass('special');​

// OR
$("p").addClass("special");
```

#### Selecting elements

All CSS selectors are valid.

| HTML | CSS Selector | jQuery |
| :--- | :--- | :--- |
| `<p>` | `p` | `$('p')` |
| `<p class="intro">` | `.intro` | `$('.intro')` |
| _or_ | `p.intro` | `$('p.intro')` |
| `<p id="badger">` | `#badger` | `$('#badger')` |
| `<div> <p></p> </div>` | `div p` | `$('div p')` |
| `<ul> <li></li> <li></li> </ul>` | `ul li:last-child` | `$('ul li:last-child')` |

jQuery also offers a bunch of other selectors. Some common ones are:

| Selector | Example | Selects​ ​|
| :--- | :--- | :--- |
| `:first` | `$("p:first")` | The first paragraph element.​ |
| `:last` | `$("div > p:last")` | The last paragraph element that is a direct child of a div element |
| `:has()` | `$("div:has(img)")` | Any divs that have one or more descendent img elements​ |
| `:visible` | `$(".kitten:visible")` | Any elements with the class "kitten" that have height, width &gt; 0 |
| `:hidden` | `$(".kitten:hidden")` | The opposite of :visible. Includes `display:none`.​ |

See [jQuery Selectors](http://api.jquery.com/category/selectors).

#### Reading elements

If we had this element in the HTML...

`<a id="yahoo" href="http://www.yahoo.com" style="font-size:20px">Yahoo!</a>`

We can select it using `$("a#yahoo")`

We can store it using `let myLink = $("#yahoo");`

We can get the content within it using `$("#yahoo").html()`

We can get the text within it using `$("#yahoo").text()`

We can get the HREF attribute using `$("#yahoo").attr("href")`

We can get the CSS attribute using `$("#yahoo").css('font-size')`

#### Exercise: Selecting jQuery elements

```html         
<!DOCTYPE html>
<html>
<body>

<h1>My Movie Site</h1>
<h2>Favourite movies</h2>
<ul>
    <li><a style="color: seagreen" href="https://www.imdb.com/title/tt0076759">Star Wars</a></li>
    <li><a style="color: mediumvioletred" href="https://www.imdb.com/title/tt0110912">Pulp Fiction</a></li>
    <li><a style="color: orange" href="https://www.imdb.com/title/tt0382932/">Ratatouille</a></li>
</ul>
<script src="https://code.jquery.com/jquery-3.1.0.js"></script>
</body>
</html>
```

- console.log the title of all the films
- console.log the web link of all the films
- console.log the text color of the first film

#### Changing elements

`$("#yahoo").attr("href", "http://generalassemb.ly");`

`$("#yahoo").css("font-size", "25px");`

`$("#yahoo").text("General Assembly");`

Support for chaining:

```javascript
$("#yahoo")
    .attr("href", "http://generalassemb.ly")
    .css("font-size", "25px")
    .text("General Assembly");
```

#### Create, manipulate and inject

Step 1: Create element and store a reference:  
```javascript
const paragraph = $('<p></p>'); // You can create any element with this!​
```
Step 2: Use a method to manipulate (optional)   
```javascript
paragraph.addClass('special');
``` 
​Step 3: Inject into your HTML    
```javascript
$('body').append(paragraph); // Also could use prepend, prependTo or appendTo as well
```

#### Exercise: Updating jQuery elements

```html         
<!DOCTYPE html>
<html>
<body>

<h1>My Movie Site</h1>
<h2>Favourite movies</h2>
<ul>
    <li><a style="color: seagreen" href="https://www.imdb.com/title/tt0076759">Star Wars</a></li>
    <li><a style="color: mediumvioletred" href="https://www.imdb.com/title/tt0110912">Pulp Fiction</a></li>
    <li><a style="color: orange" href="https://www.imdb.com/title/tt0382932/">Ratatouille</a></li>
</ul>
<script src="https://code.jquery.com/jquery-3.1.0.js"></script>
</body>
</html>
```

Using jQuery:

- Add a couple of your favourite films (with a link to their IMdB page) to the list
- Change the color of the first film title
- Increase the font size of all film titles

### HTML elements v DOM nodes v jQuery objects

A DOM node is not actually an HTML element - it is a representation of an HTML element, which we can use to create, 
modify, and read properties of HTML elements.

Similarly, it's important to note that a jQuery object is not actually a DOM node - it is a wrapper around a DOM 
element/collection of DOM elements that allows us to use the jQuery library's methods.

Consider this HTML:

```html
<div>  
  <p> This is a paragraph of text.</p>
</div>
```

We can't access and interact with an HTML element directly from JavaScript.

```html
<p>
// => Uncaught SyntaxError: Unexpected token <
```

We need to use the DOM API to select the DOM node that represents that HTML element:

```javascript
document.querySelector("p");
// => <p> This is a paragraph of text.</p>
```

This is a DOM node, not an HTML element:

```javascript
typeof(document.querySelector("p"));
// => "object"
```

If we create a jQuery object but want to access the DOM elements within that object, we need to pull out the native 
DOM element from the jQuery object:

```javascript
let paragraph = document.querySelector("p"); // This is a DOM node.
let $paragraph = $("p"); // This is a jQuery element.

​$paragraph === paragraph
// => false
// The first object is a jQuery object. The second object is a DOM node.

​$paragraph;
// => [ <p> This is a paragraph of text </p> ]
// Note the square brackets - this is a jQuery object, not a DOM node.

​let p = paragraph[0];
// We have taken the jQuery object and stored the first DOM node in that element to a variable called p

​p === paragraph
// => true
```

While we can mix regular JavaScript and jQuery together in our code, we cannot call jQuery methods on regular DOM 
objects (and vice-versa).

```javascript
// CREATING A JQUERY OBJECT
​let paragraphs = $('p');
// This creates an array-like jQuery object containing all the paragraph elements in the DOM.
​
// GETTING A DOM NODE FROM A JQUERY OBJECT - METHOD 1​
let firstParagraph = $paragraphs[0];
// This is a DOM node. We have selected the first DOM node in the $paragraphs jQuery object​
​
// GETTING A DOM NODE FROM A JQUERY OBJECT - METHOD 2​
let firstParagraph = $paragraphs.get(0);
// This is a DOM node. We have selected the first DOM node in the $paragraphs jQuery object using jQuery's .get() method.
​
​let allParagraphs = $paragraphs.get();
// This is an array DOM nodes. We have created 
//an array of all the native DOM nodes in the $paragraphs jQuery object using 
//jQuery's .get() method without passing any arguments.​
​
// CREATING A JQUERY OBJECT FROM ANOTHER JQUERY OBJECT​
let $myParagraph = $(paragraphs[0]);
// This is a jQuery object.
​
​// We can also loop through our array...
for (let i = 0; i < paragraphs.length; i++) {   
  const element = paragraphs[i];   
  const paragraph = $(element);   
  paragraph.html(paragraph.html() + ' wowee!!!!');
}

// Or use jQuery to do it - this is preferred
paragraphs.each(function () {  
  const element = $(this);  
  element.html(element.html() + " wowee!!!");
});
```

## Homework

​Read, watch, try:

- [https://learn.jquery.com/](https://learn.jquery.com/) 
- [http://api.jquery.com/](http://api.jquery.com/) 
- [http://jqfundamentals.com/](http://jqfundamentals.com/)
- [https://www.codecademy.com/learn/learn-jquery](https://www.codecademy.com/learn/learn-jquery) 
- [jQuery YouTube Tutorial](https://www.youtube.com/watch?v=hMxGhHNOkCU) 

Do via repl.it:

- Bank refactor to jQuery