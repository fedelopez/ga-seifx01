const createCat = function(name, age, breed, favouriteFood) {
    if (breed === undefined) {
        breed = 'siamese';
    }   
    if (favouriteFood === undefined) {
        favouriteFood = 'Tuna';
    }
    return {
        name: name,
        age: age,
        breed: breed,
        favouriteFood: favouriteFood,
        meow: function() {
            console.log('meow!!');
        },
        eats: function(food) {
            console.log(`${name} eats ${food}`);
        }
    }
};

let yoda = createCat('yoda', 1);
console.log(yoda.breed);
console.log(yoda.favouriteFood);
