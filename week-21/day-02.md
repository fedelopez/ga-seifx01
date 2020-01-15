![General Assembly](https://github.com/fedelopez/ga-seifx01/blob/master/docs/generalassembly.png)

# Day 02

## Agenda

* Binary search
* Recursion recap exercises
* Binary trees code-along: The Animal Guessing Game

[Slides](https://docs.google.com/presentation/d/1DgwonufDSKstl3VU9HsdKJeq6oxjgYVd3QsFd1RhktQ/edit?usp=sharing)

## Warm-up

* [Phone Number Check](https://github.com/Yiannimoustakas/sei31-homework/tree/master/warmups/week08/day02_phone_number_check)

## Binary search

Suppose you are searching for a word in an actual, physical dictionary.

If you are looking for the word `moustache`, that starts with the letter `m`, you could start at the beginning and flip
pages until you get to the `m` but if you want to save time you are more likely to start at a page in the middle because
you know the `m's` are going to be in the middle of the book.

Now suppose you login to Facebook. Facebook has to verify you have an account, so it needs to search for your username in their DB.
If your name is Michael, Facebook could start searching from the beginning of their records, but it makes more sense to 
start from somewhere in the middle. 

This is a search problem.

Both of the cases above use the same algorithm to solve the problem: *Binary Search*.

Binary search is a function which it's input is a sorted list of elements. If the desired element is found it returns 
the position in the array, otherwise returns null.

Example: given the following ordered array. You are looking for the number 32.

`[9, 14, 20, 31, 32, 57, 100, 101]`

- Is it 9? too low.
- Is it 14? too low.
- Is it 20? too low.
- Is it 31? too low.

Now, this approach is called *Simple Search* and takes a while on large arrays. 

In Binary Search the search would be like this:

- Is it 31? too low.
- Is it 57? too high.
- I know, it's 32!!

Imagine the array has now 1K elements. If the number is the last one it will take 1K iterations to find it.

In Binary search you would start by asking if it's 500. If the number is too high you just have eliminated 500 elements!
With Binary Search you guess the middle number and you eliminate half of the numbers every time.

In an array of 1000 elements, you can always guess the number with a maximum of 10 attempts.

Now imagine an array with 250K elements. The number of steps required would be 18 attempts!

### Complexity

Quick recap on logarithms: just like multiplication is the opposite of division, logarithms are the opposite of exponents.

`log10 100 = k`

is the opposite of asking

`10^k = 100`

therefore k = 2

or

`log2 8 = k`

is the opposite of asking

`2^k = 8`

therefore k = 3

So how many times we need to divide by 2 until with have only one element?

`n/(2^k) = 1`

we can rewrite it as -

`2^k = n`

by taking log both side, we get

`k = log2 n`

So, in average and worst case, time complexity of binary search algorithm is log2(n), whereas Simple Search would take n.

This means that a list of n elements, in Binary Search the average and worst case is log2(n).

For more info on logarithms, visit [Khan Academy website](https://www.khanacademy.org/math/algebra2/x2ec2f6f830c9fb89:logs/x2ec2f6f830c9fb89:log-intro/v/logarithms)

## Exercise: Binary Search

Write a function (can be pen & paper) that given an sorted array and a desired number, it returns the position of 
the number in the array. This function does not need to be recursive.

Examples:

```ruby
puts binary_search([9, 12, 34, 67, 343], 12)
# 1
```

```ruby
puts binary_search([9, 12, 34, 67, 343], 67)
# 3
```

```ruby
puts binary_search([9, 12, 34, 67, 343, 980, 1023, 11110, 11111], 1023)
# 6
```

## Exercise: recursive sum

Write a function named `recursion_sum` that takes 2 arguments, `first` and `last`:
The function will yield a result of the sum of all the numbers between the first and and the last.

```ruby
def recursive_sum(first, last) 
 # TODO
end
```

For instance:

```ruby
puts recursive_sum(0, 10)
# will yield 55, since 0 + 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 = 55
```

```ruby
puts recursive_sum(3, 8)
# will yield 33, since 3 + 4 + 5 + 6 + 7 + 8 = 33
```

## Exercise: build array recursively

Write a recursive function `build_even_array` that accepts one parameter: `max_num`

The function should return an array with all the even between 0 and `max_num`:

```ruby
puts build_even_array 9
# [0, 2, 4, 6, 8]
```

```ruby
puts build_even_array 14
# [0, 2, 4, 6, 8, 10, 12, 14]
```

## Binary trees code along: The animal guessing game

We are going to create a program named "The Animal Guessing Game". 
This game involves guessing what animal the other person is pretending to be. 
In this particular case, the computer will try to guess the animal the user will think of.

We are going to use a recursive-data structure to implement this game: trees!

### Modeling the binary tree

![Animals tree](https://github.com/fedelopez/ga-seifx01/blob/master/week-21/day-02/binary-trees/tree.png)

### Modeling the binary tree in a file

[YAML](https://yaml.org) is a superset of JSON and widely supported by Ruby and other languages.

Create a file named `tree.yaml` with the following contents:

```yaml
--- # Animal game
question: "Is it a mammal?"
yes:
  question: "Is it a carnivore?"
  yes:
    question: "Is it a marsupial?"
    yes:
      answer: "tasmanian devil"
    no:
      answer: "fox"
  no:
    question: "Is it marine?"
    yes:
      answer: "whale"
    no:
      answer: "cow"
no:
  question: "Is it an insect?"
  yes:
    answer: "beetle"
  no:
    question: "Is it a reptile?"
    yes:
      question: "Does it have legs?"
      yes:
        answer: "turtle"
      no:
        answer: "snake"
    no:
      answer: "shark"
```

Advantages over JSON for this particular use case:

- More human readable, visually easier to look at
- Less verbose to model a recursive data structure
- Use of indentation allows to see the tree

### Reading the tree from the file

Make sure you require the `yaml` gem.

```ruby
require 'yaml'
```

Now we can load the newly created file using the method `YAML.load`:

```ruby
cnf = YAML.load_file('tree.yaml')
```

Let's define our own `BinaryTree` class to model the recursive nature of the tree in a more object-oriented way:

```ruby
class BinaryTree
  attr_accessor :data, :left_tree, :right_tree

  def leaf?
    @right_tree.nil? && @left_tree.nil?
  end
end
```

Notice the `attr_accessor` function, this will automatically set up getters and setters for those instance variables.

Now let's load the Yaml data structure in an instance of our `BinaryTree` class:

```ruby
def load_tree(map, tree)
  tree.data = map['question'] || map['answer']
  if map[true]
    tree.right_tree = BinaryTree.new
    load_tree(map[true], tree.right_tree)
  end
  if map[false]
    tree.left_tree = BinaryTree.new
    load_tree(map[false], tree.left_tree)
  end
end
```

### Play game recursive function

The goal of this recursive function is to walk the tree based on the player choices. 

```ruby
def play_game(tree)
  sleep 1
  if tree.leaf?
    puts "I know, it's a #{tree.data}!"
  else
    puts tree.data
    answer = gets.chomp
    if answer == 'yes'
      play_game(tree.right_tree)
    else
      play_game(tree.left_tree)
    end
  end
end
```

### Putting it all together in the game loop

```ruby
cnf = YAML.load_file('tree.yaml')
root = BinaryTree.new
load_tree(cnf, root)

option = ''
until option == 'q'
  puts "Enter any character to start the game, press 'q' to quit."
  option = gets.chomp
  sleep 1
  if option != 'q'
    puts 'Think of an animal...'
    play_game(root)
  end
end
```

## Exercise: load Yaml file

Create a file named `invoice.yaml` with the following contents:

```yaml
---
receipt:     Oz-Ware Purchase Invoice
date:        2012-08-06
customer:
    first_name:   Dorothy
    family_name:  Gale

items:
    - part_no:   A4786
      descrip:   Water Bucket (Filled)
      price:     1.47
      quantity:  4
    
    - part_no:   E1628
      descrip:   High Heeled "Ruby" Slippers
      size:      8
      price:     133.7
      quantity:  1
```

Create a class in Ruby named `Invoice`, with the following properties:

- receipt_name
- date
- customer_first_name
- customer_family_name
- items

items is an array, each item is an instance from a class named `Item`, with following fields:

- part_no
- description
- size
- price
- quantity

Read the yaml file into an object of the class `Invoice`. Remember to add as many items
as found in the invoice yaml file!

