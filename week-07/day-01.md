# Day 01

Agenda:

* Ruby - Installation
* Ruby - A Brief History of Ruby
* Ruby - Introduction
  * Data Types
  * Operators
  * Variables
  * Methods
  * Ruby - Fundamentals - Part I
  * Conditionals
  * Control Structures
* Ruby - Methods

## Warm up: Random words in random places

Using HTML, CSS, JavaScript + jQuery, create a web page which prints a random word from the library
[Faker](https://github.com/marak/Faker.js), in a random position on the page, every second.

tips:

- you can use `faker.random.word()` method to generate a word, but feel free to use other methods from the API!
- use `setInterval` method generate a new word every second

Bonus:

- Fade the text in to make it appear, and then fade it out to disappear.
- Try random colours, random font sizes, rotation, whatever floats your boat.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Random word in random place</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.js"></script>
</body>
</html>
```

## Ruby - Installation

### Install rbenv

`brew install rbenv`

Restart the terminal, and try running the command:

`rbenv --version`

`ruby --version`

Go here and identify the most recent version - [https://www.ruby-lang.org/en/downloads](https://www.ruby-lang.org/en/downloads/)​

Latest version at the time of writing was `2.6.3`, swap those in for the latest stable version that shows on that website

`rbenv install 2.6.3`

Let's test that it has all worked.

* `ruby -v`
* `rbenv -v`
* `which ruby` - should not return anything in the /usr/local/bin
* `which rbenv`

If all of this has worked, run...

`gem install pry`

### Common Commands

`ruby -v` - Will return the current version of Ruby

`which ruby` - What is the path to the version of Ruby you are using

`ruby hello_world.rb` - Runs the `hello_world.rb` file

`irb` - Runs a ruby console

`pry` - Runs a better console

`<CTRL> + D` - Ends a file running in irb or ruby (also typing `exit`)

## Ruby - A Brief History of Ruby

Created in 1993 by Yukihiro Matsumoto (Matz). 

He knew Perl and he also knew Python. He thought that Perl smelt like a toy language apparently, and he disliked Python 
because it wasn't a true object-oriented programming language. 

Ruby was primarily influenced by Perl and SmallTalk though.

Matz wanted a language that:

* Syntactically Simple
* Truly Object-Oriented
* Had Iterators and Closures
* Exception Handling
* Garbage Collection
* Portable

### Programming Mottos

* Perl - There's More Than One Way To Do It (T.M.T.O.W.T.D.I)
* Python - There Should Be One And Only One Way To Do It
* Ruby - Designed For Programmer Happiness

### Further Reading - A Brief History of Ruby

* ​[SitePoint - History of Ruby](http://www.sitepoint.com/history-ruby/)​

## Ruby - Introduction

### Data Types

#### Strings

Again, delimited by quotes.

`"string"` `'string'`

#### Numbers

There are multiple types:

* Integer
* Float
* Rational

### Operators

#### Arithmetic Operators

Lots of them, but the basic ones are:

```ruby
+     # Addition
-     # Subtraction
*     # Multiplication
/     # Division
**    # Exponent (to the power of)
%     # Modulus
```

#### Assignment Operators

```ruby
=     # Assignment
+=    # Add then assign
-=    # Subtract then assign
*=    # Multiply then assign
/=    # Divide then assign
%=    # Modulus then assign - assigns the remainder of the modules to the left 
      #operand
```

#### Logical Operators

```ruby
&&    # And
and   # And (alternative to &&)
||    # Or
or    # Or (alternative to ||)
!     # Not
not   # Not (alternative to !)
```

#### Comparison Operators

All the usual suspects, plus a few new ones:

```ruby
>       # Greater than
>=      # Greater than or equal to
<       # Less than
<=      # Less than or equal to
==      # Equality (generally just use the double equals in Ruby)
!=      # Inequality
<=>     # Combined comparison - returns -1 if less than, 0 if equal, and 1 if greater 
        #than
.eql?   # True if the receiver and argument have the same type and equal values
.equal? # True if the receiver and the argument have the same object ID
```

### Ruby - Operators - Recommended Readings

* ​[Tutorials Point - Ruby Operators](https://www.tutorialspoint.com/ruby/ruby_operators.htm)​

### Variables

Unlike JavaScript, we don't need to use the `let` or `const` (or any other) keyword when declaring a variable in Ruby.

`ruby = "is nice"`

It's much harder to accidentally make global variables in Ruby.

`$ruby = "is nice"`

To make a `const` variable you must define the variable name ALL in caps.

`RUBY = "is nice"`

Ruby will allow you to change this constant variable but will notify you if you change it.

### Calling methods (Functions in JS)

`puts "this is like console.log"`

`print "this is also like console.log"`

 `p "this allows to inspect better the contents, try with an array!"`

Parentheses in method calls are mostly optional in Ruby, but they are occasionally necessary (eg, in method or function chaining)

```ruby
puts("this")
puts "is the same as this"
```

## Ruby Fundamentals

#### Basic naming conventions

snake_case_everywhere - it's very rare to see camelCase!

#### Variable interpolation in strings

String interpolation is where we put Ruby code to be evaluated inside a string - the code to be evaluated is inserted within `#{}`. 
This is most often used when interpolating variables, but we can put any expression within the curly brackets (e.g `#{5 + 4}` will interpolate `9` into the string\).

```ruby
name  = "gilberto"
drink = "scotch"

"My name is #{ name } and I drink #{ drink }!"
```

IMPORTANT: Interpolation only works with double quotes!! Single quotes mean 'leave this string alone, this is mine'.

#### Comments in Ruby

```ruby
# This is is a single line comment

# This is
# a multiline
# comment

# OR (don't do this)

=begin
This is also a multi line comment
You can't have any an empty line between the =begin and the start of the comment
=end
```

#### Getting user input

In JavaScript, we have `alert` and `prompt`, in Ruby we have `puts` and `gets`.

```ruby
# Initial greeting
puts "What is your first name?"

# first_name = gets
# This will wait for user input, and include the new line in the variable

first_name = gets.chomp
# This will wait for user input, and strip the new line from the variable
# For more documentation on chomp - http://ruby-doc.org/core-2.2.0/String.html#method-i-chomp

puts "Your first name is #{ first_name }."

p "What is your surname? " # using `p` will allow you to put the input on the same line.
surname = gets.chomp # Chaining
puts "Your surname is #{ surname }."

puts "Your full name is #{ first_name } #{ surname }"
# fullname = "#{ first_name } #{ surname }"
# Sames as ... puts "Your full name is #{ fullname }"

puts "What is your address?"
address = gets.chomp
puts "Your name is #{ fullname } and you live at #{ address }"

# INTERPOLATION ONLY WORKS IN DOUBLE QUOTES!
```

### Conditionals

#### `If` statements

```ruby
if 13 > 10
    p "Yep, it is a bigger number"
end

grade = "A"

if grade == 'A'
    puts "You are killing it"
elsif grade == 'B'
    puts "You are coasting fine"
elsif grade == 'C'
    puts "Acceptable"
else
    puts "Please see me after class"
end

p "Yep, it is a bigger number" if 13 > 10 # This only works in single line statements

# It's called a modifier (if modifier)
```

#### `Unless` statements

```ruby
x = 1
unless x > 2
    puts "x is less than 2"
else
    puts "x is greater than 2"
end

# Modifier or backwards form
code_to_perform unless conditional
```

#### `case` statements

Think of these as shorter if statements, but don't overuse them (particularly in JS)

```ruby
grade = 'B'
case grade
when 'A'
    p 'You are killing it'
when 'B'
    p 'You are coasting fine'
when 'C'
    p 'Acceptable'
else
    p 'Please see me after class'
end

case expression_one
when expression_two, expression_three
    statement_one
when expression_four, expression_five
    statement_two
else
    statement_three
end

# Very similar to the switch statement in JavaScript!
```

The case statement will compare the **case expression** with whatever a particular **when expression** evaluates to. This is fine when testing direct equality between the case expression and the when expressions. Example:

```ruby
score = 1
case score
when 1
  print "You got one"
when 2
  print "You got two"
end
# => "You got one"
```

The first `when` expression - `1` - evaluates to `1`, and since `1 == 1` evaluates to `true`, the first `when` expression is satisfied, and "You got one" is printed

But this is a problem when our `when` expression contain is more complex. Consider the following:

```ruby
score = 1
case score
when score <= 1
  print "You got one or less"
when score > 1
  print "You got two or more"
end
# => nil
```

The first `when` expression - `score <= 1` - evaluates to `true`, and since `1 != true`, so none of the `when` expressions will be satisfied.

For complex expressions, the case expression should be left blank.

```ruby
score = 1
case
when score <= 1
  print "You got one or less"
when score > 1
  print "You got two or more"
end
# => "You got two or more"
```

### Ruby - Conditionals - Exercises

* ​[Drinking Age, Air Conditioning, Sydney Suburbs​​](https://gist.github.com/wofockham/67b291148a9efb6a7138)
* [​Solution​​](https://github.com/wofockham/wdi-30/tree/master/05-ruby/conditionals)

### Control Structures

#### While Loops

```ruby
while conditonal
    statement
end

while true
    p "OMG"
end # BAD IDEA

i = 0
while i < 5
    puts "i: #{ i }"
    i += 1
end
```

#### Until Loops

```ruby
until conditional
    statement
end

i = 0
until i == 5
    puts "i: #{ i }"
    i += 1
end
```

#### Iterators

So, so common in Ruby.

```ruby
5.times do
    puts "OMG"
end
# => "OMG
# => "OMG
# => "OMG
# => "OMG
# => "OMG

5.times do |i|
    puts "i: #{ i }"
end
# => I: 0
# => I: 1
# => I: 2
# => I: 3
# => I: 4
# => I: 5


5.downto(0) do |i|
    puts "i: #{ i }"
end
# => I: 5
# => I: 4
# => I: 3
# => I: 2
# => I: 1
# => I: 0
```

#### `for` loops

```ruby
for i in 0..5
   puts "i: #{ i }"
end
# => I: 0
# => I: 1
# => I: 2
# => I: 3
# => I: 4
# => I: 5
```

#### _Generating random numbers_ <a id="generating-random-numbers"></a>

```ruby
Random.rand # Generates a number between 0 and 1
Random.rand(10) # Generates a random number up to 10 (including zero and 10)
Random.rand(5..10) # Generates a number between 5 and 10 (also includes them)
Random.rand(5...10) # Does not include 5 and 10
```

### Ruby - Control Structures - Exercise

* ​​[Guess The Number​​](https://gist.github.com/wofockham/275f43b104c81c641849)
* ​[Solution​​](https://github.com/wofockham/wdi-30/tree/master/05-ruby)

### Ruby (General) - Recommended Readings

* ​[Why's (Poignant) Guide To Ruby](http://poignant.guide/)​
* ​[The Bastard's Book of Ruby](http://ruby.bastardsbook.com/)​

## Homework

* ​​[Calculator​​](https://gist.github.com/wofockham/2752aa06121df7f3024c)
* Also:
  * Watch [Pry - Introductory Screencast](http://pryrepl.org/)​
  * Browse [Ruby - Documentation](https://www.ruby-lang.org/en/documentation/)​
