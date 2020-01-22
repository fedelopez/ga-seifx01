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
movies.shift
puts(bubble_sort(movies).map { |movie| movie[11] })
puts('###')
large_dataset = CSV.read('large_dataset.csv')
large_dataset.shift
size = large_dataset.size
starting = Time.now
result = bubble_sort(large_dataset)
ending = Time.now
puts(result.take(10).map { |movie| movie[11] })
puts "Time to sort #{size} records: #{ending - starting}s"
