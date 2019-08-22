let omelette = {
    title: 'Omelette',
    serves: 3,
    ingredients: [
        'egg', 
        'salt',
        'water',
        'vegetables'
    ]
};
console.log(omelette.title);
console.log(`Serves: ${omelette.serves}`);
console.log('Ingredients');
for (let index = 0; index < omelette.ingredients.length; index++) {
    console.log(omelette.ingredients[index]);
}
omelette.ingredients.forEach((ingredient) => {
    console.log(ingredient);
});
for (ingredient of omelette.ingredients) {
    console.log(ingredient);
}

delete omelette.serves;

console.log(omelette.serves);
