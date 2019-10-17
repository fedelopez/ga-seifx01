# Day 02

## Agenda

- PostgresQL Install
- Referential Integrity in SQL
- Ruby on Rails - Associations II

## Warm-up: Calculate the date of meetups

Typically meetups happen on the same day of the week. In this exercise, you will take a description of a meetup date, 
and return the actual meetup date.

Examples of general descriptions are:

- The first Monday of January 2017
- The third Tuesday of January 2017
- The wednesteenth of January 2017
- The last Thursday of January 2017

The descriptors you are expected to parse are:

`first`, `second`, `third`, `fourth`, `fifth`, `last`, `monteenth`, `tuesteenth`, `wednesteenth`, `thursteenth`, `friteenth`, `saturteenth`, `sunteenth`

Note that "monteenth", "tuesteenth", etc are all made up words. There was a meetup whose members realized that there 
are exactly 7 numbered days in a month that end in '-teenth'. Therefore, one is guaranteed that each day of the week 
(Monday, Tuesday, ...) will have exactly one date that is named with '-teenth' in every month.

Given examples of a meetup dates, each containing a month, day, year, and descriptor calculate the date of the actual meetup. 

For example, if given "The first Monday of January 2017", the correct meetup date is `2017/1/2`.

## Installing PostgreSQL

Install PostgreSQL from Brew:

```bash
brew install postgres
brew services start postgres
```

Confirm that Postgres has been properly installed:

```bash
psql #This should return:
# => psql: FATAL:  database "flopezlaborda" does not exist
```

### Creating a new DB

```bash
createdb seifx01
```

### Connecting to the DB

```bash
psql seifx01
# => psql (11.4)
# => Type "help" for help.
```

To know which tables belong to this schema, type `\d` 

```bash
seifx01=# \d
# => Did not find any relations.
```

As expected, the Database is empty.

## Referential Integrity in SQL

A referential integrity is a database concept that is used to build and maintain logical relationships between tables 
to avoid logical corruption of data. It is a very useful and important part in RDBMS.

Usually, referential integrity is made up of the combination of a primary key and a foreign key.

Let's create a new table and insert some data:

```sql
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    business_title TEXT NOT NULL,
    salary INTEGER NOT NULL 
);
INSERT INTO employee (first_name, business_title, salary) VALUES ('Bill', 'CTO', 195000);
INSERT INTO employee (first_name, business_title, salary) VALUES ('John', 'Software Engineer', 180000);
INSERT INTO employee (first_name, business_title, salary) VALUES ('Jane', 'Junior Software Engineer', 90000);
INSERT INTO employee (first_name, business_title, salary) VALUES ('Eddie', 'DBA', 140000);
INSERT INTO employee (first_name, business_title, salary) VALUES ('Kate', 'CEO', 200000);
INSERT INTO employee (first_name, business_title, salary) VALUES ('Bill', 'Principal Software Engineer', 190000);
INSERT INTO employee (first_name, business_title, salary) VALUES ('Cecily', 'Designer', 140000);
INSERT INTO employee (first_name, business_title, salary) VALUES ('Will', 'Product Manager', 160000);
INSERT INTO employee (first_name, business_title, salary) VALUES ('James', 'Platform Architect', 160000);
```

After creation, run this command to know what columns and objects is the table made of:

```bash
seifx01=# \d employee
```

**Note** how we don't need to supply IDs anymore when inserting data, these special auto-incrementing
objects are called **Sequences**.

### How do we assign a department to each employee?

It's good practice to avoid monolithic tables.

Now let's create the table `department`:

```sql
CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL
);
INSERT INTO department (name, location) VALUES ('Technology', 'Sydney');
INSERT INTO department (name, location) VALUES ('Sales', 'Melbourne');
INSERT INTO department (name, location) VALUES ('Services', 'Sydney');
```

### One to many associations

Let's add an association between Employee - Department

> An employee can belong to one and only one department

```sql
ALTER TABLE employee ADD COLUMN department_id INTEGER;
ALTER TABLE employee ADD FOREIGN KEY (department_id) REFERENCES department(id);
```

Let's assign `Eddie` to the `Technology` department:

```sql
UPDATE employee set department_id = 1 where first_name = 'Eddie';
```

```sql
seifx01=# select * from employee where department_id IS NOT NULL;
```

```text
 id | first_name |       business_title        | salary | department_id
----+------------+-----------------------------+--------+---------------
  4 | Eddie      | DBA                         | 140000 |             1
```

### Exercise

1. Update all employees with the business title containing the word `Engineer` to the `Technology` department.
2. Update the rest of the employees (those with no department) to the `Sales` department.

### Integrity constraint violation

Let's try and delete the `Technology` department from the `department` table:

```text
seifx01=# delete from department where id=1;
ERROR:  update or delete on table "department" violates foreign key constraint "employee_department_id_fkey" on table "employee"
DETAIL:  Key (id)=(1) is still referenced from table "employee".
```

This integrity check prevents data from being in an inconsistent/corrupted state.

### Using JOINS to select data from tables with relations

#### Inner joins

Select all the employee names and location that have a department:

```sql
SELECT e.first_name, d.location from employee e
INNER JOIN department d on e.department_id = d.id;
```

```text
 first_name | location
------------+----------
 Eddie      | Sydney
```

It can also be expressed as:

```sql
SELECT e.first_name, d.location from employee e
JOIN department d on e.department_id = d.id;
```

#### Left joins

Select all the employee names and location even if they don't have a department:

```sql
SELECT e.first_name, d.location from employee e
LEFT JOIN department d on e.department_id = d.id;
```

```text
 first_name | location
------------+----------
 Bill       |
 John       |
 Jane       |
 Kate       |
 Bill       |
 Cecily     |
 Will       |
 James      |
 Eddie      | Sydney
```

### One to one associations

Relationship between two tables where both the tables should be associated with each other based on only one matching row.

This is good to break up monolithic tables (e.g. too many columns, multiple domains mixed-up.)

Let's add an association between Employee - Address

> An employee can have one and only one contact info

```sql
CREATE TABLE contact_info (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    email TEXT,
    phone TEXT NOT NULL
);
INSERT INTO contact_info (first_name, email, phone) VALUES ('Jane', 'jane@me.com', '0447882221');
INSERT INTO contact_info (first_name, email, phone) VALUES ('Kori', 'kori@me.com', '0447882220');
INSERT INTO contact_info (first_name, email, phone) VALUES ('Carlene', 'carlene@me.com', '0447882211');
INSERT INTO contact_info (first_name, email, phone) VALUES ('Hildegaard', 'hildegaard@me.com', '0447882231');
INSERT INTO contact_info (first_name, email, phone) VALUES ('Worden', 'worden@me.com', '0447882241');
INSERT INTO contact_info (first_name, email, phone) VALUES ('Ezechiel', 'ezechiel@me.com', '0447882281');
INSERT INTO contact_info (first_name, email, phone) VALUES ('Sax', null, '0447782821');
INSERT INTO contact_info (first_name, email, phone) VALUES ('Aurelia', 'jane@me.com', '0467772221');
INSERT INTO contact_info (first_name, email, phone) VALUES ('Rina', null, '0447882981');
```

Now let's add the relation:

```sql
ALTER TABLE employee ADD COLUMN contact_info_id INTEGER;
ALTER TABLE employee ADD FOREIGN KEY (contact_info_id) REFERENCES contact_info(id);
ALTER TABLE employee ADD CONSTRAINT contact_info_id_unique UNIQUE (contact_info_id);
UPDATE employee SET contact_info_id = 1 WHERE id = 1;
UPDATE employee SET contact_info_id = 2 WHERE id = 2;
UPDATE employee SET contact_info_id = 3 WHERE id = 3;
UPDATE employee SET contact_info_id = 4 WHERE id = 4;
UPDATE employee SET contact_info_id = 5 WHERE id = 5;
UPDATE employee SET contact_info_id = 6 WHERE id = 6;
UPDATE employee SET contact_info_id = 7 WHERE id = 7;
UPDATE employee SET contact_info_id = 8 WHERE id = 8;
UPDATE employee SET contact_info_id = 9 WHERE id = 9;
```

### Alias

An alias is a feature of SQL that is supported by most, if not all, relational database management systems (RDBMSs). 
Aliases provide database administrators, as well as other database users, with the ability to reduce the amount of code 
required for a query, and to make queries simpler to understand. In addition, aliasing can be used as an obfuscation technique to protect the real names of database fields.

A programmer can use an alias to temporarily assign another name to a table or column for the duration of a SELECT query.

`select first_name as contact_name from contact_info;`

`select count(*) as total_employees from employee;`

#### Exercise: Missing contact info data! 

Which employees have supplied contacts without email?

The query should yield a result as follows:

```text
 employee_id | employee_name | contact_name
-------------+---------------+--------------
           7 | Bill          | Sax
           9 | Will          | Rina
```

### Many to many associations

Multiple records in one table are related to multiple records in another table.

Let's add an association between Employee - Project

> An employee can be assigned to one or many projects, and one project can have one or many employees

```sql
CREATE TABLE project (
    id SERIAL PRIMARY KEY,
    project_name TEXT NOT NULL,
    description TEXT
);
INSERT INTO project (project_name, description) VALUES ('Migration', 'Website migration');
INSERT INTO project (project_name, description) VALUES ('XMAS', 'XMAS Party 2020');
```

```sql
CREATE TABLE employee_project (
    employee_id INTEGER REFERENCES employee(id),
    project_id INTEGER REFERENCES project(id),
    CONSTRAINT employee_project_pkey PRIMARY KEY (employee_id, project_id)
);
INSERT INTO employee_project (employee_id, project_id) VALUES (2, 1);
INSERT INTO employee_project (employee_id, project_id) VALUES (3, 1);
INSERT INTO employee_project (employee_id, project_id) VALUES (3, 2);
```

```sql
select e.first_name, p.project_name 
from employee e 
inner join employee_project ep on e.id = ep.employee_id 
inner join project p on ep.project_id = p.id;
```

```text
 first_name | project_name
------------+--------------
 John       | Migration
 Jane       | Migration
 Jane       | XMAS
```

#### Exercise: Showing employees not assigned to projects

Which employees are not assigned to a project?

The query should yield a result as follows:

```text
 id | first_name | project
----+------------+---------
  1 | Bill       | N/A
  4 | Eddie      | N/A
  5 | Kate       | N/A
  6 | Bill       | N/A
  7 | Cecily     | N/A
  8 | Will       | N/A
  9 | James      | N/A
```

## Ruby on Rails - Installing PostgreSQL

Install the Postgres Gem - the Ruby interface for PostgreSQL.

```bash
gem install pg
```

Create the Postgres DB needed for Dev environment:

```bash
createdb rails_postgres_development
```

Generally, PostgreSQL is a great choice for your Rails applications - it is scalable, pretty much 
just as easy to set up as any other database and works on Heroku (where we will be hosting our applications during the course). 

To start a Rails application with a Postgres DB database, run:

```bash
rails new employee_management -T --skipt-git --database=postgresql
```

or simply

```bash
rails new employee_management -T --skipt-git -d postgresql
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

Let's start by creating the models:

```bash
rails generate model contact_info
rails generate model department
rails generate model employee
```

### `belongs_to`

A belongs_to association sets up a one-to-one connection with another model, such that each instance of the declaring 
model "belongs to" one instance of the other model. For example, if your application includes employees and contact_info, 
and each contact can be assigned to exactly one employee, you'd declare the order model this way:

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

Now we can create the relationship between objects:

```ruby
@contact_info = ContactInfo.create(contact_name: 'Popeye')
@employee = Employee.create(first_name: 'Olivia', contact_info_id: @contact_info.id)
```

### `has_many`

A has_many association indicates a one-to-many connection with another model. You'll often find this association on the "other side" of a belongs\_to association. This association indicates that each instance of the model has zero or more instances of another model. For example, in an application containing customers and orders, the customer model could be declared like this:

```ruby
class Department < ApplicationRecord
  has_many :employees
end
```

And the migration file:

```ruby
class CreateDepartments < ActiveRecord::Migration[6.0]
  def change
    create_table :departments do |t|
      t.text :department_name
      t.timestamps
    end
  end
end
```

Now we need to add the relation in the employee:

`rails generate migration add_department_id_to_employee department_id:integer`

Employee looks now like this:

```ruby
class Employee < ApplicationRecord
  belongs_to :contact_info
  belongs_to :department
end
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
department_1 = Department.create(department_name: 'Research & Development')
department_2 = Department.create(department_name: 'Marketing')

Employee.create(first_name: 'Allan', contact_info_id: contact_info_1.id, department_id: department_1.id)
Employee.create(first_name: 'Jane', contact_info_id: contact_info_2.id, department_id: department_1.id)
Employee.create(first_name: 'John', contact_info_id: contact_info_3.id, department_id: department_2.id)
```

Seed the DB with the data provided:

```bash
rails db:seed
```

Create a `pages_controller.rb` to search the R&D employees:

```ruby
class PagesController < ApplicationController
  def home
    @department = Department.all.select { |d| d.department_name = 'Research & Development' }.first
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

### Troubleshooting

#### Initialise the DB

This is helpful when you want to start over:

```bash
dropdb rails_postgres_development
createdb rails_postgres_development
rails db:migrate
rails db:seed
```

### Homework

* Read, and try: ​[Rails Guides - Association Basics](http://guides.rubyonrails.org/v4.2/association_basics.html)​
* Read, and try: ​[Rails Guides - Association Basics](https://api.rubyonrails.org/classes/ActiveRecord/FinderMethods.html)​