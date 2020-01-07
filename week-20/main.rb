def countdown(n = 10)
  sleep 1
  if n < 1
    puts "blast off!"
  else
    puts n
    countdown n-1
  end
end

def memoized(n, func, cache)
  if cache.has_key?(n)
    cache[n]
  else
    val = func.call(n, cache)
    cache[n] = val
    val
  end
end

def fibonacci_r(n)
  if n <= 2
    1 # Base case
  else
    fibonacci_r(n - 1) + fibonacci_r(n - 2)
  end
end

def fibonacci_m(n, cache)
  if n <= 2
    1 # Base case
  else
    memoized(n - 1, method(:fibonacci_m), cache) + memoized(n - 2, method(:fibonacci_m), cache)
  end
end

puts fibonacci_m(50, Hash.new)