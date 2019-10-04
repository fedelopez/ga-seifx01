CREATE TABLE department (
    id INTEGER PRIMARY KEY,
    department_name TEXT,
    location TEXT
);

insert into department(id, department_name, location) values (1, 'Research', 'Sydney');
insert into department(id, department_name, location) values (2, 'Sales', 'Sydney');
insert into department(id, department_name, location) values (3, 'Technology', 'Melbourne');

CREATE TABLE employee (
    id INTEGER PRIMARY KEY,
    first_name TEXT,
    business_title TEXT,
    salary REAL,
    department_id INTEGER,
    FOREIGN KEY(department_id) REFERENCES department(id)
);

INSERT INTO employee VALUES ( 2, "John", "Software Engineer", 180000.00, 1 );
INSERT INTO employee VALUES ( 3, "Jane", "Junior Software Engineer", 90000.80, 1 );
INSERT INTO employee VALUES ( 4, "Eddie", "DBA", 140000.80, 1 );
INSERT INTO employee VALUES ( 5, "Kate", "CEO", 200000.40, 2 );
INSERT INTO employee VALUES ( 6, "Bill", "Principal Software Engineer", 190000.80, 1 );
INSERT INTO employee VALUES ( 7, "Cecily", "Designer", 140000.80, 3 );
INSERT INTO employee VALUES ( 8, "Will", "Product Manager", 160000.20, 1 );
INSERT INTO employee VALUES ( 9, "James", null, 160000.20, 3 );
