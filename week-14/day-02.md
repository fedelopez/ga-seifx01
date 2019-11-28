# Day 02

# Burning Airlines Lab

![image](https://pbs.twimg.com/media/COeYbe1WUAABHQ1.jpg)

## Summary

An Airlines Reservation System.

## Due date

Tuesday December 10th.

## Requirements

### Admin users

- An admin can create planes on the `/airplanes` page.
    - A plane has a name, rows, and columns.
    - When a new plane is saved the page should show a seating diagram.
- An admin can create flights on the `/flights` page.
    - A flight has a flight number, origin, destination, date, and plane.
    - When a new flight is saved, the page should show a list with the newest date at the top of the list and the number of available seats on the plane.

### Users

- A user can search for flights on the `/search` page.
    - The search page should have an input form for the origin and destination.
    - When a user creates a search, the page should show a list of flights with the newest date at the top, and include the number of available seats on the flight.
- When the user selects a flight, we should go to the show page ie, `/flights/3`.
    - The plane show page should show a seating diagram with available seats and seats that have been selected, with their names.
- A user can select a seat.
    - When a seat is saved, the available seats on the `/flights` page should update.

## Wire frame

![image](http://i.imgur.com/Xa2DNrr.png)

## Models

There are models for `Airplane`, `Flight`, `User`, and `Reservation`.

- An Airplane has many Flights and a Flight belongs to an Airplane.
- A User has many Reservations and a Reservation belongs to a User.
- A Flight has many Reservations and a Reservation belongs to a Flight.
- The Reservation table is a join table between Users and Flights, which have a many-to-many relationship through Reservations.

The Airplane model has rows and columns to determine the configuration of the plane; the Airplane model has a row and a column for a particular seat.

## Tech stack

- Rails
- React
- PostgreSQL
- A task tracker to manage the backlog:
  - https://trello.com or
  - https://pivotaltracker.com
  
## Getting started

- Create Git repo and share it so both members can collaborate.
- Create first React component on a new project and commit.
- Create first Rails endpoint on a new project and commit. This can be hard-coded.
- Call Rails endpoint from React, make sure backend data flows to the front-end.
- Plan out routing pages and navigation.
- Plan out some controller actions, and stub them in (use seed data first).
- Create a backlog, add user stories to it and make sure work is properly distributed. 