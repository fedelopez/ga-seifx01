# Day 02

## Agenda

* Recursion
    * Using recursion instead of iteration loops 
    * Memoization
    * Tail Call Optimization
* Binary search

## Warm-up

* [Pairwise](https://github.com/Yiannimoustakas/sei31-homework/tree/master/warmups/week08/day01_pair_wise)

## Recursion

>Recursion is a curious concept because it can refer to sentences, such as this one, that refer to curious concepts.

- Neil deGrasse Tyson

At the opposite of iteration, recursion solves such recursive problems by using functions that call themselves 
from within their own code.

Recursive algorithms have two cases: 

- a recursive case and 
- a base case

Any function that calls itself is recursive.

Create a new folder and add a new ruby file into it.

```bash
mkdir recursion
cd recursion
touch countdown.rb
```

Iterative method:

```ruby
def countdown(n)
  while n >= 0
    puts n
    n -= 1
    sleep 1
  end
  puts "Blast off!"
end
```

Call the method

```ruby
countdown(10)
#10
#9
#8
#...
#1
#Blast off!
```

Recursive method:

```ruby
def countdown(n)
  if n < 0 # base case
    puts "Blast off"
  else
    puts n
    sleep 1
    countdown n - 1 # Recursive case which moves us closer to the base case
  end
end
```

Call the method

```ruby
countdown(10)
#10
#9
#8
#...
#1
#Blast off!
```

## Exercise: Sum digits

Given a non-negative int n, write a recursive function that return the sum of its digits.

Example:

```ruby
sum_digits(126)
# 9
sum_digits(13)
# 4
```

## Factorials

Factorials were initially used in to count permutations, however formulas involving factorials occur in many areas of mathematics.

Example:

Suppose that we are interested in how many ways there are in scrambling the letters of the name "Cindy".  
We have 5 choices for the first letter, once we have chosen the first letter there are 4 choices for the second letter, and then three choices for the third letter, two for the fourth letter, and only one choice for the last letter.  

Hence there are 120:

```bash
5! = 5 x 4 x 3 x 2 x 1
```

Some things are more elegantly solved with recursion like factorials.

Create a new file.

```bash
touch factorial.rb
```

### Iterative method

```ruby
def factorial(n)
  result = 1
  while n > 1
    result = result * n # Mutation
    n -= 1 # Move closer to the base case
  end
  result
end
```

Call the method

```ruby
factorial(10)
```

### Recursive method

```ruby
def factorial(n)
  if n == 1 
    1 # Base case
  else
    n * factorial(n - 1) # Recursive case
  end
end
```

Call the method

```ruby
factorial(4)
#24
```

### Rewriting factorial

```ruby
puts factorial(4)
```

```text
→ 4 * factorial(3)
→ 4 * (3 * factorial(2))
→ 4 * (3 * (2 * factorial(1)))
→ 4 * (3 * (2 * (1 * factorial(0)))
→ 4 * (3 * (2 * (1 * 1)))
→ 4 * (3 * (2 * 1))
→ 4 * (3 * 2)
→ 4 * 6
→ 24
```

## Exercise: Greatest common denominator

Write a function named `gcd` that computes the greatest common divisor of two numbers.

For instance:

```ruby
puts gcd(14, 21) # yields 7
```

## Fibonacci

A series of numbers in which each number (Fibonacci number) is the sum of the two preceding numbers. 

The simplest is the series 1, 1, 2, 3, 5, 8, etc.

```bash
touch fibonacci.rb
```

### Iterative method

```ruby
def fibonacci_i(n)
  a = 1
  b = 1

  while n > 1
    a = b 
    b = a + b
    n -= 1
  end
  a # The final result will be in a
end
```

### Recursive method

```ruby
def fibonacci_r(n)
  if n <= 2
    1 # Base case
  else
    fibonacci_r(n - 1) + fibonacci_r(n - 2)
  end
end
```

This implementation works well for small numbers.
 
However it degrades very rapidly with bigger numbers because we call the method twice with each iteration. 

The problem is that it will then call `fibonacci_r()` twice for each of those `fibonacci_r(97) + fibonacci_r(98)`. 

As you can see you will be calling `fibonacci_r(98)` twice and create two copies of the branch even though you have already figured that out.

## Fast Recursion: Memoization

Memoization is an optimization technique used primarily to speed up computer programs by storing the results of 
expensive function calls and returning the cached result when the same inputs occur again.

```ruby
def memoized(n, func, cache)
  if cache.has_key?(n)
    cache[n]
  else
    val = func.call(n, cache)
    cache[n] = val
    val
  end
end
```

```ruby
def fibonacci_m(n, cache = Hash.new)
  if n <= 2
    1
  else
    memoized(n - 1, method(:fibonacci_m), cache) + memoized(n - 2, method(:fibonacci_m), cache)
  end
end
```

```ruby
puts fibonacci_m(50)
```

## Exercise: Largest number in array

Given an array of numbers, write a recursive function that returns the *position* of the largest one. 
If there are no elements in the array, the function should return `-1`.

For example:

given [0, 9, 123, 4, -3, 99, 33], the function should return `2` since `123` is the largest number.

given [], the function should return `-1` since it's empty.

## Tail Call Optimization

This programming technique allows the interpreter to optimize the recursive code by treating the recursion as 
if it was a plain loop. 

This optimization however, can only be done if the final action of the recursive function calls itself as the last operation it performs.

This language feature has 2 big advantages over standard recursion:

- there is no risk of stack overflow as the stack does not have to keep track of each intermediate recursion state
- you can write your code as using recursion but the compiler will transform it into a fast and efficient loop

### TCO language support

Note: Not all languages support TCO. Ruby recently supports it.

Languages that support it natively are:

- Haskell
- Scala
- Kotlin
- Scheme and other LISP variants

JavaScript supports tail recursion, but not all browsers do.

```ruby
# main.rb
RubyVM::InstructionSequence.compile_option = {
    tailcall_optimization: true,
    trace_instruction: false
}

require './factorial.rb'

puts factorial_tailrec(100000)
```

```ruby
# factorial.rb
def factorial_tailrec(acc = 1, n)
  if n == 0
    acc
  else
    factorial_tailrec(n * acc, n - 1)
  end
end
```

## Exercise: Pascal's triangle

Pascal's triangle is an arithmetic and geometric figure often associated with the name of Blaise Pascal, but also studied
centuries earlier in India, Persia, China and elsewhere.

Its first few rows look like this:
 
```text
    1
   1 1
  1 2 1
 1 3 3 1
1 4 6 4 1
``` 

Write a recursive function that displays the Pascal triangle on the screen.

Examples: 

```ruby
pascal_triangle(2)
# 1
# 1 1
```

```ruby
pascal_triangle(3)
# 1
# 1 1
# 1 2 1
```

```ruby
pascal_triangle(4)
# 1
# 1 1
# 1 2 1
# 1 3 3 1
```

## Exercise: Palindromes

Given an integer, write a function that returns true if the given number is palindrome, else false. 

For example, 12321 is palindrome, but 1451 is not palindrome.

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

[9, 14, 20, 31, 32, 57, 100, 101]

Is it 9? too low.
Is it 14? too low.
Is it 20? too low.
Is it 32? too low.

Now, this approach is called *Simple Search* and takes a while on large arrays. 

In Binary Search the search would be like this:

Is it 31? too low.
Is it 57? too low.
I know, it's 32!!

Imagine the array has now 100 elements. If the number is the last one it will take 100 iterations to find it.

In Binary search you would start by asking if it's 50. If the number is too high you just have eliminated 50 elements!
With Binary Search you guess the middle number and you eliminate half of the numbers every time.

In an array of 100 elements, you can always guess the number with a maximum of 7 attempts.

Now imagine an array with 250K elements. The number of steps required would be 18 attempts!

## Complexity

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

Write a function (no need to be recursive) that given an sorted array and a desired number, it returns the position of 
the number in the array.

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