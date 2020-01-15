def simple_search(array, element)
  index = -1
  found = false
  while !found && index < array.size
    index += 1
    if array[index] == element
      found = true
    end
  end
  found ? index : -1
end

def binary_search(array, element)
  found = false
  midpoint = -1
  low = 0
  high = array.size
  until found || low == high
    midpoint = (low + high) / 2
    current = array[midpoint]
    if element == current
      found = true
    elsif element < current
      high = midpoint
    else
      low = midpoint + 1
    end
  end
  found ? midpoint : -1
end

def print_result(func)
  puts func.call([9], 9)
  puts func.call([9, 12, 34, 67, 343], 9)
  puts func.call([9, 12, 34, 67, 343], 343)
  puts func.call([9, 12, 34, 67, 343], 12)
  puts func.call([9, 12, 34, 67, 343], 67)
  puts func.call([9, 12, 34, 67, 343, 980, 1023, 11110, 11111], 1023)
  puts func.call([9, 12, 34, 67, 343, 980, 1023, 11110, 11111], 11112)
  puts func.call([9, 12, 34, 67, 343, 980, 1023, 11110, 11111], 2)
end

print_result(method(:simple_search))
puts '---'
print_result(method(:binary_search))

