![General Assembly](https://github.com/fedelopez/ga-seifx01/blob/master/docs/generalassembly.png)

# Day 02

## Agenda

- Pagination in Express / React
- Deployment of Express / React apps in Heroku

# Pagination in Express / React

## Setting up Express

### Init folder

```bash
mkdir express-pagination && cd "$_"
```

Init yarn and add `express`:

```bash
yarn init -y
yarn add express
```

Add `nodemon` to reload automatically the server when detecting file changes:

```bash
yarn add nodemon -D
```

Add a script in `package.json` to run `nodemon` on `start-dev`: 

```text
{
  "name": "express-pagination",
  ...
  "devDependencies": {
    "nodemon": "^2.0.2"
  },
  "scripts": {
    "start": "node index.js",
    "start-dev": "nodemon index.js"
  }
}
```

### Init Express

Create main server file:

```bash
touch index.js
```

Open it and add new endpoint to return empty list of movies:

```ecmascript 6
const express = require('express');

const app = express();

app.get('/api/movies', (req, res) => {
    res.send({count: 0, rows: []});
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
```

Note that we have not defined `process.env.PORT`. This won't work until we supply the port from the environment.

Let's inject it from the environment using `direnv`!

### Install direnv

Now we are going to use a tool named [direnv](https://direnv.net) to load and unload environment variables depending on 
the current directory. 

```bash
brew install direnv
# now hook it up to your shell, on MacOS and bash:
# Add the following line at the end of the ~/.bashrc file:
eval "$(direnv hook bash)"
# Source the ~/.bashrc file
source ~/.bashrc
```

Create a file named `.envrc` with the following contents:

```text
export PORT=3000
```

now type `direnv allow` when prompted, this will inject the `PORT` variable to the environment and Express will be able to use it.
This follows the [12factor](https://12factor.net) way of configuring software-as-a-service apps.

Now you should be able to start the app using `yarn start-dev`.

### Create and seed the local DB

Ensure you have `psql` installed. 

Create a new Database:

```bash
dropdb express_pagination;
createdb express_pagination;
```

Open the `psql` terminal and import the `db/movies.sql` file:

```text
psql express_pagination;
express_pagination=# \i db/movies.sql
```

Note that in order to import the movies using the relative path to `db/movies` you must have opened the psql shell in the
project root folder.

This should have imported +4K movies and TV shows in the `movies` table:

```sql
select count(1) from movies;
 count
-------
  4916
(1 row)
```

Now install the PostgreSQL Node driver:

```bash
yarn add pg
```

### Connecting to the DB

Open `index.js` and modify it as below to create a connection pool that will be used by our controllers:

```ecmascript 6
const express = require('express');
const { Pool } = require('pg');

const app = express();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production'
});

app.get('/movies', (req, res) => {
    res.send({count: 0, rows: []});
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
```

Note that we have introduced another environment variable: `DATABASE_URL`, this will hold the full connection string to
the DB.

Update the `.envrc` file with the DATABASE_URL pointing to the locally created DB:

```text
export DATABASE_URL=postgres://`whoami`:@localhost:5432/express_pagination
export PORT=3001
```

Start the server and make sure no errors are highlighted.

### Paginate the results

```ecmascript 6
app.get('/api/movies', async (req, res) => {
    const client = await pool.connect();
    try {
        const count = await client.query('SELECT COUNT(1) as total from MOVIES');
        const result = await client.query(`SELECT id, movie_title, imdb_score FROM MOVIES order by imdb_score desc LIMIT 25 OFFSET ${req.query.offset}`);
        res.send({count: count.rows[0].total, rows: result.rows});
    } catch (error) {
        console.error('Could not retrieve movies from db', error);
        res.send({count: 0, rows: []});
    }
    client.release();
});
```

Calling the endpoint with an offset of 0 will start from the beginning, returning the first page:

```bash
curl http://localhost:3000/movies?offset=0
```

And calling it with an offset of 25 will return results for the second page:

```bash
curl http://localhost:3000/movies?offset=25
```

### Exercise: Add new endpoint to return one movie based on its id

Now that you have seen how to return multiple movies, create one `get` endpoint to return a single movie.

```ecmascript 6
app.get('/api/movies/:id', async (req, res) => {
    const client = await pool.connect();
    // TODO
    client.release();
});
```

When calling the endpoint on `curl`, the result should be like this:

```bash
curl http://localhost:3000/movies/1
```

```json
{
  "id": 1,
  "color": "Color",
  "director_name": "James Cameron",
  "num_critic_for_reviews": "723",
  "duration": 178,
  "director_facebook_likes": 0,
  "actor_3_facebook_likes": 855,
  "actor_2_name": "Joel David Moore",
  "actor_1_facebook_likes": 1000,
  "gross": 760505847,
  "genres": "Action|Adventure|Fantasy|Sci-Fi",
  "actor_1_name": "CCH Pounder",
  "movie_title": "Avatar",
  "num_voted_users": 886204,
  "cast_total_facebook_likes": 4834,
  "actor_3_name": "Wes Studi",
  "facenumber_in_poster": 0,
  "plot_keywords": "avatar|future|marine|native|paraplegic",
  "movie_imdb_link": "http://www.imdb.com/title/tt0499549/?ref_=fn_tt_tt_1",
  "num_user_for_reviews": 3054,
  "language": "English",
  "country": "USA",
  "content_rating": "PG-13",
  "budget": "237000000",
  "title_year": 2009,
  "actor_2_facebook_likes": 936,
  "imdb_score": "7.9",
  "aspect_ratio": "1.78",
  "movie_facebook_likes":33000
}
```

## Pagination from the front-end

Scaffold a new React app on a folder named `web`:

```bash
npx create-react-app web
```

On the newly created`web` directory, remove the following:

- `.git` folder
- `.gitignore` file

Make sure your `.gitignore` under the project root file looks like this one:

```text
node_modules
build
public
!web/public
.idea
npm-debug.log
yarn-debug.log*
yarn-error.log*
*.env
*.dev
.DS_Store
```

Add `Axios` as project dependency:

```bash
yarn add axios
```

### Proxy the http calls to the Express server.

Open the `package.json` from the React app and add a proxy to the Express server:

```text
{
  "name": "web",
  "version": "0.1.0",
  "private": true,
  ...
  "proxy": "http://localhost:3000"
}
```

### CSSing

Update the App.css with the following:

```css
.app {
    width: 75%;
    height: 100%;
    margin: 0 auto;
}

.movie-row {
    display: flex;
    margin-bottom: 0.5rem;
}

.movie-title {
    margin-right: 2rem;
    flex-grow: 2;
}

.movie-score {
    flex-grow: 1;
    text-align: end;
}

.page-container {
    display: flex;
    justify-content: space-evenly;
    margin-top: 2rem;
}

.page-total {
    flex-grow: 2;
    text-align: center
}
```

The `index.css` should have an entry like this one:

```text
body {
  margin: 5%;
  ...  
}
```

### Pagination component

```jsx harmony
import React, {Component} from 'react';
import Axios from 'axios';

class MovieList extends Component {
    state = {
        count: 0,
        offset: 0,
        movies: []
    };

    handlePrevious = (e) => {
        e.preventDefault();
        const newOffset = Math.max(0, this.state.offset - 25);
        Axios.get('/movies', {params: {offset: newOffset}})
            .then(result => {
                this.setState({count: result.data.count, offset: newOffset, movies: result.data.rows})
            });
    };

    handleNext = (e) => {
        e.preventDefault();
        const newOffset = Math.min(this.state.count, this.state.offset + 25);
        Axios.get('/movies', {params: {offset: newOffset}})
            .then(result => {
                this.setState({count: result.data.count, offset: newOffset, movies: result.data.rows})
            });
    };

    currentPage = () => Math.floor(this.state.offset / 25);

    totalPages = () => Math.floor(this.state.count / 25);

    componentDidMount() {
        Axios.get('/movies', {params: {offset: this.state.offset}})
            .then(result => {
                this.setState({count: result.data.count, movies: result.data.rows})
            });
    }

    render() {
        const movieList = this.state.movies.map((item, key) =>
            <div className='movie-row' key={key}>
                <div className='movie-title'><a href={item['movie_imdb_link']}>{item['movie_title']}</a></div>
                <div className='movie-score'>{item['imdb_score']}</div>
            </div>
        );
        return (
            <div>
                <h1>Top Rated Movies</h1>
                {movieList}
                <div className='page-container'>
                    {this.currentPage() > 0 ? <a href='#' onClick={this.handlePrevious}>Previous</a> :
                        <div>Previous</div>}
                    <div className='page-total'>Total: {this.state.count},
                        page {this.currentPage()} of {this.totalPages()}</div>
                    {this.currentPage() < this.totalPages() ? <a href='#' onClick={this.handleNext}>Next</a> :
                        <div>Next</div>}
                </div>
            </div>
        );
    }
}

export default MovieList;
```

And the `App.js` should look like this:

```jsx harmony
import React from 'react';
import './App.css';
import MovieList from './MovieList';

function App() {
    return (
        <div className="app">
            <MovieList/>
        </div>
    );
}

export default App;
```

### Using routes

```bash
yarn add react-router-dom
```

Update the `MovieList` component to allow users navigate to a particular movie:

```text
const movieList = this.state.movies.map((item, key) =>
    <div className='movie-row' key={key}>
        <div className='movie-title'><a href={'/movies/' + item['id']}>{item['movie_title']}</a></div>
        <div className='movie-score'>{item['imdb_score']}</div>
    </div>
);
```

Let's create a `MovieDetails` component that will retrieve the movie details based on the `id` when mounted:

```jsx harmony
import React, {Component} from 'react';
import Axios from 'axios';

class MovieDetails extends Component {
    state = {
        movie: undefined
    };

    componentDidMount() {
        Axios.get(`/api/movies/${this.props.match.params.id}`)
            .then((result) => {
                this.setState({movie: result.data});
            })
    }

    render() {
        return (
            <div>
                {this.state.movie ?
                    <div>
                        <h1>{this.state.movie.movie_title}</h1>
                        <p>Directed by: {this.state.movie.director_name}</p>
                        <p>Year: {this.state.movie.title_year}</p>
                        <a href={this.state.movie.movie_imdb_link}>IMdB link</a>
                    </div>
                    :
                    <p>No movie details</p>
                }
            </div>
        );
    }
}

export default MovieDetails;
```

We can now update the `App.js` to leverage `react-router-dom` to perform navigation:

```jsx harmony
import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import './App.css'
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';

export default function App() {
    return (
        <Router>
            <div className='app'>
                <nav>
                    <ul>
                        <li>
                            <Link to="/movies">Movie List</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route exact path="/movies/:id" component={MovieDetails} />
                    <Route exact path="/movies" component={MovieList} />
                    <Route exact path="/">
                        <h2>Welcome to the Movie app!</h2>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
```

Note that this setup works in local, but in the cloud we will have to make some changes to serve the React app from Express.

## Deploying to Heroku

In the cloud, Express will be the one serving the React app. For this we will have to use the static file middleware:

```ecmascript 6
//...
const app = express();
app.use(express.static('public')); // the React app will be bundled and placed in the public folder
//...
``` 

We also need to instruct Express to return the `index.html` file whenever a route is not found, but we will do that in the next
section.

```ecmascript 6
//make sure this is the last route declared
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
```

Update the `package.json` to look like this:

```json
{
  "name": "express-pagination",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "express": "^4.17.1",
    "pg": "^7.17.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.2"
  },
  "scripts": {
    "start": "node index.js",
    "start-dev": "nodemon index.js",
    "build-web": "yarn --cwd web install && yarn --cwd web build",
    "deploy-web": "cp -a web/build/. public/",
    "heroku-postbuild": "yarn build-web && yarn deploy-web"
  },
  "engines": {
    "node": "10.16.x"
  }
}
```

**Note** Make sure you supply the correct node engine version used locally.
This example uses v10.16 but you may be using other versions such as v13.

Create a file named `Procfile` with the following contents:

```text
web: node index.js
```

Now make sure everything is committed so we can proceed and create the Heroku app.

### Create the app and provision the DB on Heroku

```bash
heroku create
```

```bash
heroku addons:create heroku-postgresql:hobby-dev
```

### Seed the DB on Heroku

Open the Heroku `psql` terminal and import the `db/movies.sql` file:

```text
heroku pg:psql
\i db/movies.sql
```

### Deploy the app

```bash
git push heroku master
```

```bash
heroku open
```

## Further reading

- [Getting started with Node JS](https://devcenter.heroku.com/articles/getting-started-with-nodejs?singlepage=true)
- [Heroku Node JS support](https://devcenter.heroku.com/articles/nodejs-support)
- [Heroku PostgreSQL](https://devcenter.heroku.com/articles/heroku-postgresql#connecting-in-node-js)