def recursive_sum(first, last)
  if first > last 
    0
  else 
    first + recursive_sum(first + 1, last)
  end
end

puts recursive_sum 0, 10
puts recursive_sum 3, 8
