const Person = function(name, surname) {
    this.name = name;
    this.surname = surname;

    this.fullName = function() {
        console.log(`${this.name}, ${this.surname}`);
    }
};

const mary = new Person('mary', 'smith');
mary.name = 'sandy';

mary.fullName();

