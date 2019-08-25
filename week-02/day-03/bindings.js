const sayHello = function() {    
    console.log("Hello, " + this.name);
    this.name = 'another name';
};
const person = {    
    name: "Lewis"
};
const cat = {    
    name: "yoda"
};
Object.freeze(cat);

// sayHello.call(cat);
// sayHello.apply(cat);
// sayGoodbye('john');// sayGoodbye(undefined, 'john');

// console.log(cat.name);

const hi = sayHello.bind(person);
hi();