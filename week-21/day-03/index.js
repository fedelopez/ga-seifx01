const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const actors = require('./routes/actors');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.use('/actors', actors);

const port = 3000;
app.listen(port, function () {
    console.log(`Server running on port ${port}`);
});