function sum(array) {
    return reduce(0, array, (a, b) => a + b);
}

function multiply(array) {
    return reduce(1, array, (a, b) => a * b);
}

function reduce(initialValue, array, func) {
    let accumulator = initialValue;
    for (let index = 0; index < array.length; index++) {
        accumulator = func(accumulator, array[index]);
    }
    return accumulator;
}

let actual, expected;

actual = sum([2, 3]);
expected = 5;
console.log(`Result: ${actual}`);
console.assert(actual === expected, `Expected '${expected}', Got: '${actual}'`);

console.log('Now the multiplication.')
actual = multiply([1,2,3,4]);
expected = 24;
console.log(`Result: ${actual}`);
console.assert(actual === expected, `Expected: '${expected}', Got: '${actual}'`);