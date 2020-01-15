require 'yaml'

class BinaryTree
  attr_accessor :data, :left_tree, :right_tree

  def leaf?
    @right_tree.nil? && @left_tree.nil?
  end
end

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