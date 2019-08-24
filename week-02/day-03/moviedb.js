const puffTheDragon = {
    title: "Puff the Magic Dragon",
    duration: 30,
    tags: ['Puff', 'Jackie', 'Living Sneezes']
};


const expected = 'Puff the Magic Dragon lasts for 30 minutes. Tags: Puff, Jackie, Living Sneezes.';

function displayString(movie) {
    // return `${movie.title} lasts for ${movie.duration}. Tags: ${displayTagsAsString(movie.tags)}`;
    return `${movie.title} lasts for ${movie.duration}. Tags: ${movie.tags.join(', ')}`;
}

function displayTagsAsString(tags) {
    let result = '';
    for (let index = 0; index < tags.length; index++) {
        if (index === 0) {
            result += tags[index];
        } else {
            result = result + '; ' + tags[index];
        }
    }
    return result;
}

console.log(displayString(puffTheDragon));