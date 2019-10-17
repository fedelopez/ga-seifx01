# Day 02

## Agenda

* Ruby - Class inheritance
* Ruby on Rails - Introduction
* Ruby on Rails - Basic Project Setup (no database)
* Ruby on Rails - Helpers

## Warmup

* [​Simple Sums](https://github.com/Yiannimoustakas/sei31-homework/tree/master/warmups/week05/day01_simple_sums)​​

## Ruby: Class inheritance

```ruby
class Feline
  attr_accessor :name, :age

  def initialize(name, age = 0)
    @name = name
    @age = age
  end

  def sleep
    p "#{@name} is sleeping"
  end

  def meow
    p "#{@name} is meowing!"
  end

  def about_me
    p "My name is #{@name} and I'm a #{type} of #{age} years old"
  end
end

class Cat < Feline
  def type
    'Cat'
  end
end

class Lion < Feline
  def type
    'Lion'
  end

  def meow
    p "#{@name} is meooooooowing!"
  end
end

groucho = Cat.new('groucho', 7)
groucho.about_me
groucho.sleep
groucho.meow
p groucho.class

harpo = Lion.new('harpo', 5)
harpo.about_me
harpo.sleep
harpo.meow
```

## Ruby on Rails

### A Brief History of Rails

David Heinemeier Hansson ('DHH') extracted Ruby on Rails from his work on the project management tool Basecamp, 
at the web application company also called Basecamp (formerly 37Signals). 
It is a web application framework he developed while creating Basecamp. 
He released it as open source in July 2004 and gave out commit rights in February 2005.
Today the project has more than 3K contributors and 74K commits.

The following products currently use Rails:

- Airbnb
- Groupon
- Github
- Couchsurfing
- Shopify
- Twitter
- Hulu
- Kickstarter
- etc.

### Further Reading, listening

* ​[Wikipedia - Ruby on Rails](http://en.wikipedia.org/wiki/Ruby_on_Rails)​
* ​[Ruby Rogues Podcast](https://devchat.tv/ruby-rogues)​

### What is Rails?

Rails is a web application framework, built with Ruby. It is designed to make programming all web applications much, 
much easier by making lots of assumptions about what you are going to need to get started. 
It means you have to write a lot less code, while building a lot more. Similar to Ruby, it makes development fun.

Rails is very opinionated (the same as its creator) - it makes an assumption there is a 'best' way to do something, 
and it encourages you to take that approach (while still allowing flexibility). If you follow the 'Rails Way', 
building a Rails app will be much easier.

The Rails philosophy includes three major guiding principles, which really just stem from Ruby itself (except the MVC pattern):

#### Don't Repeat Yourself (DRY)

DRY is a principle of software development, not exclusive to Ruby (though Ruby is very good at it, as is its community). 
Of all the principles of programming, Don't Repeat Yourself (DRY) is perhaps one of the most fundamental.

> The developer who learns to recognize duplication, and understands how to eliminate it through appropriate practice and 
proper abstraction, can produce much cleaner code than one who continuously infects the application with unnecessary repetition.

So by not writing the same code over and over again, our code is more maintainable, extensible and less buggy.

- Duplication is waste
- Repetition in process calls for automation
- Repetition in logic calls for abstraction

The principle has been formulated by Andy Hunt and Dave Thomas in their book The Pragmatic Programmer.

#### Convention Over Configuration (COC)

Rails, as previously mentioned, is very opinionated. If you don't follow its guidelines (naming conventions etc.), it is difficult. 
But if you do, the set up and ongoing maintenance is very efficient. It has the capacity to do most things by default 
as long as you follow the 'convention' - e.g. the 'Rails way'.

#### Model, View and Controller (MVC)

This is probably the most important. Rails structures everything like this, so it is important to understand this. 
MVC is a software architecture pattern that breaks the code into small manageable chunks and stems from the problem when
trying to modularize a user interface functionality so that it is maintainable and extensible. 
Those chunks are Models, Views and Controllers as you have probably guessed. But what are they?

- **Model** - The model manages the behaviour and data of the application domain, also where the database classes are created.
- **View** - The view manages the display of information.
- **Controller** - The controller interprets the user behaviour (it is like the switchboard)

> An easy way to understand MVC: the model is the data, the view is the window on the screen, and the controller is the glue between the two. 

[ConnellyBarnes](http://www.connellybarnes.com)​

It is all about the interactions:

- A controller can send commands to the model to update the model's state (e.g., editing a document). 
- It can also send commands to the associated view to change the presentation (and content). 
- A model stores data that is retrieved by the controller and displayed in the view. 
- Whenever there is a change to the data it is updated by the controller. 
- A view requests information from the model that it uses to generate an output representation to the user.

### How to install Rails

Simple! Rails is a gem. Just run `gem install rails`, make sure you don't add sudo at the start, even if prompted to do so! 
Ruby is, obviously, a dependency, so if you don't have Ruby, get that first.

### Basic Rails Project

#### Step 1: Planning

The first step for any Rails project is planning - it is very important to map out what your site will do, 
and how a user will use your site. Once you have figured that out, you can begin creating the project.

#### Step 2: New Rails Project

To create the Rails project, we use the `rails new project_name --skip-git` command in terminal. 
This takes a lot of options, but for now we will just stick with the basic command without any options.

Let's create a new project called "basics".

```bash
rails new basics --skip-git
```

The terminal output should be about a hundred lines that look like `create app/assets/javascripts/application.js`, `bin/rails: spring inserted`, etc.

Then we need to navigate into our project. 
This is where we'll run most commands relating to our project, like opening up a server, accessing the Rails console, bundling our Gems, etc.

```bash
cd basics
```

From here, we can open all the files Rails generated for us in Atom/VS Code/etc.

```bash
atom .
```

#### Step 3: Customize Gemfile

The Gemfile is where we specify what Ruby Gems we want to include in our application. Remember how with Sinatra we 
would first install a Gem from the command line and then `require` all the Gems our application depended on in the main.rb file? 
In a Rails app, we do this in our Gemfile.

The first changes we should make to the Gemfile are to make debugging easier.

After this, we alter our Gemfile to be more suited for debugging. The code we tend to use is this...

```ruby
group :development do
  gem 'pry-rails' #add the gem under existing development group
end
```

It's important to make sure those particular Gems go in a `group :development` block - we don't want this Gem being 
installed and shipped in the production environment!

Once we've updated our Gemfile, we need to 'bundle' our Gems - this will install the Gems in our Gemfile, along with 
their dependencies, which is quite important.

```bash
bundle
```

The terminal output should be about a few dozen lines that look like `Using web-console 2.3.0`, etc. 
The last few lines should look something like this:

```bash
=> Bundle complete! 12 Gemfile dependencies, 57 gems now installed.
=> Use `bundle show [gemname]` to see where a bundled gem is installed.
```

If you see something else, there was probably an error bundling the Gems which you'll need to address before going any further.

#### Step 4: Setup Routes

Now we get into the Routes (found in `config/routes.rb`). This is like the 'gets' methods in our Sinatra app's `main.rb` file.

A route determines how an HTTP request to a particular URL is handled - for example, in the second route below, a `get` 
request to the `/home` path will be sent to the `home` action in the `pages` controller.

There are a million different ways of approaching this, but at its most basic, your Routes might look something like this:

```ruby
Rails.application.routes.draw do
  # Root routes look a little different to other routes. This basically just says that requests to the "root" path (eg "/") are sent to the "pages" controller's "home" action.
  root :to => 'pages#home'

  # STATIC ROUTES
  # request_type route => controller#action
  get '/home' => 'pages#home'

  # DYNAMIC ROUTES WITH VARIABLE BITS IN PARAMS (JUST LIKE SINATRA)
  get '/auto/:color' => 'auto#color'
end
```

Lets load up the server by running `rails server` or `rails s` from our Rails project's root directory. If we go to `localhost:3000`, we'll see an error.

We are up to an Error Driven Development point now - we let the errors guide where we go next.

#### Step 5: Create a Controller

The first error we encounter will be an `uninitialized Constant` error. This means that we haven't created the 
controller associated with this URL - in our routes (config/routes.rb), we have directed requests to the root path
(ie "/", or "localhost:3000/" in development) to the **Pages controller**'s **Home action** (`root :to => "pages#home"`).

So, we need a Pages Controller, and we need a "home" method within it.

In our app/controllers/ folder, we need to create a file called **pages_controller.rb**. The spelling and syntax is important!

All our controllers inherit from the ApplicationController (remember classes in Ruby? This is an example of how Rails uses Ruby classes and inheritance) - this is what gives it all of its functionality. 
Our Pages controller, at its most basic, is going to look something like this...

```ruby
# Create a controller called PagesController, which inherits from the  ApplicationController
class PagesController < ApplicationController
    # Define a method (or "action") called "home" in this controller.
    def home
    end
end
```

#### Step 6: Create a View

Once we have this setup, if we refresh the page we'll see the **Missing template** - this is telling us that, 
even though our routes.rb has a route matching the path requested, and even though we have a controller and action 
matching those specified in the router, we don't have a view for that action.

By default, Rails will look for a template in with the same name as the action within a folder that has the same name as
the controller - this is why following naming conventions is so important in Rails!

In this case, Rails is looking for app/views/**pages**/**home**.html.erb, so let's make that file:

```bash
touch app/views/pages/home.html.erb
```

This is the sort of setup you need to go through for each particular page in your application (there are many ways to speed up the process, though).

To summarize...

## Ruby on Rails - Basic Project Setup (no database)

This is a summary of the steps detailed above:

| Step | What | Where | How |
| :--- | :--- | :--- | :--- |
| 1 | Planning | ​ | Pen & paper |
| 2 | New Rails project | Terminal | `rails new my_new_app_name --skip-git` |
| 3 | Edit Gemfile | /Gemfile | Add development Gems and bundle |
| 4 | Setup routes | /config/routes.rb | For each path, add a controller\#action |
| 5 | Create controller | /app/controllers/ | Create a \[controller\]\_controller.rb file |
| 6 | Create actions | /app/controllers/\[controller\]\_controller.rb | For each action, create a method |
| 7 | Create views | /app/views/\[controller\]/\[action\].html.erb | Create views for actions\* |
| 8 | Repeat 4-8 | ​ | ​ |

### Exercise: create a new Rails app

-  Following the same flow as before, show a table with your 10 favourite movies

| Movie | Director | Year |
| :--- | :--- | :--- |
| Star Wars | George Lucas | 1977 |
| Pulp Fiction | Quentin Tarantino | 1994 |
| ... | ... | ... |

## Ruby on Rails - Helpers

View helpers are collections of methods for patterns often expressed in Rails views. They can only be used in our views, 
and obviously need to be wrapped in ERB tags.

### Number Helpers

Number helpers are methods for converting numbers into formatted strings. Methods are provided for phone numbers, 
currency, percentage, precision, positional notation and file size.

```ruby
number_to_currency( value )
number_to_human( value )
number_to_phone( value, options )
number_to_phone( value, :area_code => true )
```

[Here are all of the number helpers.](http://api.rubyonrails.org/v4.2/classes/ActionView/Helpers/NumberHelper.html)

### Text helpers

These are a set of methods for filtering, formatting and transforming strings.

```ruby
# Pluralize - format
pluralize( value, 'singular_case' )
# Pluralize - example: @person_count = 4
pluralize( @person_count, 'person' )
# => 4 people

# Truncate - format
truncate( value, options )
# Trunace - example: @story = "The quick brown fox jumped over the lazy dog."
truncate( @story, :length => 15 )
# => "The quick brown"

# Cycle - format
cycle( list_of_values )
# Cycle - example:
cycle( 'red', 'green', 'orange', 'purple' )
```

[Here are all of the text helpers.](http://api.rubyonrails.org/v4.2/classes/ActionView/Helpers/TextHelper.html)

### Assets Helpers

These are methods for generating HTML links (or simple paths) to assets such as images, JavaScript files, stylesheets, and feeds.

```ruby
# image_tag - format
image_tag( 'path', options )
# image_tag - examples
image_tag( 'funny.jpg' )
# => <img src="http://badgerville.com/assets/funny.jpg">
image_tag( 'http://fillmurray.com/500/500', :class => "oh-bill" )
# => <img src="http://fillmurray.com/500/500" class="oh-bill">
image_path( 'edit.png' )
# => /assets/edit.png
```

[Here are all of the asset helpers.](http://api.rubyonrails.org/v4.2/classes/ActionView/Helpers/AssetUrlHelper.html)

### URL helpers

These are a set of methods for making links and getting URLs.

```ruby
link_to( 'Home', root_path )
link_to( 'Work Path', work_path( work.id ) )
link_to( 'Work Path', work_path( work ) )
link_to( 'Work Path', work )
button_to( 'Test Path', root_path, :method => 'GET' )
```

[Here are all of the url helpers.](http://api.rubyonrails.org/v4.2/classes/ActionView/Helpers/UrlHelper.html)

**Rails - Helpers - Further Readings**

* [Rails Guides - Overview of Helpers Provided by Action View](http://edgeguides.rubyonrails.org/action_view_overview.html#overview-of-helpers-provided-by-action-view)
* [Ruby on Rails API - ActionView::Helpers](http://api.rubyonrails.org/classes/ActionView/Helpers.html) - a list of all Action View helpers.

## Homework <a id="homework"></a>

* [Make: Magic 8 Ball | Secret Number | Rock Paper Scissors​​](https://gist.github.com/wofockham/f690b61c6e13742647c9)
* Read: [Rails Guides - Getting Started](http://guides.rubyonrails.org/v4.2/getting_started.html)​
* Read: [SitePoint - A Quick Study of the Rails Directory Structure](https://www.sitepoint.com/a-quick-study-of-the-rails-directory-structure/)​
