# Day 03

## Agenda

- Solution: salary increase
- CRUD application overview 
- Sinatra - CRUD with SQL
- Intro to Object Oriented Programming
- Retro

## Salary increase

```text
id          first_name  business_title     salary
----------  ----------  -----------------  ----------
2           John        Software Engineer  180000.0
3           Jane        Junior Software E  90000.8
4           Eddie       DBA                140000.8
5           Kate        CEO                200000.4
6           Bill        Principal Softwar  190000.8
7           Cecily      Designer           140000.8
8           Will        Product Manager    160000.2
9           James                          160000.2
```

Let's increase the salary of the lowest paid employee by 5%.

## CRUD application overview

In terms of actual structure of an application, this is the structure of a CRUD application. 

| CRUD | HTTP VERBS | URLS | SQL |
| :--- | :--- | :--- | :--- |
| CREATE | `POST` | /employees | INSERT |
| READ | `GET` | /employees | SELECT |
|  | `GET` | /employees/:id | SELECT |
| UPDATE | `POST` | /employees/:id | UPDATE |
| DELETE | `DELETE` | /employees/:id | DELETE |

CRUD is the foundation of most applications on the web, it is the thing that powers it! Important to get the principles of it.

## Sinatra - CRUD with SQL

Now that we've got a basic understanding of Sinatra, SQL and CRUD, we can combine the three to create a basic CRUD app.

### Importing the SQLite3 gem

Create a project with a `Gemfile` using the command `bundler init`

Add to the `Gemfile` the following entry:

`gem 'sqlite3'`

Then in your `main.rb` file import it: `require 'sqlite3'`

### Database connections

Whenever a request is sent to our web server that requires data to be retrieved from or posted to our database, 
the server needs to open a connection to the database. When using the **SQLite3 gem**, and assuming our database is 
stored in a file called **database.sqlite3**, such requests will follow this basic pattern:

### Open a new database connection

Create a new connection to the database stored in `database.sqlite3` using SQLite3 as our database adaptor. 
This connection is really a Ruby object that is an instance of the SQLite3 gem's `Database`class. 
Store this connection in a variable called `db`. We will then be calling various methods on this object.

```text
db = SQLite3::Database.new("database.sqlite3")
```

### Return results as hashes

By default, SQL will retrieve arrays of results from the database, but we want the results to be returned as hashes.

```text
db.results_as_hash = true
```

### Write an SQL query

Write an SQL query and store it in a variable called 'sql'. This step isn't completely necessary - we can pass an SQL 
query as a string directly into the `execute` method below, but storing the query in a variable keeps things tidy.

```ruby
sql = 'SELECT * FROM employees'
```

### Execute the SQL query

Call the 'execute' method on our database connection object, passing in the SQL query we want to execute. If we're passing the records retrieved to our view, we need to store the response in an instance variable \(using an `@` symbol\).

```ruby
all_employees = db.execute(sql)
```

### Close the database connection

Once a response has been received, close the connection to the database, since we can only have a limited number of 
concurrent database connections.

```ruby
db.close
```

### Exercise

More salary increases!

Create a program in Ruby that:

- Gets from the standard input the name of the employee to increase the salary
- Gets from the standard input the new salary
- Performs a SQL query that updates the salary on employee table for the given name
- Performs a SQL query that reads from the DB the new name and the new salary

Ensure to close the db at the end of the program.

### Further Reading - Database Connections

* [RubyGems - SQLite3::Database](http://www.rubydoc.info/gems/sqlite3/1.3.11/SQLite3/Database)

## Routes

We're going to have a very simple database which just has a single table. We need to create all the routes for CRUD'ing 
records to that table.

| Action | Purpose | CRUD Action |
| :--- | :--- | :--- |
| Index | Display a list of all the records in the table | READ |
| Show | Display a single record in the table | READ |
| Edit | Display a form for modifying the attributes of a single record in the table | - |
| Update | Update the attributes of a single record in the table | UPDATE |
| New | Display a form for setting the attributes of a new record in the table | - |
| Create | Add a new record to the table | INSERT |
| Delete | Remove a single record from the table | DELETE |

Below is the basic skeleton of a main.rb file to set up a CRUD system for adding records to a table of `employees` in a database.

```ruby
# Require all the gems we need:
require 'sqlite3'           # Sqlite3 for our database
require 'pry'               # Pry for debugging
require 'sinatra'           # Sinatra for our web server
require 'sinatra/reloader'  # Sinatra Reloader so we don't need to keep restarting our server
```

The main view:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Employee App</title>
</head>
<body>
​    <%= yield %>
</body>
</html>
```

### Get all employees

#### Route

```ruby
get '/employees' do
  db = SQLite3::Database.new('employee.db')
  db.results_as_hash = true
  @employees = db.execute('select * from employee')
  db.close
  erb :employees
end
```

#### View

```html
<h1><%= @employee['first_name'] %></h1>
<div>
  <p>Business Title: <%= @employee['business_title'] %></p>
  <p>Salary: <%= @employee["salary"] %></p>
  <form method="post" action="/employees/<%= @employee['id'] %>/edit">
    <input type='submit' value='Edit'>
  </form>
</div>
```

### Get employee by id

#### Route

```ruby
get '/employees/:id' do
  db = SQLite3::Database.new('employee.db')
  db.results_as_hash = true
  @employee = db.execute("select * from employee where id = #{params['id']}").first
  db.close
  erb :employee
end
```

#### View

```html
<h1><%= @employee['first_name'] %></h1>
<div>
  <p>Business Title: <%= @employee['business_title'] %></p>
  <p>Salary: <%= @employee["salary"] %></p>
  <form method="post" action="/employees/<%= @employee['id'] %>/edit">
    <input type='submit' value='Edit'>
  </form>
</div>
```

### Edit employee

#### Route

```ruby
post '/employees/:id/edit' do
  db = SQLite3::Database.new('employee.db')
  db.results_as_hash = true
  @employee = db.execute("select * from employee where id = #{params['id']}").first
  db.close
  erb :employee_edit
end
```

#### View

```html
<h1>Edit Employee</h1>
<h2><%= @employee['first_name'] %></h2>
<div>
  <form method="post" action="/employees/<%= @employee['id'] %>">
    <div>
      <label>
        Business Title:
        <input name='business_title' value="<%= @employee['business_title'] %>"/>
      </label>
    </div>
    <div>
      <label>
        Salary:
        <input name='salary' value="<%= @employee['salary'] %>"/>
      </label>
    </div>
    <input type='submit' value='Submit'>
  </form>
</div>
```

### Edit employee action

```ruby
post '/employees/:id' do
  db = SQLite3::Database.new('employee.db')
  db.results_as_hash = true
  id = params['id']
  business_title = params['business_title']
  salary = params['salary']
  query = "update employee set business_title = '#{business_title}', salary = #{salary} where id = #{id}"
  @employee = db.execute(query)
  db.close
  redirect "/employees/#{id}"
end
```

### Debugging using pry

- Ensure the gem `pry` is installed
- Add the instruction `binding.pry` in line you want to debug
- Start the application as usual: `ruby main.rb`

When that line will be hit the program execution will stop and you will be able to observe the current state of the app.

### Exercise

Update the web page to:

- allow creating an employee
- allow deleting an employee

## Object Oriented Programming

### Brief Intro to OOP

Basically, OOP is an approach to development that tries to replicate real life. It is pretty much always done using 
objects or classes as namespaces and treats them as a way to make your code "modular".

Namespace: A namespace is an environment or container in which related entities are grouped, and within which a symbol 
or identified is unique.

The focus of object-oriented is on data and structure rather than logic. Small, clean methods are also a major part of it.

### Basic OOP in Ruby

Up until now, we have only been using existing objects, but we haven't created our own. 

We can create an empty object and then add methods and features to construct a particular object.

```ruby
o = {}
def o.silly_method    
    puts "I'm silly!"
end
```

This is not ideal. It means that every time we create an object, we have to add methods to that object - every single time, 
even if the methods are the same, and the objects in question are very similar.

To get around this we use classes!

### Classes

Everything in Ruby is an object, and every object is an "instance" of a class - it inherits from a class, and in some 
capacity will ultimately inherit from the Ruby `Object`. This doesn't pop up that regularly, but to see what I mean:

```ruby
{}.class
# => Hash
[].class
# => Array
"".class
# => String
​
​# etc.
```

If you want to see every class an object inherits from, we can call the `ancestors` method on the class.

```ruby
{}.class.ancestors
# => [Hash, Enumerable, Object, PP::ObjectMixin, Kernel, BasicObject]
[].class.ancestors
# => [Array, Enumerable, Object, PP::ObjectMixin, Kernel, BasicObject]
"".class.ancestors
# => [String, Comparable, Object, PP::ObjectMixin, Kernel, BasicObject]
```

Treat classes as a factory or a blueprint, something that gives another thing all the details that it needs to be created and used. 
We use them to stop duplicate code and to make manageable, easy-to-debug code.

#### What do classes look like?

```ruby
class MarxBrother
end
```

#### The real power of classes

The real power of classes comes from being able to add methods to _all_ objects of a given class, rather than to 
individual objects! We can encapsulate functionality with classes, which will be inherited by all objects that are an 
'instance' of that class \(ie, an object created from that class blueprint\).

```ruby
class MarxBrother    
    def speak    
    end​    
    
    def laugh    
    end
end
```

In Ruby, we need to create an instance of the class, and call the method on that instance. 
Think of the class as being a blueprint, and the instance object being the house that is built from the blueprint. 
You don't live in the blueprints for a house \(unless you're homeless and you've stumbled across some discarded architectural plans\) - you live in the house that's build from the blueprints.

```ruby
class MarxBrother    
    def speak        
        puts "I can talk!"    
    end​    
    
    def laugh    
        puts "Hahaha!"  
    end
end​
​
groucho = MarxBrother.new
groucho.speak
# => "I can talk!"
```

Obviously, though, we want to be able to store something on the Marx Brother themselves! Maybe we want to know or set 
a Marx Brother's name, age or gender, for example.

We use what are called "getters" and "setters" to do this. These methods allow us to get attributes for particular objects, 
and to set attributes for particular objects

```ruby
class MarxBrother
    # This is a setter - it allows us to set the name for an object that inherits from
    # the MarxBrother class.
    def name=(name)
        # placing the '@' symbol before the variable name will give the variable Class
        # scope. This will be accessible from the other methods defined in the Class.
        @name = name
    end
​
    # This is a getter - it allows us to get, or read, the name for an object that 
    # inherits from the MarxBrother class.
    def name
        @name
    end
​
    def age=(age)
        @age = age
    end
​
    def age
        @age
    end
end
​
groucho = MarxBrother.new
groucho.name= "Groucho Julius Marx"
groucho.age= 80
​
groucho.name
# => "Groucho Julius Mar"
groucho.age
# => 80
```

Well, fortunately there is - we can use the `attr_accessor` method to specify what attributes we want to be able to 
**get** and **set** for instances of a class.

```ruby
class MarxBrother
    attr_accessor :name, :age
end
​
groucho = MarxBrother.new
groucho.name = "Groucho Julius Marx"
groucho.name
# => "Groucho Julius Marx"
​
groucho.age = 100
groucho.age
# => 100
```

Okay, that's pretty cool, we no longer have to write out those getter and setter methods, but it would be _great_ if 
we could set those `name` and `age` attributes when we **instantiate** \(create\) a new instance of that class.

Luckily, we have a solution for this.

On the creation of a new instance in Ruby, when the .new method is called, it will also automatically call a method called `initialize`.

```ruby
class MarxBrother
​
    attr_accessor :name, :age
​
    # you can provide default values when defining the arguments
    def initialize( name, age=20 )
        @name = name
        @age  = age
    end
​
end
​
harpo = MarxBrother.new("Harpo", 47);
#<MarxBrother:0x007fc0ea8687d0 @age=47, @name="Harpo">
​
# if we don't specify the age argument it will take the pre-defined value.
harpo = MarxBrother.new("Harpo");
#<MarxBrother:0x007fc0ea8687d0 @age=20, @name="Harpo">
```

This will do everything that we were doing before.

**IMPORTANT**: The initialize method will only be called when we instantiate a new object if is has that exact spelling - `initialize`.

We can add heaps of methods and see what we have to work with as well.

```ruby
class MarxBrother
    def method_one
    end
    def method_two
    end
    def method_three
    end
end
​
groucho = MarxBrother.new
​
# To see all the methods we can call on instances of the class to which the 
#MarxBrother object belongs:
​
groucho.class.instance_methods
# This will return an enormous array of methods that the object inherits from Ruby.
​
# That's annoying. How can we just see the methods we've defined for that class?
​
# If you pass in the value false to the instance_methods method, it will only show you
# the methods you have declared in the class definition.
​
groucho.class.instance_methods( false )
# => :method_one, :method_two, :method_three
```

### Exercise: Phone book

This exercise asks you to create a `PhoneBook` class that stores names and phone numbers and allows the operations of look-up, 
insertion and deletion.

Requirements for the `PhoneBook` class

Constructor:

`PhoneBook` - creates a new empty phone-book.

Instance methods:

`insert(name, number)`
Inserts a new entry in the phone-book. The entry can be inserted anywhere, but it is advisable to insert it at the end, 
in order to avoid confusion to the user.

`lookUp(name)`
Returns the phone number for the given name.

`delete(name)`
Deletes the entry with the given name. If no entry was looked up or found, the method does nothing.

### Homework

* Build your own CRUD app! pick a topic of your own.