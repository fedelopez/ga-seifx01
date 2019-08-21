function sergeSays(sentence) {
    if (!sentence) {
        return 'Fine. Be that way!';
    } else if (sentence === sentence.toUpperCase()) {
        return 'Woah, chill out!';
    } else if (sentence.endsWith('?')) {
        return 'Sure';
    } else {
        return 'Whatever.'
    }
}

function checkSpec(expected, actual) {
    console.assert(expected === actual, `Expected '${expected}', but got '${actual}'`);
}

checkSpec('Sure', sergeSays('Which city do you live in?'));
checkSpec('Woah, chill out!', sergeSays('HELLO!'));
checkSpec('Whatever.', sergeSays('Hey'));
checkSpec('Fine. Be that way!', sergeSays(undefined));
checkSpec('Fine. Be that way!', sergeSays(null));
checkSpec('Fine. Be that way!', sergeSays(''));