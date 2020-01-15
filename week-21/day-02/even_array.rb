def build_even_array(max_number, index = 0, acc = [])
  if index > max_number
    acc
  else
    index += 1
    if index % 2 == 0
      acc.push(index)
    end
    build_even_array(max_number, index, acc)
  end
end

puts build_even_array(10)