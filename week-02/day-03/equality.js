let object1 = {carName : 'tesla'};
let object2 = {carName: 'tesla'};

object2 = object1;

if (object1 === object2) {
    console.log('They are equal');
} else {
    console.log('They are not equal');
}

object2.carName = 'Mercedes';

console.log(object1.carName);