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
           7 | Cecily        | Sax
           9 | James         | Rina
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