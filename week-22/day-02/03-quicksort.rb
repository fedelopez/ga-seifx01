require 'csv'

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

movies = CSV.read('small_dataset.csv')
movies.shift
puts(quicksort(movies).map { |movie| movie[11] })
puts('###')
large_dataset = CSV.read('large_dataset.csv')
large_dataset.shift
size = large_dataset.size
starting = Time.now
result = quicksort(large_dataset)
ending = Time.now
puts(result.take(10).map { |movie| movie[11] })
puts "Time to sort #{size} records: #{ending - starting}s"
