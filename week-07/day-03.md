# Day 03

## Agenda

- Wrapping up arrays
- SEIFX01 Guest Speaker Taryn Ewens (Advanced CSS) 1pm
- Hashes
- Pair programming Ruby Lab: MTA II

## Wrapping up arrays

### Selecting items from an array

Elements can be selected from an array according to criteria defined in a block. The selection can happen in a destructive or a non-destructive manner. While the destructive operations will modify the array they were called on, the non-destructive methods usually return a new array with the selected elements, but leave the original array unchanged.

#### Select

```ruby
[1, 2, 3, 4, 5, 6].select { |a| a > 3 }
# => [4, 5, 6]
```

#### Reject

```ruby
[1, 2, 3, 4, 5, 6].reject { |a| a > 3 }
# => [1, 2, 3]
```

**Tip:** You can use these two with the exclamation mark to make them destructive

### Deleting items from an array

#### delete_if

```ruby
arr.delete_if { |a| a < 4 }
# => [4, 5, 6]
```

#### keep_if

```ruby
arr.keep_if { |a| a < 4 }
# => [1, 2, 3]       
```

#### reduce

```ruby
p [-1, 0, 1, 2, 3, 45].reduce { |acc, current| acc + current}
=> 50
```

### Exercise: Preventing Spacecraft crash in Mars!

Welcome to the Jet Propulsion Laboratory cadets.

We are about to land a spacecraft in Mars to study its climate.

We need to convert the following data vector from miles to Km

```ruby
landing_vector = [99, 97, true, 68, '-', 49, 50, 10, 9, '|', 2, 1]
```

- 1 mile = 1.60 Km

Your job is to:

- clean up the array from unwanted data 
- map each mile to its counterpart Km
- sum all the entries to get a total distance
- print the total number of Kms and ultimately...
- prevent the crash!

Use only function composition. 

### Ruby array tricks

```ruby
array1 = ["x", "y", "z"]
array2 = ["w", "x", "y"]

# Combine Arrays & Remove Duplicates (Union)
array1 | array2
# => ["x", "y", "z", "w"]

# Get Common Elements between Two Arrays (Intersection)
array1 & array2
# => ["x", "y"]

# Remove Any Elements from Array 1 that are contained in Array 2 (Difference)
array1 - array2
# => ["z"]
```

Check out [this site](https://sites.google.com/site/dhtopics/Home/ruby-essentials/advanced-ruby-arrays)

**Ruby - Collections - Arrays - Exercises**

* [Arrays Exercises](https://gist.github.com/wofockham/64bc0aa2857797dc4e57)
* [Solution](https://github.com/wofockham/wdi-30/blob/master/05-ruby/arrays.rb)

## Hashes

Also called `dictionaries`, `hash maps` and `hash tables`.

- Unlike arrays which are mere lists, Hashes are like dictionaries
- We use them to look up one thing by another thing

> Please get me the value that is associated with this key

![hash](https://github.com/fedelopez/ga-seifx01/blob/master/week-07/img/hash-table.png)

Great explanation [here](http://ruby-for-beginners.rubymonstas.org/built_in_classes/hashes.html)

### Creation of a hash

#### Literal Constructor

Creating an empty hash:

```ruby
hash = {}
```

Creating a hash with 2 entries:

```ruby
serge = {
    "name" => "Serge",
    "nationality" => "French"
}
```

`=>` is called a **hash rocket**

### Accessing elements

```ruby
p serge["name"]
# => "Serge"
p serge["nationality"]
# => "French"
```

Creating a hash with 2 entries, the keys are symbols:

```ruby
serge = {
    :name => "Serge",
    :nationality => "French"
}
```

Accessing keys that are symbols is done the same way as with strings:

```ruby
p serge[:nationality]
# => "French"
```

Alternatively, you can define keys as symbols this way:

```ruby
serge = {
    name: "Serge",
    nationality: "French"
}
p serge[:nationality]
# => "French"
```

#### Class Constructor

```ruby
hash = Hash.new
```

A hash will return `nil` if the property is undefined:

```ruby
hash["Monica"]
=> nil
```

`fetch` does just the same as the square bracket lookup [] discussed before, but it will raise an error if the key 
is not defined:

```ruby
hash.fetch("Monica")
KeyError: key not found: "Monica"
```

We can pass in default values to this quite easily though:

```ruby
hash = Hash.new("JOEL")
hash["JOSH"] #=> Will return "JOEL"
hash["MARY"] #=> Will return "JOEL"
```

Default values can be returned using the `default` method too:

```ruby
hash = {}
hash.default = "JOEL"
hash["JOSH"] #=> Will return "JOEL"
```

### Adding items to a hash

```ruby
# Notice no hash rocket!

serge[:counterpart] = "Jane (temporarily)"

# This is the same way as you access them!

p serge[:counterpart] 
# => "Jane (temporarily)"
```

### Exercise

Given the following data structure:

```ruby
h = {0 => "Zero", 1 => "One", :two => "Two", "two" => 2}
```

- How would you return the string `One`?
- How would you return the string `Two`?
- How would you return the number `2`?
- How would you add `{3 => "Three"}` to the hash?
- How would you add `{:four => 4}` to the hash?

### Merging 2 hashes

```ruby
{ "one" => "eins" }.merge({ "two" => "zwei" })
=> {"one"=>"eins", "two"=>"zwei"}
```

### Removing items from a hash

```ruby
serge.delete(:counterpart)
```

### Iterating over hashes

```ruby
serge = {
    name: "Serge",
    nationality: "French"
}
serge.each do |entry|
    puts entry
end
```

Will run for keys and values, entry is an array of 2 elements, the key and the value

### Run for each key and value pair

```ruby
serge.each do |key, value|
    puts "Key: #{key} and Value: #{value}"
end
```

### Run for each key

```ruby
serge.keys.each do |key|
    puts key
end
```

### Run for each value

```
serge.values.each do |value|
    puts value
end
```

Thousands of other ways to do this though :)

### Exercise

```ruby
users = {
  "Jonathan" => {
    :twitter => "tronathan",
    :favorite_numbers => [12, 42, 75],
  },
  "Erik" => {
    :twitter => "sferik",
    :favorite_numbers => [8, 12, 24],
  },
  "Anil" => {
    :twitter => "bridgpal",
    :favorite_numbers => [12, 14, 85],
  },
}
```

1. How would you access Jonathan's Twitter handle (i.e. the string `"tronathan"`)?
1. How would you add the number `7` to Erik's favorite numbers?
1. How would you add yourself to the users hash?
1. How would you return the array of Erik's favorite numbers?
1. How would you return the smallest of Erik's favorite numbers?
1. How would you return an array of Anil's favorite numbers that are also even?
1. How would you return an array of the favorite numbers common to all users?
1. How would you return an array containing all users' favorite numbers, sorted, and excluding duplicates?

### Pair Programming Ruby Lab 

* [MTA II - Ruby](https://gist.github.com/wofockham/399e315a90e04a867455)