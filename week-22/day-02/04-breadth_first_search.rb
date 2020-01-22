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
    if frontier.empty?
      []
    else
      path = frontier.shift
      last_node = path.last
      if last_node == destination
        path
      else
        unvisited_neighbors = neighbors(last_node).select { |neighbor| !visited.include?(neighbor) }
        paths = unvisited_neighbors.map { |neighbor| path + [neighbor] }
        paths.each { |new_path| frontier.push(new_path) }
        breadth_first_search(origin, destination, frontier, visited.concat(unvisited_neighbors))
      end
    end
  end
end

class Node
  attr_accessor :name, :neighbors

  def initialize(name, neighbors)
    @name = name
    @neighbors = neighbors
  end
end

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

