def binary_search(array, element)
  midpoint = array.size / 2
  found = false
  until found
    current = array[midpoint]
    if element == current
      found = true
    elsif element < current
      midpoint -= midpoint / 2
    else
      midpoint += (array.size - midpoint) / 2
    end
  end
  midpoint
end

puts binary_search([9, 12, 34, 67, 343], 12)
puts binary_search([9, 12, 34, 67, 343], 67)
puts binary_search([9, 12, 34, 67, 343, 980, 1023, 11110, 11111], 1023)
