function sumArray(array) {
    return reduce(0, array, (a, b) => a + b);
}

function multArray(array) {
    return reduce(1, array, (a, b) => a * b);
}

function reduce(acc, array, func) {
    let result = acc;
    for (let index = 0; index < array.length; index++) {
        result = func(result, array[index]);
    }
    return result;
}
let actual, expected;

actual = sumArray([1,2,3,4]);
expected = 10;
console.log(`Result: ${actual}`);
console.assert(actual === expected, `Expected '${expected}', Got: '${actual}'`);

actual = multArray([1,2,3,4]);
expected = 24;
console.log(`Result: ${actual}`);
console.assert(actual === expected, `Expected: '${expected}', Got: '${actual}'`);