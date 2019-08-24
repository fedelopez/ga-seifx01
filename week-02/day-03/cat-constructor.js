const Cat = function(name, age, breed, favouriteFood) {
    this.name = name;
    this.age = age;
    this.breed = breed;
    this.favouriteFood = favouriteFood;

    this.meow = function() {
        console.log('meow');
    };
    this.eats = function(food) {
        console.log(`${this.name} eats ${food}`);
    };
};

const yoda = new Cat('yoda', 1, 'siamese', 'cookies');
// yoda.eats('tuna');

// console.log(typeof yoda);

console.log(yoda instanceof String);
console.log(yoda instanceof Cat);