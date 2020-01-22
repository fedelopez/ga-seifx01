![General Assembly](https://github.com/fedelopez/ga-seifx01/blob/master/docs/generalassembly.png)

# Day 02

## Agenda

* Sorting algorithms
    - Bubble sort
    - Selection sort
    - Quicksort
* Graph Theory
    - Breadth-first search
    
[Class slides](https://docs.google.com/presentation/d/1evFiG6lIcDvGDh4GEjiRKWzPYbOs4BE1yTf0rXtXbrc/edit?usp=sharing)

## Sorting algorithms

Suppose you work at Stan as Software Engineer.
One day your boss gives you a `CSV` file containing thousands of movies.
Your task is to display the movie catalog sorted by title in Stan's website. 
Unfortunately the movies on the file are not sorted.

How can you do it? 

Today we are going to learn how to sort data using different algorithms.
There are dozens and dozens of algorithms, and each one is valid for certain use cases.
The ones we will see today are `bubble sort`, `insertion sort` and `Quicksort`. 

### What are CSV files

- It stands for "Comma-Separated Values".
- It's a common data format which consist of rows with values separated by commas. 
- It's used for exporting & importing data.

Fortunately Ruby comes up with a built-in library to read CSV files!

### Bubble sort

#### Algorithm

```ruby
require 'csv'

def bubble_sort(movies)
  sorted = false
  found_unsorted = false
  first_index = -1
  second_index = 0
  until sorted
    first_index += 1
    second_index += 1
    first_movie = movies[first_index]
    second_movie = movies[second_index]
    unless second_movie.nil?
      first_title = first_movie[11]
      second_title = second_movie[11]
      if first_title > second_title
        found_unsorted = true
        movies[first_index] = second_movie
        movies[second_index] = first_movie
      end
    end
    if first_index == movies.size - 1
      sorted = !found_unsorted
      found_unsorted = false
      first_index = -1
      second_index = 0
    end
  end
  movies
end

movies = CSV.read('small_dataset.csv')
movies.shift # remove the header
puts bubble_sort(movies)
```

### Selection sort

#### Algorithm

```ruby
require 'csv'

def selection_sort(movies)
  sorted_list = []
  unsorted_sublist = movies
  list_size = unsorted_sublist.size
  until sorted_list.size == list_size
    min_index = 0
    for index in 1..unsorted_sublist.size do
      current = unsorted_sublist[index]
      unless current.nil?
        current_title = current[11]
        min = unsorted_sublist[min_index]
        min_title = min[11]
        if current_title < min_title
          min_index = index
        end
      end
    end
    min = unsorted_sublist.delete_at(min_index)
    sorted_list.push(min)
  end
  sorted_list
end

movies = CSV.read('small_dataset.csv')
movies.shift
puts selection_sort(movies)
```

### Quicksort

#### Algorithm

```ruby
def quicksort(movies)
  if movies.empty?
    movies
  else
    pivot = movies.pop
    pivot_title = pivot[11]
    left = []
    right = []
    for index in 0...movies.size do
      if movies[index][11] < pivot_title
        left.push(movies[index])
      else
        right.push(movies[index])
      end
    end
    quicksort(left).concat([pivot], quicksort(right))
  end
end
```

## Graph theory

### Breadth-First search algorithm

Let's start creating the model.
A graph is an object that has a collection of `nodes`. Each node is connected to one or many nodes, this
is called an `edge`.

```ruby
class Graph
  attr_accessor :nodes

  def initialize(nodes)
    @nodes = nodes
  end

  def neighbors(node)
    node.neighbors.map do |name|
      nodes.find { |current| current.name == name }
    end
  end

  def breadth_first_search(origin, destination, frontier = [[origin]], visited = [])
    # TODO: we will place here the search algorithm
  end
end

class Node
  attr_accessor :name, :neighbors

  def initialize(name, neighbors)
    @name = name
    @neighbors = neighbors
  end
end
```

```ruby
def breadth_first_search(origin, destination, frontier = [[origin]], visited = [])
    if frontier.empty?
      []
    else
      path = frontier.shift
      last_node = path.last
      if last_node == destination
        path
      else
        unvisited_neighbors = neighbors(last_node).select { |neighbor| !visited.include?(neighbor) }
        paths = unvisited_neighbors.map { |neighbor|  path + [neighbor] }
        paths.each { |new_path| frontier.push(new_path) }
        breadth_first_search(origin, destination, frontier, visited.concat(unvisited_neighbors))
      end
    end
end
```

Now let's create all the nodes for the suburbs of Sydney.
Each node will consist of a name (to identify the suburb, and the suburbs is connected to).

```ruby
nodes = [
    Node.new('Croydon', ['Petersham']),
    Node.new('Petersham', ['Croydon', 'Newtown', 'Marrickville']),
    Node.new('Marrickville', ['Petersham', 'Alexandria', 'Tempe', 'Syd Airport']),
    Node.new('Newtown', ['Petersham', 'CBD', 'Surry Hills', 'Alexandria']),
    Node.new('CBD', ['Newtown', 'Surry Hills', 'Bondi Junction']),
    Node.new('Surry Hills', ['CBD', 'Newtown', 'Bondi Junction', 'Kensington', 'Alexandria']),
    Node.new('Alexandria', ['Surry Hills', 'Marrickville', 'Newtown', 'Kensington', 'Kingsford', 'Mascot']),
    Node.new('Kensington', ['Surry Hills', 'Alexandria', 'Bondi Junction', 'Kingsford']),
    Node.new('Kingsford', ['Alexandria', 'Kensington', 'Maroubra']),
    Node.new('Bondi Junction', ['CBD', 'Surry Hills', 'Kensington', 'Tamarama']),
    Node.new('Tamarama', ['Bondi Junction', 'South Cooggee']),
    Node.new('South Cooggee', ['Tamarama', 'Maroubra']),
    Node.new('Maroubra', ['South Cooggee', 'Kingsford', 'Mascot']),
    Node.new('Mascot', ['Maroubra', 'Alexandria', 'Syd Airport']),
    Node.new('Tempe', ['Syd Airport', 'Marrickville']),
    Node.new('Syd Airport', ['Mascot', 'Marrickville'])
]

graph = Graph.new(nodes)

solution = graph.breadth_first_search(nodes[0], nodes[12])
puts solution.map { |node| node.name }.join("->")
```

Now we can put it together by creating the graph and calling the search method:

```ruby
graph = Graph.new(nodes)

solution = graph.breadth_first_search(nodes[0], nodes[12])
puts solution.map { |node| node.name }.join("->")
```



