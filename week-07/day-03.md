# Day 03

## Agenda

- Wrapping up arrays
- 

## Wrapping up arrays

### Selecting items from an array

Elements can be selected from an array according to criteria defined in a block. The selection can happen in a destructive or a non-destructive manner. While the destructive operations will modify the array they were called on, the non-destructive methods usually return a new array with the selected elements, but leave the original array unchanged.

```ruby
arr = [1, 2, 3, 4, 5, 6]
arr.select { |a| a > 3 }
# => [4, 5, 6]
arr.reject { |a| a > 3 }
# => [1, 2, 3]
```

**Tip:** You can use these two with the exclamation mark to make them destructive

### Deleting items from an array

```ruby
arr.delete_if { |a| a < 4 }
# => [4, 5, 6]
arr.keep_if { |a| a < 4 }
# => [1, 2, 3]       
```

### Ruby array tricks

```ruby
array1 = ["x", "y", "z"]
array2 = ["w", "x", "y"]

array1 | array2
# Combine Arrays & Remove Duplicates (Union)
# => ["x", "y", "z", "w"]

array1 & array2
# Get Common Elements between Two Arrays (Intersection)
# => ["x", "y"]

array1 - array2
# Remove Any Elements from Array 1 that are contained in Array 2 (Difference)
# => ["z"]
```

Check out [this site](https://sites.google.com/site/dhtopics/Home/ruby-essentials/advanced-ruby-arrays)

**Ruby - Collections - Arrays - Exercises**

* [Arrays Exercises](https://gist.github.com/wofockham/64bc0aa2857797dc4e57)
* [Solution](https://github.com/wofockham/wdi-30/blob/master/05-ruby/arrays.rb)

### Hashes

Also called `dictionaries`, `hash maps` and `hash tables`.

![hash](https://github.com/fedelopez/repository/blob/master/ga-seifx01/week-07/img/hash-table.png)

Great explanation [here](http://ruby-for-beginners.rubymonstas.org/built_in_classes/hashes.html)

### Creation of a hash

```ruby
# Literal Constructor
# "=>"" is called a hash rocket

hash = {}
serge = {
    :name => "Serge",
    :nationality => "French"
}
serge = {
    "name" => "Serge",
    "nationality" => "French"
}
serge = { # Keys stored as symbols!
    name: "Serge",
    nationality: "French"
}
# This will be automatically converted to 'hash rocket' styles

# Class Constructor

hash = Hash.new

# Normally a hash will return nil if the property is undefined
# We can pass in default values to this quite easily though

hash = Hash.new( "JOEL" )
hash["JOSH"] #=> Will return "JOEL"

# If you create the hash using the literal though...

hash = {}
hash.default = "JOEL"
hash["JOSH"] #=> Will return "JOEL"
```

### **Accessing elements**

```ruby
serge = { # Keys stored as symbols!
    name: "Serge",
    nationality: "French"
}

serge[:name]

serge = {
    "name" => "Serge",
    "nationality" => "French"
}

serge["name"]
```

### Adding items to a hash

```ruby
# Notice no hash rocket!

serge[:counterpart] = "Jane (temporarily)"

# This is the same way as you access them!

p serge[:counterpart] # => "Jane (temporarily)"
```

### Removing items from a hash

```ruby
serge.delete(:counterpart)
```

### Iterating over hashes

```ruby
serge = { # Keys stored as symbols!
    name: "Serge",
    nationality: "French"
}

# Will run for keys and values
serge.each do |all|
    puts all
end

# Will run for each key and value pair
serge.each do |key, value|
    puts "Key: #{key} and Value: #{value}"
end

# Return the current key
serge.keys.each do |key|
    puts key
end

# Return the current value
serge.values.each do |value|
    puts value
end

# Thousands of other ways to do this though
```

### Ruby - Collections - Exercises

* [Array and hash access](https://gist.github.com/wofockham/50a52e9399075709fe87)
* [Solution](https://github.com/wofockham/wdi-30/tree/master/05-ruby)

### Homework

* [MTA II - Ruby](https://gist.github.com/wofockham/399e315a90e04a867455)