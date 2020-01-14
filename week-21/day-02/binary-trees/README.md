# Binary trees code along: The animal guessing game

## Model binary tree in Yaml format

[YAML](https://yaml.org/) is a superset of JSON and widely supported by Ruby and other languages.

Create a file named `tree.yaml` with the following contents:

```yaml
--- # Animal game
question: "Is it a mammal?"
yes:
  question: "Is it a carnivore?"
  yes:
    question: "Does it live in the African savanna?"
    yes:
      answer: "lion"
    no:
      answer: "fox"
  no:
    question: "Is it a marsupial?"
    yes:
      answer: "kangaroo"
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

## Reading the tree

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
    if answer == 'y'
      play_game(tree.right_tree)
    else
      play_game(tree.left_tree)
    end
  end
end
```

## Putting it all together in the game loop

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