const addNumbers = function() {
    let sum = 0;
    for (let i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
};
console.log(addNumbers(3, 5));