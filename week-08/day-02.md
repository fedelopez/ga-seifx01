# Day 02

Agenda

* Warm up
* Solution Oscar winning exercise
* SQL (Structured Query Language)

## Warm up

* [Nucleotide](https://github.com/Yiannimoustakas/sei31-homework/tree/master/warmups/week04/day04_nucleotide_count)

## SQL

SQL (Structured Query Language) is a domain-specific language used in programming and designed for managing data held 
in a Relational Database Management System (RDBMS).

SQL lets you access and manipulate databases.

Some common RDBMs that use SQL are: PostgreSQL, MySQL, Microsoft SQL Server, SQLite, Oracle, etc.
Although most database systems use SQL, most of them also have their own additional proprietary extensions that are 
usually only used on their system. 

### Data Manipulation Language

SQL commands that deal with the manipulation of data (DML):

- "Insert"
- "Select"
- "Update"
- "Delete"

These commands are also called *CRUD* operations: (Create, Read, Update, Delete)

### Data Definition Language

SQL commands that deal with the creation/destruction of DB objects such as tables:

- "Create"
- "Drop" 
- "Alter"
 
### SQLite

SQLite is a relational database management system contained in a C library. 
In contrast to many other RDBMs, SQLite is not a client–server database engine. Rather, it is embedded into the end program.

### Create table

DDL operation to create a new table in the database.

Type the following in a file named `people.sql`:

```sql
CREATE TABLE people (
    id INTEGER PRIMARY KEY, -- Comma separated list of attributes with a type and a list of options
    first_name TEXT,
    last_name TEXT,
    age INTEGER
);
```

From the terminal execute the following:

```shell script
sqlite3 my_db.sqlite3 < people.sql
```

This line will create the `my_db.sqlite3` file if necessary, and if not - it will just add whatever is defined in the .sql file specified. 
It imports the details from the .sql into the `my_db.sqlite3` DB.

To make sure this has worked, type in `sqlite3 my_db.sqlite3` and hit enter in the terminal. 
This will open up a direct line to the database in the current folder. 

### Inserting records

Once we have the table defined, we need to figure out how to actually put records into it.

Connect to the DB with the command `sqlite3 my_db.sqlite3`

```sql
sqlite> INSERT INTO people (id, first_name, last_name, age) VALUES (1, "Bob", "Dobbs", 73);
```

We don't need to specify the attributes though - we can just use the values, like this:

```sql
sqlite> INSERT INTO people VALUES ( 1, "Bob", "Dobbs", 73 );
```

Alternatively, if you wrote this in a file, you can import that SQL into the database - `sqlite3 my_db.sqlite3 < insert_people.sql`

### Reading records

#### Select all attributes of all records from the person table

```sql
SELECT * FROM people;
```

#### Select only specific attributes of all the records in the person table

```sql
SELECT name FROM people;
```

#### Select with WHERE condition

Select all attributes from all records in the person database where the `first_name` in the record  is "Bob":

```sql
SELECT * FROM people WHERE first_name = "Bob"; 
```

### Exercise:

Create a Database with the following table:

`Employee`

- `id` Integer Primary Key 
- `first_name` text
- `business_title` text
- `salary` number
- `email` text

Then make sure you can populate the table with the following employees:

```sql
INSERT INTO employee (id, first_name, business_title, salary) VALUES ( 1, "John", "Software Engineer", 180000.00 );
INSERT INTO employee (id, first_name, business_title, salary) VALUES ( 2, "Mark", "Marketing Director", 185000.80 );
INSERT INTO employee (id, first_name, business_title, salary) VALUES ( 3, "Jane", "Junior Software Engineer", 90000.80 );
INSERT INTO employee (id, first_name, business_title, salary) VALUES ( 4, "Eddie", "DBA", 140000.80 );
INSERT INTO employee (id, first_name, business_title, salary) VALUES ( 5, "Kate", "CEO", 200000.40 );
INSERT INTO employee (id, first_name, business_title, salary) VALUES ( 6, "Bill", "Principal Software Engineer", 190000.80 );
INSERT INTO employee (id, first_name, business_title, salary) VALUES ( 7, "Cecily", "Designer", 140000.80 );
INSERT INTO employee (id, first_name, business_title, salary) VALUES ( 8, "Will", "Product Manager", 160000.20 );
INSERT INTO employee (id, first_name, business_title, salary) VALUES ( 9, "James", null, 160000.20 );
```

Search the name of the CEO

#### Select with LIKE condition

Select all attributes from all records in the person database where the `first_name` starts with "J" and `age` > 18:

```sql
SELECT * FROM people WHERE first_name LIKE 'J%' AND age > 18;
```

#### Select with NULL condition

Select all attributes from all records in the person database where the `first_name` is not missing:

```sql
SELECT * FROM people WHERE first_name IS NULL;
```

Alternatively, you can use `IS NOT NULL` to select non-null values.

### Exercise

From the Employee table created above:

- Search employees starting with the letter 'J'
- Search employees that are in engineering
- Search employees that don't have a business title
- Search employees with a salary greater than 160K

#### Select using a core function

Select youngest person:

```sql
SELECT first_name, min(age) FROM people;
```

Select first letter of `first_name`:

```sql
SELECT substr(first_name, 1, 1), last_name FROM people;
```

Select total number of people:

```sql
SELECT count(1) FROM people;
```

See more about core functions here: [SQLite Core Functions](https://www.sqlite.org/lang_corefunc.html)

#### Select with limit clause

```sql
SELECT * FROM people limit 5;
```

#### Select with order by clause

```sql
SELECT * FROM people order by last_name;
```

Tip: you can order by ascending/descending using the `asc` and `desc` operators after the column name.

### Exercise:

From the Employee table created above:

- Count number of employees
- Write a query to display the columns in a specific order by last_name and then by name.  
- Who are the 3 best paid employees? 
- Who is the less paid employee? 

### Update

Updates all the records:

```sql
UPDATE people SET first_name = "Robert";
```

Updates only matching records:

```sql
UPDATE people SET first_name = "Robert" WHERE first_name = "Robert";
```

### Exercise:

From the Employee table created above:

- Increase the salary of the lowest paid employee by 5%

### Delete

Delete all records in the person table where the first_name is equal to "Bob"

```sql
DELETE FROM people WHERE first_name = "Bob";
```

That is the basics of SQL, for more - see the further readings below. It's all about the principles though; as long as 
you understand the fact that you need a database to have tables, and tables to have records - that is all good.

### Add columns to existing table

```sql
ALTER TABLE people ADD email VARCHAR(255);
```

### Drop existing table

```sql
DROP TABLE people;
```

### Keeping integrity in check

```sql
CREATE TABLE people (
    id INTEGER PRIMARY KEY, 
    first_name TEXT NOT NULL, -- this column is now mandatory
    last_name TEXT,
    medicare_number TEXT unique, -- can't have duplicates
    age INTEGER
);
```

Now we can't insert people with null `first_names`:

```sql
sqlite> insert into people values (2, null, "Doe", "1232", 42);
Error: NOT NULL constraint failed: people.first_name
```

Now we can't insert 2 people with the same medicare number:

```sql
sqlite> insert into people values (1, "John", null, "123", 42);
sqlite> insert into people values (2, "Kate", null, "123", 31);
Error: UNIQUE constraint failed: people.medicare_number
```

### Combining Tables Together with SQL Join Statements

```sql
CREATE TABLE department (
    id INTEGER PRIMARY KEY,
    department_name TEXT,
    location TEXT
);
```

Now we can keep assign known departments to employees:

```sql
CREATE TABLE employee (
    id INTEGER PRIMARY KEY,
    first_name TEXT,
    business_title TEXT,
    salary REAL,
    department_id INTEGER,
    FOREIGN KEY(department_id) REFERENCES department(id)
);
```

#### Combining tables together with SQL join statements

```sql
SELECT * FROM employee e 
INNER JOIN department d on e.department_id = d.id;
```

#### Exercise:

Select employees from Sydney. 

### Homework

* Go through the exercises on w3resource: https://www.w3resource.com/sql-exercises/sql-retrieve-from-table.php
* Go through the exercises on W3Schools: https://www.w3schools.com/sql/exercise.asp
