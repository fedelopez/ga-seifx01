function sum(array) {
    let result = 0;
    for (let index = 0; index < array.length; index++) {
        result = result + array[index];
    }
    return result;
}

function multiply(array) {
    let result = 1;
    for (let index = 0; index < array.length; index++) {
        result = result * array[index];
    }
    return result;
}

let actual, expected;

actual = sum([1, 2, 3, 4]);
expected = 10;
console.log(`Result: ${actual}`);
console.assert(actual === expected, `Expected '${expected}', Got: '${actual}'`);

actual = multiply([1, 2, 3, 4]);
expected = 24;
console.log(`Result: ${actual}`);
console.assert(actual === expected, `Expected: '${expected}', Got: '${actual}'`);