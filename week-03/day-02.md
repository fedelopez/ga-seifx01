# Day 02

## Agenda

- Warm-up: Scrabble
- Bank UI Homework code along
- CSS Visual Formatting Model 
- CSS Fonts
- Homework: Famous Scientist's Website​

## Warm-up: Scrabble

Write a program that, given a word, computes the scrabble score for that word.

See details [here](https://github.com/Yiannimoustakas/sei31-homework/tree/master/warmups/week02/day02_scrabble).

## Bank UI Homework code along 

Create a UI for the Bank Homework

- Bank Name
- Account Name
- Account Balance
- Deposit
- Withdraw

## CSS Visual Formatting Model

The CSS visual formatting model is the set of rules used to process and render documents to visual media. 

Each element of a document is converted to one or more boxes, and the layout of each box is determined by its:

- Box model (width, height, margins, padding, borders)
- Display type (ie, display; eg, block, inline, inline-block, etc)
- The positioning scheme (ie, position; eg, static, relative, absolute, etc)
- Relationship to other elements in the document object model.

### The CSS Box Model

Every HTML element generates a rectangular box. The 'box model' defines these boxes, their properties and how they are 
laid out according to the 'visual formatting model'.

The core box-model CSS properties are

- size (height width)
- margin
- padding
- border
- content

#### Size

The size of the element's content box - the size and width of the element itself. The following properties can be used 
to control the size of the box:

- height and width
- max-height and max-width
- min-height and min-width

#### Margins

Specifies the space between the element and adjacent elements. The following properties can be used to control the box's margins:

- margin - a 'variadic' property that can be used to set some or all padding attributes (all sides, all sides in pairs, all sides individually)
- margin-top
- margin-right
- margin-bottom
- margin-left

#### Padding

Specifies the space between the content box and the box's border. The following properties can be used to control the 
box's padding:

- padding - a 'variadic' property that can be used to set some or all padding attributes of an element (all sides, all sides in pairs, all sides individually)
- padding-top
- padding-right
- padding-bottom
- padding-left

Padding with 4 properties (top, right, bottom, left):
```css
div {
  padding: 25px 50px 75px 100px;
}

```
Padding with 2 properties (top & bottom, right & left):
```css
div {
  padding: 25px 50px;
}
```

More explanations on Padding can be found [here](https://www.w3schools.com/css/css_padding.asp).

#### Border

Specifies the style of the box's border. There are a lot of border properties (eg border-bottom-righ-radius, etc), but the following properties can be used to control the box's border:

- border - a shorthand property for setting the border's width, style and color properties
- border-style
- border-width
- border-color

#### Exercise time

Show an error panel in the Bank app that appears when:

the user tries to add an account that has no name.

Style it as follows:

- Red background
- White font
- Black border 2px
- Use padding and margins
- The error panel should show a message like: `Sorry, you can't add an account with no name`

#### Display

`display` is one of the most important properties of CSS to control the layout. 
The display property specifies the display behavior (the type of rendering box) of an element.

- `display: inline;` - Displays an element as an inline element (like <span>). Any height and width properties will have no effect.
- `display: block;` - Displays an element as a block element (like <p>). It starts on a new line, and takes up the whole width
- `display: inline-block;` - displays the elements next to each other but will use the full length of the page. The default will align the elements to the bottom. This can be changed with vertical-align: top;
- `display: none;` - will hide the element so it's not visible on the page
- `display: initial;` - converts the display back to what it was when the page was initially loaded.

[Display example](https://github.com/wofockham/sei-31/tree/master/02-html-css/display).

#### Position

The position property specifies the type of positioning method used for an element (static, relative, absolute, fixed, or sticky).

- `position: static;` - static is the default. It lets the browser figure out where it wants to put the element.
- `position: absolute;` - You take control. You must specify the exact position in px where you want the element to be positioned. This element will be positioned relative to the document and will be removed from the document flow.
- `position: relative;` - You will give the parent element position: relative; then all the subsequent child elements will be positioned relatively to the parent element.
- `position: fixed;` - Positioned relative to the window. This will stay on screen even if you scroll through the page.

[Position example](https://github.com/wofockham/sei-31/tree/master/02-html-css/position).

## CSS Fonts

### Google Fonts

Go to [Google Fonts](https://www.google.com/fonts) and add the fonts that you want to your Collection

- Once you have selected all your fonts, click Use (bottom right)
- Choose the styles that you would like, and the character set
- Choose the "@import" option and copy and paste the code into the top of your CSS file

```css
@import url('https://fonts.googleapis.com/css?family=Rubik');
h1 {  
  font-family: 'Rubik', sans-serif;
}
```

### Exercise time

Change the fonts of the bank app with your favourite ones from Google Fonts.

Font changes should apply to all elements of the page like: 

- h1
- h2
- list items
- buttons

### Custom Fonts

To reference custom fonts, you need to have the fonts saved in your project. Reference them in this way - make sure this is at the top of the CSS file! Reference this particular font by using the font-family name you referred to.

```css
@font-face {  
  font-family: 'GT Pressura';  
  src:  url('GTPresurra.eot');  
  src:  local('GT Pressura'),        
        url('GTPressura.eot#iefix'),        
        url('GTPressura.eot') format("truetype"),        
        url("GTPressura.otf") format("opentype"),        
        url("GTPressura.woff") format("woff"),        
        url("GTPressura.woff2") format("woff2"),        
        url("GTPressura.svg") format("svg");
}
```

To convert fonts, use [this tool](http://onlinefontconverter.com/).​

## Homework

[​Famous Scientist's Website​](https://gist.github.com/wofockham/47097f750914f9f23644)
