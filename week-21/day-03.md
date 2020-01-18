![General Assembly](https://github.com/fedelopez/ga-seifx01/blob/master/docs/generalassembly.png)

# Day 03

## Agenda

* How to build Chrome extensions - Yianni
* Node app from scratch with Express

## Node app from scratch with Express

Express is a minimal web server built on Node.js that provides essential functionality for delivering web applications 
to the browser and mobile devices.

### Initialisation

Create a directory named `express-app`.

```bash
mkdir express-app && cd "$_"
```

Init `yarn` with defaults and add the `express` dependency:

```bash
yarn init -y && yarn add express
```

Create a file named `index.js`, this is going to be the main entry point of the app:

```
touch index.js
```

Open `index.js` and instantiate a new Express server:

```javascript
const express = require('express');
const app = express();
```

Let's create an endpoint at the root. 
For now it will just return the string "Hello, World!":

```javascript
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
```

Note the 2 arguments of the function are the request and response, they are given to us.

And let's start the app:

```javascript
app.listen(3000);
```

Would be nice to have some feedback when the server has started, let's provide a callback which be invoked 
when the server will be up:

```javascript
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
```

Now let's create an npm command that will start the app.
By convention we always start servers in the `scripts.start` key:

Add the following lines in the `package.json`:

```text
"scripts": {
    "start": "node index.js"
}
```

Now you can start the server using `yarn start`:

```text
○ → yarn start
yarn run v1.17.3
$ node index.js
Server running on port 3000
``` 

### Automatically restarting the server

You will notice that we have to kill and start the server each time we make changes to the code.
During development it can get very annoying.

To solve this problem we are going to use [nodemon](https://github.com/remy/nodemon).

> nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when 
file changes in the directory are detected.

```bash
yarn add nodemon -D
```

Now you can update the `start` script in package.json:

```text
{
  "name": "express-demos",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "express": "^4.17.1"
  },
  "scripts": {
    "start": "nodemon ./index.js"
  },
  "devDependencies": {
    "nodemon": "^2.0.2"
  }
}
```

If no script is given, nodemon will test for a `package.json` file and if found, will run the file associated with the `main` property.

So now if we add a new route, nodemon will restart automatically:

```javascript
app.get('/yo', (req, res) => {
  res.send('Yo, World!');
});
```

### Dynamic routing

Let's create an endpoint that returns Star Wars actors:

```javascript
const actors = [
    {"id": 1, "name": "Mark Hamill"}, 
    {"id": 2, "name": "Carrie Fisher"}, 
    {"id": 3, "name": "Adam Driver"}, 
    {"id": 4, "name": "Daisy Ridley"}, 
    {"id": 5, "name": "John Boyega"}
];
app.get('/actors', (req, res) => {
  const names = actors.map(actor => `<a href='/actors/${actor.id}'>${actor.name}</a>`);
  res.send(names.join("</br>"));
});
```

Now when we click on an actor in the browser we get this exception:

```html
Cannot GET /actors/1
```

This is because that route does not exist yet.

Let's create a `get` route that returns an actor based on the id, passed as a dynamic parameter:

```javascript
app.get('/actors/:id', (req, res) => {
  const id = Number(req.params.id);
  const actor = actors.find(actor => actor.id === id);
  res.send(`This is the page of ${actor.name}`);
});
```

### Template Engines

So now we have a list of actors showing on the screen, but it's pretty rudimentary and this would not scale in real life 
applications. A better way to do this is to use the Express support for template engines.

Express allows to use many different template engines. 

Today we are going to see 2 popular ones: `pug` and `Handlebars`.

#### Pug

Let's add `pug` to the `package.json`:

```bash
yarn add pug
```

Now we instruct Express to use pug as default view engine. Templates will be placed on the `views` folder.

```javascript
app.set('views', './views');
app.set('view engine', 'pug');
```

So now we can replace the manually built actors endpoint response by a template with some context:

```javascript
const actors = [
    {"id": 1, "name": "Mark Hamill"}, 
    {"id": 2, "name": "Carrie Fisher"}, 
    {"id": 3, "name": "Adam Driver"}, 
    {"id": 4, "name": "Daisy Ridley"}, 
    {"id": 5, "name": "John Boyega"}
];
app.get('/actors', (req, res) => {
  res.render('actors', { actors });
});
```

Now we can create the template named `actors.pug` under the `views` folder:

```text
.
├── index.js
└── views
    ├── actors.pug
```

with the following contents:

```text
doctype html
html(lang='en')
    head
        title= 'Actors'
    body
        h1= 'Welcome to the actors page'
        ul
            each actor in actors
                li
                    a(href='/actors/' + actor.id)= actor.name
```

#### Exercise: Pug conditional rendering

In this exercise you will learn by yourself how to do conditional rendering in pug.

Go to the page https://pugjs.org/language/conditionals.html

Read how-to use the conditional syntax pug offers.

Using pug's conditional syntax, show only the actors whose id is even. This means that calling the 
`/actors` endpoint, only the actors with ids 1, 3 and 5 will be displayed.

#### Handlebars

Another popular template engine is `Handlebars`. 

It's based in HTML so it leaves developers more freedom to do what they want.

```bash
yarn add express-handlebars
```

```javascript
const exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
```

By default handlebars uses the `views` directory.

```text
.
├── index.js
└── views
    ├── home.handlebars
    ├── actors.handlebars
    └── layouts
        └── main.handlebars
```

The `main.handlebars` layout is the HTML page wrapper which can be reused for the different views of the app. 

`main.handlebars` could look like this: 

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Actors App</title>
</head>
<body>
    {{{body}}}
</body>
</html>
```

`{{{body}}}` is used as a placeholder for where the main content should be rendered.

The actors template (`views/actors.handlebars`) looks like this on Handlebars:

```html
<ul>
    {{#each actors}}
        <li><a href="/actors/{{this.id}}">{{this.name}}</a></li>
    {{/each}}
</ul>
```

Let's also replace the index path at `/` to render the `home` template below:

```javascript
app.get('/', (req, res) => {
    res.render('home');
});
```

Note: adding the option `layout: false` will not embed it on the main template:

```javascript
res.render('home', {layout: false}); // instructs not embed it on main template
```

And the template (locate it under `/views/home.handlebars`):

```html
<h1>Welcome to my Express App.</h2>
<a href="/actors">Go to the actors page</a>
```

#### Exercise: Handlebars conditional rendering

In this exercise you will learn by yourself how to do conditional rendering in Handlebars.

Go to the page https://handlebarsjs.com/guide/builtin-helpers.html#if

Read how-to use the conditional syntax handlebars offers.

Show only the actors whose id is even. This means that calling the 
`/actors` endpoint, only the actors with ids 1, 3 and 5 will be displayed.

## Forms

Forms are an integral part of the web. Almost every website we visit offers us forms that submit or fetch some information for us. 
To get started with forms, we will first install `body-parser`, a middleware for parsing JSON and url-encoded data.

```bash
yarn add body-parser
```

```javascript
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/xwww-form-urlencoded
``` 

Let's refactor the `get` actor controller to send a handlebar template.

Now create the view for this endpoint:

```text
.
├── index.js
└── views
    ├── actor.handlebars
```

```html
<div>
    <h2>This is the page of {{actor.name}}</h2>
    <h3>This actor actor plays {{actor.character}} in Star Wars</h3>
    <a href="/actors/edit/{{actor.id}}">Edit</a>
</div>
```

Note that:

- we have added an additional field: `character`. We are going to allow users modify
actors their `name` and also their character in the Star Wars movies. 
- we have also added a link to the edit page for the actor

Let's create the endpoint to edit an actor:

```javascript
app.get('/actors/edit/:id', (req, res) => {
    const id = Number(req.params.id);
    const actor = actors.find(actor => actor.id === id);
    res.render('actor_edit', { actor });
});
```

Now we are going to create another template named `actor_edit.handlebars` to allow the user perform the edit:

```html
<div>
    <h2>Edit actor</h2>
    <form action="/actors/{{actor.id}}" method="POST">
        <label for="name">Actor Name
            <input name="name" value="{{actor.name}}">
        </label>
        <label for="character">Star Wars character
            <input name="character" value="{{actor.character}}">
        </label>
        <div>
            <input type="submit" value="Submit">
        </div>
    </form>
</div>
```

And now let's create the `POST` controller that is called by the form above.

This endpoint will:

- save the new actor data provided in the request
- redirect the user to the actor page

```javascript
app.post('/actors/:id', (req, res) => {
    const id = Number(req.params.id);
    const actor = actors.find(actor => actor.id === id);
    actor.name = req.body.name;
    actor.character = req.body.character;
    res.redirect(`/actors/${id}`)
});
```

## Serving static content

To serve static content such as images, fonts, css and even React apps we are going to use the 
static middleware function from Express.

To serve contents under a folder named `public` just add the following line:

```javascript
app.use(express.static('public'));
```

Now you can create the folder and add an image named `express.js` under `public/images`:

The `home.handlebars` template can be updated to show a banner with the express Logo:

```html
<img src="/images/express.jpg">
<h1>Welcome to my Express App.</h1>
<a href="/actors">Go to the actors page</a>
```

## Organising Code in Express

So far we have been using one file in our Actor app. This is fine for very small websites, but as our website will grow
this patter will not scale. Let's see how to organise our code in Express so that the codebase can grow organically.

Let's create a folder named `routes` sibling to `index.js`:

```text
.
├── index.js
└── routes
```

Create a file named `actors.js` inside the `routes` folder.

Now move all the actor endpoints to this file.

- Create a `router` instance and replace `app.get`, `app.post`, etc. by `router.get`, `router.post` and so on.
- Remove the base route `/actors` from all the endpoints.
- Ensure the module is exported using `module.exports` at the bottom

```javascript
const express = require('express');
const router = express.Router();

const actors = [
    {"id": 1, "name": "Mark Hamill"},
    {"id": 2, "name": "Carrie Fisher"},
    {"id": 3, "name": "Adam Driver"},
    {"id": 4, "name": "Daisy Ridley"},
    {"id": 5, "name": "John Boyega"}
];

router.get('/', (req, res) => {
    res.render('actors', { actors });
});

router.get('/edit/:id', (req, res) => {
    const id = Number(req.params.id);
    const actor = actors.find(actor => actor.id === id);
    res.render('actor_edit', { actor });
});

router.post('/:id', (req, res) => {
    const id = Number(req.params.id);
    const actor = actors.find(actor => actor.id === id);
    actor.name = req.body.name;
    actor.character = req.body.character;
    res.redirect(`/actors/${id}`)
});

router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const actor = actors.find(actor => actor.id === id);
    res.render('actor', { actor });
});

module.exports = router;
``` 

## Integrate with MongoDB

Up until now we have been storing changes in memory, which obviously is not ideal for production.
We are going to see how we can persist data in MongoDB, a document-oriented Database.

Install MongoDB.

On MacOS, you can use brew:

```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

Add the MongoDB driver for node:

```bash
yarn add mongodb
```

Let's seed the database with the list of actors we have been using.

Create a file named `actors.json` and paste the following:

```text
{"name": "Mark Hamill"} 
{"name": "Carrie Fisher"}
{"name": "Adam Driver"}
{"name": "Daisy Ridley"}
{"name": "John Boyega"}
{"name": "Anthony Daniels"}
{"name": "Harrison Ford"}
{"name": "Oscar Isaac"}
{"name": "Ewan McGregor"}
{"name": "Billy Dee Williams"}
{"name": "Peter Mayhew"}
{"name": "Alec Guiness"}
{"name": "Kenny Baker"}
{"name": "Natalie Portman"}
{"name": "Liam Neeso"}
{"name": "James Earl Jones"}
{"name": "Frank Oz"}
```

Run the following bash command to seed the database:

```bash
mongoimport --db test --collection actors --drop --file actors.json
```

You should see a successful response like this one:

```text
2020-01-17T23:49:40.352+1100	connected to: mongodb://localhost/
2020-01-17T23:49:40.352+1100	dropping: test.actors
2020-01-17T23:49:40.395+1100	17 document(s) imported successfully. 0 document(s) failed to import.
```

Now type ```mongo``` to connect to the MongoDB shell:

Now switch to the `test` database:

```use test```

```db.actors.find()```

this should return all the actors from the database.

Now let's replace the `get` actors controller to fetch the actors from the database instead from the memory.

First we will create a file named `db.js` with methods to connect, read and write to the MongoDB:

```javascript
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const url = 'mongodb://localhost:27017';
const dbName = 'test';
const client = new MongoClient(url);

let db, actors;

client.connect((error) => {
    if (error) {
        console.error('Could not connect to the MongoDB server. ')
    } else {
        console.log('Connected successfully to the MongoDB server.');
        db = client.db(dbName);
        actors = db.collection('actors');
    }
});

const findActors = function (callback) {
    actors.find({}).toArray(function (err, actors) {
        callback(actors);
    });
};

const findActorById = function (id, callback) {
    actors.findOne({_id: ObjectID.createFromHexString(id)}, function (err, actor) {
        callback(actor);
    });
};

const saveActor = function(id, name, character) {
    actors.update({_id: ObjectID.createFromHexString(id)}, {name, character});
};

module.exports = {findActors, findActorById, saveActor};
```

Now let's refactor the `routes/actors.js` to use the methods above:

```javascript
const express = require('express');
const router = express.Router();
const {findActors, findActorById, saveActor} = require('../db');

router.get('/', function (req, res) {
    findActors(function (actors) {
        res.render('actors', {actors});
    });
});

router.get('/edit/:id', function (req, res) {
    const id = req.params.id;
    findActorById(id, function (actor) {
        res.render('actor_edit', {actor: actor});
    });
});

router.post('/:id', function (req, res) {
    const id = req.params.id;
    saveActor(id, req.body.name, req.body.character);
    res.redirect(`/actors/${id}`)
});

router.get('/:id', function (req, res) {
    const id = req.params.id;
    console.log(id);
    findActorById(id, function (actor) {
        res.render('actor', {actor});
    });
});

module.exports = router;
```

Finally, make sure every id reference in the template is changed to '_id', for instance the `actor.handlebars`
should look like this one:

```html
<div>
    <h2>This is the page of {{actor.name}}</h2>
    <h3>Best known for {{actor.character}}</h3>
    <a href="/actors/edit/{{actor._id}}">Edit</a>
</div>
```

## Express application generator

Use the `express-generator` npm package to quickly create an application skeleton.

Some of the benefits of this module are:

- Provides with cloud-native ```www``` script that starts the app from port in environment
- Creates a basic folder structure that will help you organise code efficiently
- Has example route which helps how Express works

Usage: `npx express-generator` on an empty folder.