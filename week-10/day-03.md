# Day 03

## Agenda

- Ruby on Rails - Installing PostgreSQL
- Ruby on Rails - Associations II
- Ruby on Rails - Authentication
- Project 01 intro - Yianni

## Ruby on Rails - Installing PostgreSQL

Install the Postgres Gem - the Ruby interface for PostgreSQL.

```bash
gem install pg
```

Generally, PostgreSQL is a great choice for your Rails applications - it is scalable, pretty much 
just as easy to set up as any other database and works on Heroku (where we will be hosting our applications during the course). 

To start a Rails application with a Postgres DB database, run:

```bash
rails new employee_management -T --skip-git --database=postgresql
```

or simply

```bash
rails new employee_management -T --skip-git -d postgresql
```

Create the Postgres DB needed for Dev environment:

```bash
# move to the newly created folder
cd employee_management

# create the db
rails db:create
```

## Ruby on Rails - Associations II

Associations allow you to create relationships between any two models (that inherit from `ActiveRecord::Base`). 
By declaratively telling Rails that two models have a certain association with each other, we can greatly streamline our code.

Rails supports six types of associations:

* `belongs_to`
* `has_many`
* `has_one`
* `has_many :through`
* `has_one :through`
* `has_and_belongs_to_many`

### `belongs_to`

A belongs_to association sets up a one-to-one connection with another model, such that each instance of the declaring 
model "belongs to" one instance of the other model. 

For example, if your application includes employees and contacts, and each contact can be assigned to exactly one employee, 
you'd declare the order model this way:

Let's start by creating the models:

```bash
rails generate model contact_info
rails generate model employee
```

```ruby
class Employee < ActiveRecord::Base  
  belongs_to :contact_info
end
```

And the migration file:

```ruby
class CreateEmployees < ActiveRecord::Migration[6.0]
  def change
    create_table :employees do |t|
      t.text :first_name
      t.timestamps
      t.integer :contact_info_id
    end
  end
end
```

A few things to note about `belongs_to` associations:

* The singularized form of the 'other' model (`employee`) _must_ be used for the association to work.
* The `employee` table must also include the `contact_info_id` to specify the associated contact.
* A `belongs_to` association often has a reciprocal `has_one` or `has_many` association on the other model.

### `has_one`

A `has_one` association also sets up a one-to-one connection with another model, but with somewhat different semantics \(and consequences\). This association indicates that each instance of a model contains or possesses one instance of another model.

```ruby
  class ContactInfo < ActiveRecord::Base    
    has_one :employee 
  end
```

and the migration file:

```ruby
class CreateContactInfos < ActiveRecord::Migration[6.0]
  def change
    create_table :contact_infos do |t|
      t.text :contact_name
      t.timestamps
    end
  end
end
```

Now we can run the migration:

```bash
rails db:migrate
```

Let's confirm our tables were properly created:

```bash
psql employee_management_development
```

Once connected to Postres, type the following:

```bash
\d contact_infos
```

You should see the following schema:

```text
    Column    |              Type              | Collation | Nullable |                  Default
--------------+--------------------------------+-----------+----------+-------------------------------------------
 id           | bigint                         |           | not null | nextval('contact_infos_id_seq'::regclass)
 contact_name | text                           |           |          |
 created_at   | timestamp(6) without time zone |           | not null |
 updated_at   | timestamp(6) without time zone |           | not null |
Indexes:
    "contact_infos_pkey" PRIMARY KEY, btree (id)
```

Similarly, ensure the employee table was created with a field referencing contact_info:

```text
                                            Table "public.employees"
     Column      |              Type              | Collation | Nullable |                Default
-----------------+--------------------------------+-----------+----------+---------------------------------------
 id              | bigint                         |           | not null | nextval('employees_id_seq'::regclass)
 first_name      | text                           |           |          |
 contact_info_id | integer                        |           |          |
 created_at      | timestamp(6) without time zone |           | not null |
 updated_at      | timestamp(6) without time zone |           | not null |
 department_id   | integer                        |           |          |
Indexes:
    "employees_pkey" PRIMARY KEY, btree (id)
``` 

Now we can initialise the DB by instantiating some objects in the `seeds.rb`:

```ruby
contact_info = ContactInfo.create(contact_name: 'Popeye')
employee = Employee.create(first_name: 'Olivia', contact_info_id: contact_info.id)
puts "Employee #{employee.first_name} created with id #{employee.id}"
```

Run the db:seed command to instruct Rails to initialise the DB with the script above:

```bash
rails db:seed
```

### Choosing Between belongs_to and has_one

If you want to set up a one-to-one relationship between two models, you'll need to add belongs_to to one, and 
`has_one` to the other. How do you know which is which?

The distinction is in where you place the foreign key (it goes on the table for the class declaring the belongs_to association), 
but you should give some thought to the actual meaning of the data as well. 

The `has_one` relationship says that one of something is yours - that is, that something points back to you. 

### `has_many`

A has_many association indicates a one-to-many connection with another model. You'll often find this association on the 
"other side" of a `belongs_to` association. This association indicates that each instance of the model has zero or more 
instances of another model. For example, in an application containing customers and orders, the customer model could be declared like this:

```bash
rails generate model department
```

```ruby
class Department < ApplicationRecord
  has_many :employees
end
```

Employee should look like this:

```ruby
class Employee < ApplicationRecord
  belongs_to :contact_info
  belongs_to :department
end
```

And the migration file, including the create table for department and adding a new column:

```ruby
class CreateDepartments < ActiveRecord::Migration[6.0]
  def change
    create_table :departments do |t|
      t.text :name
      t.timestamps
    end
  end
  
  def change
      add_column :employees, :department_id, :integer
  end
end
```

Let's run the migration again:

```bash
rails db:migrate
```

A few things to note about `has_many` associations:

* The pluralized form of the 'other' model (`orders`) _must_ be used for the association to work.
* A `has_many` association often has a reciprocal `belongs_to` association on the other model.
* The model with the `has_many` association doesn't store the 'foreign key' of the related model. That goes on the model with the `belongs_to` association.

### Putting it all together

Initialise the `seeds.rb` file with the following data:

```ruby
contact_info_1 = ContactInfo.create(contact_name: 'Mia')
contact_info_2 = ContactInfo.create(contact_name: 'Nancy')
contact_info_3 = ContactInfo.create(contact_name: 'Joe')
department_1 = Department.create(name: 'Research & Development')
department_2 = Department.create(name: 'Marketing')

Employee.create(first_name: 'Allan', contact_info_id: contact_info_1.id, department_id: department_1.id)
Employee.create(first_name: 'Jane', contact_info_id: contact_info_2.id, department_id: department_1.id)
Employee.create(first_name: 'John', contact_info_id: contact_info_3.id, department_id: department_2.id)
```

Seed the DB with the data provided:

```bash
rails db:seed
```

Create a `pages_controller.rb` to search the R&D employees:

```bash
rails generate controller Pages home
```

```ruby
class PagesController < ApplicationController
  def home
    @department = Department.all.select { |d| d.name = 'Research & Development' }.first
    @employees = Employee.where("department_id = #{@department.id}")
  end
end
```

And the view under `app/views/pages/home.html.erb`:

```html
<h1><%= @department.department_name %> Employees</h1>
<ul>
  <% @employees.each do |employee| %>
    <li><%= employee.first_name %></li>
  <% end %>
</ul>
```

Update the `routes.rb` file with the new view on the root path:

```bash
root :to => 'pages#home'
```

### Exercise: show employee postcode

Add a new address table with the following schema:

```bash
id serial, postcode int
```

then show the postcode next for each employee of the R&D department:

```html
<h1>Research & Development Employees</h1>
<ul>
    <li>Allan, postcode: 2090</li>
    <li>Jane, postcode: 2000</li>
</ul>
```

### has_many :through

A `has_many :through` association is often used to set up a many-to-many connection with another model. 
This association indicates that the declaring model can be matched with zero or more instances of another model by 
proceeding through a third model.

```bash
rails generate model Allocation
rails generate model Project
```

And the models:

```ruby
class Employee < ActiveRecord::Base  
  has_many :allocations  
  has_many :projects, through: :allocations
end​

class Allocation < ActiveRecord::Base  
  belongs_to :employee  
  belongs_to :project
end

​class Project < ActiveRecord::Base  
  has_many :allocations  
  has_many :employees, through: :allocations
end
```

Now let's edit the migration files:

```ruby
class CreateAllocations < ActiveRecord::Migration[6.0]
  def change
    create_table :allocations do |t|
      t.integer :employee_id
      t.integer :project_id
      t.timestamps
    end
  end
end
```

```ruby
class CreateProjects < ActiveRecord::Migration[6.0]
  def change
    create_table :projects do |t|
      t.text :name
      t.text :description
      t.timestamps
    end
  end
end
```

### Exercise: Showing the projects employees are allocated to

Given the following `seeds.rb` script

```ruby
mia = ContactInfo.create(contact_name: 'Mia')
nancy = ContactInfo.create(contact_name: 'Nancy')
joe = ContactInfo.create(contact_name: 'Joe')

research = Department.create(name: 'Research & Development')
marketing = Department.create(name: 'Marketing')

allan = Employee.create(first_name: 'Allan', contact_info_id: mia.id, department_id: research.id)
jane = Employee.create(first_name: 'Jane', contact_info_id: nancy.id, department_id: research.id)
john = Employee.create(first_name: 'John', contact_info_id: joe.id, department_id: marketing.id)

migration = Project.create(name: 'Migration', description: 'Website migration')
xmas = Project.create(name: 'XMAS', description: 'XMAS Party 2019')

Allocation.create(employee_id: allan.id, project_id: migration.id)
Allocation.create(employee_id: allan.id, project_id: xmas.id)
Allocation.create(employee_id: jane.id, project_id: migration.id)
Allocation.create(employee_id: john.id, project_id: xmas.id)
```

For each employee of the R&D department:

- Show the projects (description) they are allocated to

```html
<h1>Research & Development Employees</h1>
<h2>Allan</h2>
<h3>Projects</h3>
<ul>
    <li>Website migration</li>
    <li>XMAS Party 2019</li>
</ul>
<h2>Jane</h2>
<h3>Projects</h3>
<ul>
    <li>Website migration</li>
    <li>XMAS Party 2019</li>
</ul>
```

### `has_one :through`

A `has_one :through` association sets up a one-to-one connection with another model. This association indicates that 
the declaring model can be matched with one instance of another model by proceeding through a third model.

```ruby
class Supplier < ActiveRecord::Base  
  has_one :account  
  has_one :account_history, through: :account
end

​class Account < ActiveRecord::Base  
  belongs_to :supplier  
  has_one :account_history
end

​class AccountHistory < ActiveRecord::Base  
  belongs_to :account
end
```

### `has_and_belongs_to_many`

A `has_and_belongs_to_many` association creates a direct many-to-many connection with another model, with no 
intervening model. This association is often abbreviated to 'HABTM'.

```ruby
class Employee < ActiveRecord::Base  
  has_and_belongs_to_many :projects
end​

class Project < ActiveRecord::Base  
  has_and_belongs_to_many :employees
end
```

### Troubleshooting

#### Initialise the DB

This is helpful when you want to start over:

```bash
rails db:drop
rails db:create
rails db:migrate
rails db:seed
```

## Authentication

### Authentication vs Authorization

* **Authentication** is the process of determining who a user is - it is about identity.
* **Authorization** is the process of declaring what a user is allowed to do - it is about permissions.

The term 'authentication' is often loosely applied to the end-to-end process of signing-up, logging-in and signing-out a user.

### Authentication in Rails

Authentication is rough, and rarely (if ever) will you be asked to build your own authentication system. 
There are plenty of gems that will do that sort of thing, but if you want to do it for yourself - there are a bunch of 
things you need to do.

First things first - we don't store passwords in plain text, we store it in something called a `password_digest`. 
This is an encrypted password.

Let's create our User model!!

### User model and users database table

```
rails new rails-auth -T --skip-git --database=postgresql
```

```
createdb rails_auth_development
```

```bash
# Create our User model and the migration for creating the users table in the database.
rails generate model User name:string password_digest:string age:integer email:string
​
# Run the migration generated to create the users table in the database.
rails db:migrate
```

### Password encryption

Now, we need to use our Gemfile to get something that does the password encryption (hashing). 
We normally use [bcrypt](https://github.com/codahale/bcrypt-ruby) for this.

Go to the Gemfile and uncomment the following line:

```ruby
gem 'bcrypt', '~> 3.1.7'
```

```bash
bundle
# ...
# Fetching bcrypt 3.1.13
# Installing bcrypt 3.1.13 with native extensions
# ...
```
In our User model, we need to add the following line:

`has_secure_password`

Including this method in our user model adds methods to set and authenticate encrypted passwords. 
In order for the `has_secure_password` method to work, your database table _must_ have a `password_digest` column.

`has_secure_password` adds the following validations to your model:

* A password must be present when a `User` object is created
* A password must be < 72 characters long
* The `password` and `password_confirmation` must match
* The `password == password_confirmation` validation check will only be triggered if a password_confirmation field 
is present. For forms that do not require this validation (eg, sign-in), just leave the password_confirmation field out altogether.

### Forms

Even though the users table in our database has a `password_digest` column, any forms relating to sign-up or sign-in 
_still_ need to use `password` and `password_confirmation` parameters. A user doesn't enter their `password_digest` 
directly - Rails knows that the model "has secure password", and when bcrypt sees a `password` and `password_confirmation`, it knows what to do with it.

### Interlude - HTTP

Now we can authenticate a user based on their credentials, including an encrypted password, but before we get into 
authorization (what a user can _do_, having been _authenticated_), we need a way to be able to remember who an authenticated user is.

HTTP is stateless, so either the browser or the application (or both) need to 'remember' who the user is. 
To do this, we're going to store their identity in something called the **session hash**\*. 
Without this, a user would need to actively prove their identity every single time they send a request to the server.

## Authorisation

Now that we have set up the authentication system, let's work on authorisation - specifying what actions we will allow users to perform.

Let's say we want most actions in our application to be restricted to authenticated users - users who have signed in 
using valid credentials, and whose user_id is now stored in the sessions hash (thanks to our `session#create` action).

Since this is not going to be limited to a particular controller, we'll put this code in our application_controller, 
from which all other controllers inherit. So, in `app/controllers/application_controller.rb`:

```ruby
class ApplicationController < ActionController::Base
​
  # Before any action is performed, call the fetch_user method.
  before_action :fetch_user
​
  private
​
  def fetch_user
    # Search for a user by their user id if we can find one in the session hash.
    if session[:user_id].present?
      @current_user = User.find_by :id => session[:user_id]
​
      # Clear out the session user_id if no user is found.
      session[:user_id] = nil unless @current_user
    end
  end
​
  def authorize_user
    redirect_to root_path unless @current_user.present?
  end
end
```

Now we have a `@current_user` variable which will be available whenever a session includes a `user_id`. 
We can use the presence of this variable to perform simple authorisation tasks.

We also have an `authorise_user` method, which will redirect a user to the root_path if that `@current_user` 
variable is not present. We probably don't want to create a `before_action` for this method in our application controller, 
since there are going to be a number of actions we want unauthenticated users to be able to do, like access the homepage, 
sign-up, sign-in, etc.

Instead, we'll call that method on a controller-by-controller basis.

```ruby
class UsersController < ApplicationController
  before_action :authorise_user, :except => [:index]
end
```

The `:except` method allows us to limit the scope of this authorisation method to all actions within the Users controller 
_except_ a particular action or actions - in this case, the index action. This means that unauthenticated users will 
still be able to view the Users index.

We can extend this pattern to other types of authorisation. For example, if our users table has an `admin` column with 
the data type `boolean`, we could restrict particular actions to authenticated admin users. For example:

```ruby
class AdminController < ApplicationController
  before_action :authorise_admin
​
  def burn_all_bridges
    [User, Song, Mixtape, Artist, Genre, Album].each do |table|
      table.destroy_all
    end
  end
​
  private
  def authorise_admin
    redirect_to root_path unless @current_user.present? && @current_user.admin
  end
end
```

### Sessions

When a user visits a Rails site (or rather, when a client sends a request to a Rails server), the application checks 
whether the client includes a cookie containing a valid session ID for the application. If none exists (ie, if this is 
a new user, or they are not logged in), the app will create a new session on the application side, and store that in 
an encrypted cookie on the client-side.

Two parts of the session that are pivotal to authentication and authorization are the **session hash** and **flash hash**:

#### Session hash 

The session hash:

* Is a collection of key/value pairs;
* Includes a `session_id`. This ID is:
  * A 32 character string of random characters;
  * Included in every cookie sent from the application to the client's browser;
  * Sent to the server with every request from the client;
* Is unique to each user (and unique to a particular user's 'session');
* Is private between the user and the server.

We can store a (small) bunch of information in the session hash, including an authenticated user's `user_id` - this is 
the key to effective authorization in Rails.

#### Flash hash

The flash hash is a special part of the session that is cleared after each HTTP request - this means that values stored
there will only be available in the next request, which is useful for passing error messages etc 
(e.g, if a user is not authorized to access a particular action).

The flash hash:

* Is a collection of key/value pairs;
* Has arbitrary keys, but the convention is to use:
  * `flash[:notice]` or `flash[:success]` for storing success messages;
  * `flash[:error]` for storing error messages.
* Will be available for: 
  1. the current request; and 
  2. the subsequent request (unless `flash.now` is used)

  before it is destroyed (unless `flash.keep` is used).

A few helpful tips for dealing with the flash hash:

* If you want to set a flash that will only be available for the current action - and _not_ be available to the subsequent action - use the `flash.now` method.
* If you want to keep a flash for more than one controller action, use the `flash.keep` method in the action which should carry the flash on to the next action.

Example usage:

```ruby
def create
  user = User.create(user_params)
  if @user.save
    flash[:notice] = 'User was successfully created.'
    redirect_to user_path(user)
  else
    flash.now[:error] = 'Could not create user.'
    render 'new'
  end
end
```

Below is a pattern for storing a user's `user_id` to their session hash when they sign-in, and to track this for 
authorization within the application.

#### Create a session controller

Our session controller has no associated model and only requires three actions - new, create and destroy.

```bash
rails generate controller Session new create destroy
```

Note: This will create two views that we don't need. Delete those.

```bash
rm app/views/session/create.html.erb
rm app/views/session/destroy.html.erb
```

Note: This will also have create several routes that we don't want. Delete the following routes from your config/routes.rb file:

```ruby
get 'session/new'
get 'session/create'
get 'session/destroy'.
```

#### Setup login routes

Our pages controller will be the main entry point of the app

```bash
rails generate controller Pages home
```

Add the following routes to your config/routes.rb file:

```ruby
root :to => 'pages#home'            
get '/login' => 'session#new'         # This will be our sign-in page.
post '/login' => 'session#create'     # This will be the path to which the sign-in form is posted
delete '/login' => 'session#destroy'  # This will be the path users use to log-out.
```

#### Add log-in / sign-out links to our layout

You'll probably won't to wrap this in some conditional logic once you have your `fetch_user` method set up 
(see Authorization, below), but these links in your `app/views/layouts/application.html.erb` layout will allow users to 
log-in and sign-out:

```html
<ul>
  <li><%= link_to("Sign Up", controller: "session", action: "new") %></li>
  <li><%= link_to("Log Out", login_path, :method => :delete) %></li>
</ul>
```

#### Setup session controller actions

We want to use our session controller to handle login and logout. 

- If a user logs in with a valid username & password combination, their `user_id` will be stored in the session hash. 
- If a user logs out, the `user_id` will be removed from the session hash.

In your `app/controllers/session_controller.rb` file:

```ruby
class SessionController < ApplicationController
​
  def new
    # This is the action for user login. The view will have the login form template.
  end
​
  def create
  # This is the action to which the login form post request is posted. It will add the 
  #user's id to the session hash, which will be used for authentication and 
  #authorization throughout the session.
    user = User.find_by :email => params[:email]
    if user.present? && user.authenticate(params[:password])
      # If a user record with the entered in the form is present AND the user is 
      #authenticated (using bcrypt's authenticate method and the password entered in 
      #the form), store their id in the session hash and redirect them to the root 
      #path.
      session[:user_id] = user.id
      flash[:notice] = 'User created!'
      redirect_to root_path
    else
      # If the user cannot be authenticated, redirect them to the login_path.
      flash[:error] = 'Invalid credentials'
      redirect_to login_path
    end
  end
​
  # This is the action to which the user sign-out delete request is posted.
  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end
end
```

#### Creating the login form

```html
<h1>Login</h1>
<%= form_with(url: "/login", method: "post") do %>
  <div>
    <label>
      Email
      <input type="email" name="email"/>
    </label>
  </div>
  <div>
    <label>
      Password
      <input type="password" name="password"/>
    </label>
    <div>
      <input type="submit" value="Login"/>
    </div>
  </div>
<% end %>
<div>
  <%= @error_message %>
</div>
```

#### Adding logged in user information to the home page

Update the `PagesController` to load the current logged in user:

```ruby
class PagesController < ApplicationController
  def home
    @logged_in_user = User.find_by :id => session[:user_id]
  end
end
```

Let's enrich the `home.html.erb` view to display a welcome message if the user is logged in:

```html
<h1>Home</h1>
<% if @logged_in_user.nil? %>
  <h2>Sign-in</h2>
<% else %>
  <h2>Welcome back, <%= @logged_in_user.name %>!</h2>
<% end %>
<ul>
  <li><%= link_to("Sign Up", controller: "session", action: "new") %></li>
  <li><%= link_to("Log Out", login_path, :method => :delete) %></li>
</ul>
```

### Exercise: improve the current login app

- Add a new page so that users can sign-up to the application

## Homework

* Read, and try: ​[Rails Guides - Association Basics](http://guides.rubyonrails.org/v4.2/association_basics.html)​
* Read, and try: ​[Rails API - Finder Methods](https://api.rubyonrails.org/classes/ActiveRecord/FinderMethods.html)​
* ​Read [The Buckner Life - Simple Authentication with Bcrypt](https://gist.github.com/thebucknerlife/10090014) - this is a great, step-by-step Bcrypt tutorial.
* ​Read [Rails Guides - Security Guide](http://guides.rubyonrails.org/security.html)​