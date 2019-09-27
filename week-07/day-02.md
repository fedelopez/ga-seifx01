# Day 02

## Agenda

- Random words in random places solution
- Warm up: Raindrops
- Ruby: Symbols
- Ruby: Methods
- Ruby: Arrays

## Random words in random places solution

## Warm up: Raindrops

Write a program using `Ruby` that will take a number (eg `28` or `1755` or `9`, etc) and output the following:

- If the number contains 3 as a factor, output `Pling`.
- If the number contains 5 as a factor, output `Plang`.
- If the number contains 7 as a factor, output `Plong`.
- If the number does not contain 3, 5, or 7 as a factor, output the number as a string.

### Examples

- 28 has 7 as a factor.
  - In raindrop-speak, this would be a simple `Plong`.
- 1755 has 3 and 5 as factors.
  - In raindrop-speak, this would be a `PlingPlang`.
- 34 has neither 3, 5 nor 7 as a factor.
  - Raindrop-speak doesn't know what to make of that,
    so it just goes with the straightforward "34".

You will need to create a `raindrops.rb` file that can be executable in your terminal. 

## Ruby Methods

Methods are declared using the `def` keyword and called using the method's name.

### Methods with no arguments

```ruby
# Method definition
def hello
    puts "Hello"
end

# Method call
hello
# => "Hello"
```

### Methods with arguments

For methods with defined parameters, arguments can be passed in with or without parentheses.

```ruby
def hello(name)
    puts "Hello, #{name}"
end

hello("Josh")
# => "Hello, Josh"

hello "Josh"
# => "Hello, Josh"
```

If a method is defined with one or more parameters but is called without passing in the right number of arguments, 
an error will be thrown (`Argument Error: wrong number of arguments`).

### Methods with default arguments

To avoid `Argument Error`s thrown by calling an argument without the requisite number of arguments, we can set default 
parameters in the method definition.

```ruby
def hello(name = "World")
  puts "Hello, #{name}"
end

hello
# => "Hello, World"

hello("Josh")
# => "Hello, Josh"

3.times { hello("Josh") }
# => "Hello, Josh"
# => "Hello, Josh"
# => "Hello, Josh"
```

### Implicit return

Methods in Ruby have an **implicit return**, meaning that you don't need to use the `return` keyword in your methods - Ruby returns the last statement in a method on its own.

```ruby
def add(a, b)
  a + b
end

add 4, 11
# => 15

new_total = add 4, 11
new_total
# => 15
```

## Symbols

Symbols are like strings, but they are used to identify things.

They are created like this:

```ruby
`credit_card = :visa`
=> :visa
``` 

Each symbol is created one time only, hence they are useful to reduce memory footprint:

```ruby
dog_1 = :pug
dog_2 = :pug
dog_1.object_id
=> 2571228
dog_2.object_id
=> 2571228
```

Use symbols to store data, not text (for this use strings).

## Arrays

### What are arrays?

Arrays are a type of *data structure* that let us store multiple items in just one variable:

```ruby
recommended = ['Seinfeld', 'Friends', '30 Rock']
# => ["Seinfeld", "Friends", "30 Rock"]
```

### Reading data from arrays 

Arrays are index-based, where each element is identified by at least one array index.
In Ruby they start at zero like in Python, Java or C++.

To read data from an array we can use the `at` method specifying the index of the desired element:

```ruby
recommended.at(0)
# => Seinfeld
```

If the index lies outside of the array bounds, Ruby returns a special object named `nil`, this indicates
there are no items at that index:

```ruby
recommended.at(3)
# => nil
```

It's simpler to read data from arrays using the square bracket operator:

```ruby
recommended[0]
# => Seinfeld
```

For the first and last elements, there are special handy methods:

```ruby
recommended.first
# => Seinfeld
recommended.last
# => 30 Rock
```

### More ways to create arrays

Yo can create arrays in multiple ways.
 
For instance Ruby allows you to create arrays from a list of words using the `%w` operator:

```ruby
sentence = %w[The quick brown fox jumps over the lazy dog]
# => ["The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog"]
```

Notice how Ruby has created an array with multiple elements by extracting each word from the text above!

And perform operations we could not have done easily with single item variables like counting the number of words of a sentence:

```ruby
"this sentence has #{sentence.size} words" 
# => 9
```

There is also the possibility of creating an array with initial capacity:

```ruby
my_array = Array.new(100)
# => [nil, nil, ...]
```

And with default values for each entry:

```ruby
black_board = Array.new(100, 'I will not skateboard in the halls')
# => ["I will not skateboard in the halls", "I will not skateboard in the halls", ...]
```

**Pro-tip:** when initialising the array with a default object, Ruby populates each array index with the _same reference_.

So if we update any array element by mutating the underlying string it would affect every single entry:

```ruby
black_board[0].upcase!
puts black_board
# => ["I WILL NOT SKATEBOARD IN THE HALLS", "I WILL NOT SKATEBOARD IN THE HALLS", ...]
```

### Adding elements

Use `push` to add an element to the end of the array: 

```ruby
recommended.push('Big Bang Theory')
# => ["Seinfeld", "Friends", "30 Rock", "Big Bang Theory"]
```

### Exercise time:

### A. Given the following data structure:

```ruby
a = ["Anil", "Erik", "Jonathan"]
```

- How would you return the string `"Erik"`?
- How would you add your name to the array?

### Removing elements

Unlike other languages that have fixed size for arrays like Java, in Ruby arrays grow automatically if
we add more elements to them.

Use `pop` to remove the last element of the array: 

```ruby
recommended.pop
# => "Big Bang Theory"
p recommended 
# => ["Seinfeld", "Friends", "30 Rock"]
```

### Replacing existing elements

We can also replace an existing element by assigning its index to the new element:

```ruby
recommended[2] = 'Big Bang Theory'
p recommended 
# => ["Seinfeld", "Friends", "Big Bang Theory"]
```

### What can we store in arrays?

Arrays can store any type of object, and elements don't need to be of the same type.

This means they are heterogeneous:

```ruby
stuff = ['Hello', :something, true, 42]
# => ["Hello", :something, true, 42]
```

Arrays can store other arrays, these are called multi-dimensional arrays:

```ruby
tv_shows = [['Seinfeld', 'Prime'], ['Stranger Things', 'Netflix'], ['Cobra Kai', 'YouTube']]
# => [["Seinfeld", "Prime"], ["Stranger Things", "Netflix"], ["Cobra Kai", "YouTube"]]
tv_shows[2][1]
# => "YouTube"
```

### Find an element from an array

```ruby
sentence.include?('dog')
# => true
sentence.include?('cat')
# => false
```

### Sorting arrays

Sort class students alphanumerically:

```ruby
students = %w[John Sarah Mia Peter Aaron'].sort
# => ["Aaron", "John", "Mia", "Peter", "Sarah"]
```

# To retrieve and at the same time remove the first item

```ruby
arr.shift 
# => 1
```

# Delete at a particular index

```ruby
arr.delete_at( 2 )
```

# To delete a particular element anywhere

```ruby
arr = [1, 2, 2, 3]
arr.delete(2) # => [1, 3]
```

# Compact will remove nil values

```ruby
arr = ['foo', 0, nil, 'bar', 7, 'baz', nil]
arr.compact  #=> ['foo', 0, 'bar', 7, 'baz']
```

# Remove duplicates

```ruby
arr = [2, 5, 6, 556, 6, 6, 8, 9, 0, 123, 556]
arr.uniq    # => [2, 5, 6, 556, 8, 9, 0, 123]
```

### Iterating over arrays

```ruby
arr = [1, 2, 3, 4, 5]

arr.each do |el|
    puts el
end

arr.each { |el| puts el }

arr.reverse_each do |el|
    puts el
end

arr.reverse_each { |el| puts el }
```

# The map method will create a new array based on the original one, but with the values modified by the supplied block

```ruby
arr = [1, 2, 3]
arr.map { |a| 2 * a }  # => Returns [ 2, 4, 6 ] but doesn't change the original
arr.map! { |a| 2 * a } # => Changes the original and returns it
```

# DON'T DO IT THESE WAYS!

```ruby
arr = [1,2,3,4,5,6]
for x in 0..(arr.length-1)
    puts arr[x]
end

# or, with while:
x = 0
while x < arr.length
    puts arr[x]
    x += 1
end

for el in arr
    puts el
end
```