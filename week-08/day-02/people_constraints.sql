CREATE TABLE people (
    id INTEGER PRIMARY KEY, 
    first_name TEXT NOT NULL, -- this column is now mandatory
    last_name TEXT,
    medicare_number TEXT unique, -- can't have duplicates
    age INTEGER
);