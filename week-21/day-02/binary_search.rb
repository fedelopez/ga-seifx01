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

puts simple_search([9, 12, 34, 67, 343], 9)
puts simple_search([9, 12, 34, 67, 343], 12)
puts simple_search([9, 12, 34, 67, 343], 67)
puts simple_search([9, 12, 34, 67, 343, 980, 1023, 11110, 11111], 1023)
puts simple_search([9, 12, 34, 67, 343, 980, 1023, 11110, 11111], 11111)
puts simple_search([9, 12, 34, 67, 343, 980, 1023, 11110, 11111], 11112)
puts simple_search([9, 12, 34, 67, 343, 980, 1023, 11110, 11111], 2)

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

puts binary_search([9, 12, 34, 67, 343], 9)
puts binary_search([9, 12, 34, 67, 343], 12)
puts binary_search([9, 12, 34, 67, 343], 67)
puts binary_search([9, 12, 34, 67, 343, 980, 1023, 11110, 11111], 1023)
puts binary_search([9, 12, 34, 67, 343, 980, 1023, 11110, 11111], 11111)
puts binary_search([9, 12, 34, 67, 343, 980, 1023, 11110, 11111], 11112)
puts binary_search([9, 12, 34, 67, 343, 980, 1023, 11110, 11111], 2)
