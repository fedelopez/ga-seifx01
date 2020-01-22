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
puts(selection_sort(movies).map { |movie| movie[11] })
puts('###')
large_dataset = CSV.read('large_dataset.csv')
large_dataset.shift
size = large_dataset.size
starting = Time.now
result = selection_sort(large_dataset)
ending = Time.now
puts(result.take(10).map { |movie| movie[11] })
puts "Time to sort #{size} records: #{ending - starting}s"
