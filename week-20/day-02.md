# Day 02

What we covered today:

* Recursion

## Warm-up

* [Pairwise](https://github.com/Yiannimoustakas/sei31-homework/tree/master/warmups/week08/day01_pair_wise)

## Recursion

Recursion in computer science is a method where the solution to a problem depends on solutions to smaller instances of 
the same problem (as opposed to iteration). 

>Recursion is a curious concept because it can refer to sentences, such as this one, that refer to curious concepts.

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
def countdown (n=10)
  while n >= 0
    puts n
    n -= 1
    sleep 1
  end
  puts "Blast off!"
end
```

Call the method

```bash
ruby countdown.rb
countdown_i
```

Recursive method:

```ruby
def countdown (n=10)
  if n < 0 #Base case
    puts "Blast off"
  else
    puts n
    sleep 1
    countdown n-1 # Recursive case which moves us closer to the case
  end
end
```

Call the method

```bash
ruby countdown.rb
```

Some things are more elegantly solved with recursion like factorials.

```bash
5! = 5 x 4 x 3 x 2 x 1
```

Create a new file.

```bash
touch factorial.rb
```

Iterative method:

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
ruby factorial.rb
```

Recursive method:

```ruby
def factorial(n)
  if n == 1 
    1 # Base case
  else
    n * factorial(n-1) # Recursive case
  end
end
```

Call the method

```ruby
factorial.rb
```

Create another file. Fibonacci

```bash
touch fibonacci.rb
```

Iterative method:

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

Recursive method:

```ruby
# Very slow
def fibonacci_r(n)
  if n <= 2
    1 # Base case
  else
    fibonacci_r(n - 1) + fibonacci_r(n - 2)
  end
end
```

This example is extremely slow because we call the method twice with each iteration. This will exponential increase, 
doubling the If you call `fibonacci_r(100)` it looks for `fibonacci_r(98) + fibonacci_r(99)`. 

The problem is that it will then call `fibonacci_r()` twice for each of those `fibonacci_r(97) + fibonacci_r(98)`. 

As you can see you will be calling `fibonacci_r(98)` twice and create two copies of the branch even though you have already figured that out.

## Fast Recursion: Memoization

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
def fibonacci_m(n, cache)
  if n <= 2
    1
  else
    memoized(n - 1, method(:fibonacci_m), cache) + memoized(n - 2, method(:fibonacci_m), cache)
  end
end
```

```ruby
puts fibonacci_m(50, Hash.new)
```

TODO: Real life examples of recursive call (e.g. generate unique file name)

TODO: Pascal triangle? (https://github.com/fedelopez/progfun/blob/master/src/main/scala/week1/PascalTriangle.scala)