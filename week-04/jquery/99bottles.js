function sing(numberOfBottles, stopValue = 0) {
    let song = [];
    for (let i = numberOfBottles; i >= stopValue; i--) {
        if (i === 0) {
            song.push('No more bottles of beer on the wall, no more bottles of beer.');
            song.push(`Go to the store and buy some more, ${numberOfBottles} bottles of beer on the wall.`);
        } else if (i === 1) {
            song.push('1 bottle of beer on the wall, 1 bottle of beer.');
            song.push('Take one down, pass it around, 1 bottle of beer on the wall...');
        } else if (i === 2) {
            song.push(`${i} bottles of beer on the wall, ${i} bottles of beer.`);
            song.push(`Take one down, pass it around, 1 bottle of beer on the wall...`);
        } else {
            song.push(`${i} bottles of beer on the wall, ${i} bottles of beer.`);
            song.push(`Take one down, pass it around, ${i - 1} bottles of beer on the wall...`);
        }
    }
    return song.join("\n");
}

console.log(sing(99));