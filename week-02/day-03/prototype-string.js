String.prototype.reverse = function() {
    let result = '';
    let value = this.toString();
    for (let index = value.length - 1; index > -1; index--) {
        result += value[index];
    }
    return result;
}

const pangram = 'The quick brown fox jumps over the lazy dog.';

console.log('The quick brown fox jumps over the lazy dog.'.reverse());