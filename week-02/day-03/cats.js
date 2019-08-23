const createCat = function(name, age, breed, favouriteFood) {
    if (favouriteFood === undefined) {
        favouriteFood = "Bacon";
    }
    return {
        name: name,
        age: age,
        breed: breed,
        favouriteFood: favouriteFood,
        meow: function() {
            console.log("Meooooow");
        },
        eats: function(food) {
            console.log(`Lewis eats ${food}`);
        }
    };
};

const lewis = createCat("Lewis", 1, "Maine Coon", "Strawberries");
console.log(lewis.eats('popcorn'));

const cats = [
    createCat("Audrey", 1, "Domestic Shorthair", "Tuna"),
    createCat("Lewis", 1, "Maine Coon", "Strawberries"),
    createCat("Cooper", 1, "Domestic Shorthair")
];