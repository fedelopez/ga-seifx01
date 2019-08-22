let kitchen = {};

kitchen.appliances = ['fridge', 'microwave', 'kettle'];
kitchen.pantry = ['green tea', 'coffee', 'cookies'];
kitchen.freshFood = ['milk'];
kitchen.hasWindows = true;
kitchen.orientation = 'north';
kitchen['the orientation'] = 'north';
let keyName = 'orientation';

console.log(kitchen);

function decorate(anyKitchen) {
    console.log(`I am decorating you: ${JSON.stringify(anyKitchen)}`);
    console.log(`I am placing the ${anyKitchen.appliances[1]} on the shelf`)
    console.log(`This kitchen is oriented ${anyKitchen.orientation}`)
    console.log(`This kitchen is oriented ${anyKitchen[keyName]}`)
}

decorate(kitchen);

let myCar = {};
myCar.wheels = 3;
myCar.model = 'Tricicle';
myCar.maker = 'BMW';
myCar.color = 'red';

let car2 = {
    wheels: 3,
    model: 'Tricicle',
    maker: 'BMW',
    color: 'blue'
};

console.log(myCar.model + ", " + myCar.color)
console.log(car2.model + ", " + car2.color)