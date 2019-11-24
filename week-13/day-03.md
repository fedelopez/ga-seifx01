# Day 03

What we covered today:

* React
  * Function Components
  * Conditional Rendering
  * Callbacks to pass state
  * Lifecycle
  * Ajax calls from React
  * Routing
  * Debugging
  
## Exercise time: Grocery list

Create a React web app that allows users adding items to a grocery list.

```html
<!DOCTYPE html>
<html lang="en">
<body>
    <h2>Grocery list</h2>
    <input type="text" />
    <button>Add to list</button>
    <ul>
        <li>Salad</li>
        <li>Cabbage</li>
        <li>Carrots</li>
    </ul>    
</body>
</html>
```  

## Function Components

We can replace the syntax of the `Hello` class with a function accepting the `props` as parameter:

```jsx harmony
function Hello(props) {
  return (
    <div>
        <h1>Hello, {props.name}!</h1>
        {props.children}
    </div>
  );
}

export default Hello;
```

Read more about function components [here](https://reactjs.org/tutorial/tutorial.html#function-components).

## Conditional rendering

>In React, you can create distinct components that encapsulate behavior you need. Then, you can render only some of them, depending on the state of your application.
 Conditional rendering in React works the same way conditions work in JavaScript. Use JavaScript operators like if or 
 the conditional operator to create elements representing the current state, and let React update the UI to match them.

### Using the conditional operator

```jsx harmony
import React from 'react';

export default class ConditionalRendering extends React.Component {
    state = {
        loggedIn: false
    };

    handleLogin() {
        this.setState({loggedIn: true})
    }

    handleLogout() {
        this.setState({loggedIn: false})
    }

    render() {
        return (
            <div>
                {this.state.loggedIn ?
                    <div>
                        <h3>Welcome, user!</h3>
                        <button onClick={this.handleLogout}>Logout</button>
                    </div>
                    :
                    <div>
                        <h3>Please click to login</h3>
                        <button onClick={this.handleLogin}>Login</button>
                    </div>
                }
            </div>
        )
    }
}
```

Read more about the conditional operator [here](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)

### Using inline `if` with Logical `&&` operator

```jsx harmony
import React from 'react';

export default class ConditionalRendering extends React.Component {
    //...
    render() {
        return (
            <div>
                {this.state.loggedIn &&
                    <div>
                        <h3>Welcome, user!</h3>
                        <button onClick={() => this.handleLogout()}>Logout</button>
                    </div>
                }
                {!this.state.loggedIn &&
                    <div>
                        <h3>Please click to login</h3>
                        <button onClick={() => this.handleLogin()}>Login</button>
                    </div>
                }
            </div>
        )
    }
}
```

### Using element variables

```jsx harmony
import React from 'react';

export default class ConditionalRendering extends React.Component {
    //...
    render() {
        let button = <button onClick={() => this.handleLogout()}>Logout</button>;
        if (!this.state.loggedIn) {
            button = <button onClick={() => this.handleLogin()}>Login</button>;
        }   
        return (
            <div>
                {this.state.loggedIn &&
                    <div>
                        <h3>Welcome, user!</h3>
                        {button}
                    </div>
                }
                {!this.state.loggedIn &&
                    <div>
                        <h3>Please click to login</h3>
                        {button}
                    </div>
                }
            </div>
        )
    }
}
```

## Callbacks to pass state between components

Often, several components need to reflect the same changing data. It is recommended lifting the shared state up to their 
closest common ancestor.

Let's create an app to allow users vote for their favorite comic franchise to see how this works in action.

```jsx harmony
import React from 'react';
import Marvel from "./Marvel";
import DCComics from "./DCComics";

export default class ComicConPoll extends React.Component {
    state = {
        marvelVotes: 0,
        dcVotes: 0
    };

    handleMarvelVote() {
        //note how in here we are returning object literal without the `return` keyword
        //see https://mariusschulz.com/blog/returning-object-literals-from-arrow-functions-in-javascript
        this.setState((state) => ({...state, marvelVotes: state.marvelVotes + 1}))
    }

    handleDCComicsVote() {
        this.setState((state) => ({...state, dcVotes: state.dcVotes + 1}))
    }

    render() {
        return (
            <div>
                <p>Marvel votes: {this.state.marvelVotes}</p>
                <p>DC votes: {this.state.dcVotes}</p>
                {this.state.marvelVotes === this.state.dcVotes && <p>So far there is a draw!</p>}
                {this.state.marvelVotes > this.state.dcVotes && <p>Marvel is winning!</p>}
                {this.state.dcVotes > this.state.marvelVotes && <p>DC is winning!</p>}
                <Marvel onVote={() => this.handleMarvelVote()}/>
                <DCComics onVote={() => this.handleDCComicsVote()}/>
            </div>
        );
    }
}
```

```jsx harmony
import React from 'react';
import PropTypes from 'prop-types';

export default class Marvel extends React.Component {
    render() {
        return (
            <div>
                <h3>Vote for Marvel comics!!</h3>
                <button onClick={() => this.props.onVote()}>Vote for Marvel!</button>
            </div>
        );
    }
}

Marvel.propTypes = {
  onVote: PropTypes.func.isRequired
};
```

```jsx harmony
import React from 'react';
import PropTypes from 'prop-types';

export default class DCComics extends React.Component {
    render() {
        return (
            <div>
                <h3>Vote for DC comics!!</h3>
                <button onClick={() => this.props.onVote()}>Vote for DC!</button>
            </div>
        );
    }
}

DCComics.propTypes = {
    onVote: PropTypes.func.isRequired
};
```

## Lifecycle

A stateful React component has three main parts to its lifecycle:

* **Mounting** - The component is being inserted into the DOM
* **Updating** - The component is being re-rendered in the virtual DOM to determine whether the DOM needs updating
* **Unmounting** - The component is being removed from the DOM

React gives us a number of **lifecycle methods** that allow us to hook into the various parts of the lifecycle.

### componentDidMount()

>`componentDidMount()` is called as soon as the component is mounted and ready. This is a good place to initiate API calls, 
>if you need to load data from a remote endpoint.

### componentDidUpdate(prevProps, prevState)

>This lifecycle method is invoked as soon as the updating happens. The most common use case for the componentDidUpdate() 
method is updating the DOM in response to prop or state changes.

```javascript
componentDidUpdate(prevProps) {
 //Typical usage, don't forget to compare the props
 if (this.props.userName !== prevProps.userName) {
   this.fetchData(this.props.userName);
 }
}
```

### componentWillUnmount()

>As the name suggests this lifecycle method is called just before the component is unmounted and destroyed. 
If there are any cleanup actions that you would need to do, this would be the right spot.

**Note:** You cannot modify the component state in `componentWillUnmount` lifecycle.

```javascript
componentWillUnmount() {
  //typically we release resources here...
}
```

#### Lifecycle of a component: Clock example

First let's create a clock component:

```jsx harmony
import React from 'react';

export default class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {time: new Date()};
        console.log('Component created');
    }
    
    componentDidMount() {
        console.log('Component mounted');
        const self = this;
        this.timer = setInterval(function () {
            self.setState({time: new Date()});
            console.log('Hello from interval');
        }, 1000);
    }

    render() {
       return <h1>{this.state.time.toLocaleTimeString()}</h1>
    }
}
```

Now we can create the parent component, with a toggle to hide the clock:

```jsx harmony
import React from 'react'
import Clock from "./Clock";

class ClockApp extends React.Component {
    state = {
        showClock: true
    };

    handleHideClock() {
        this.setState((state) => {
            return {hideClock: !state.showClock}
        })
    }

    render() {
        return (
            <div>
                <label>
                    <input type='checkbox' onClick={() => this.handleHideClock()}/>
                    Hide clock
                </label>
                {this.state.showClock && <Clock/>}
            </div>
        );
    }
}

export default ClockApp
```

Now what happens is that the `interval` object has not been `garbage collected` when we unmount the component. 
This causes a memory leak, particular type of unintentional memory consumption by a computer program where the program 
fails to release memory when no longer needed. This condition is normally the result of a bug in a program that prevents 
it from freeing up memory that it no longer needs.

React provides the `componentWillUnmount` lifecycle method as an opportunity to clear any resource that needs to be garbage
collected when the component is unmounted or removed from the DOM.

To fix it, we need to implement the `componentWillUnmount` method and call the `clearInterval` method on the timer:

```jsx harmony
import React from 'react';

export default class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {time: new Date()};
        console.log('Component created');
    }
        
    componentDidMount() {
        console.log('Component mounted');
        const self = this;
        this.timer = setInterval(function () {
            self.setState({time: new Date()});
            console.log('Hello from interval');
        }, 1000);
    }

    render() {
       return <h1>{this.state.time.toLocaleTimeString()}</h1>
    }
}
```

- Read more about memory leaks: [Memory Leak](https://en.wikipedia.org/wiki/Memory_leak)
- Read more about component lifecycle: [React Lifecycle Methods – A Deep Dive](https://programmingwithmosh.com/javascript/react-lifecycle-methods/)

## Ajax calls from React

Let's create a component that gets fun facts for numbers using the [Numbers API](http://numbersapi.com).

### Using fetch

```jsx harmony
import React from 'react';

export default class Translator extends React.Component {
    state = {
        factNumber: '',
        factText: ''
    };

    handleFactNumberChanged(event) {
        const value = event.target.value;
        this.setState((state) => ({...state, factNumber: value}));
    }

    handleGetFact() {
        const self = this;
        fetch(`http://numbersapi.com/${this.state.factNumber}?json`)
            .then(response => response.json())
            .then(json => self.setState((state) => ({...state, factText: json.text})))
    }

    render() {
        return (
            <div>
                <label>Enter the number to get a fact from:
                    <input type='text' onChange={(event) => this.handleFactNumberChanged(event)}/>
                </label>
                <p>The fact for the number {this.state.factNumber} is: <b>{this.state.factText}</b></p>
                <button onClick={() => this.handleGetFact()}>Get fact!</button>
            </div>
        );
    }
}
```

### Using Axios

Axios is a promise based HTTP client for the browser and node.js.

It is a little bit more simple to use than `fetch`, as among other features it automatically transforms responses for JSON data.

`yarn add axios`

```jsx harmony
import React from 'react';
import Axios from 'axios';

export default class FactFromNumber extends React.Component {
    state = {
        factNumber: '',
        factText: ''
    };

    handleFactNumberChanged(event) {
        const value = event.target.value;
        this.setState((state) => ({...state, factNumber: value}));
    }

    handleGetFact() {
        const self = this;
        Axios.get(`http://numbersapi.com/${this.state.factNumber}?json`)
            .then(response => self.setState((state) => ({...state, factText: response.data.text})));
    }

    render() {
        return (
            <div>
                <label>Enter the number to get a fact from:
                    <input type='text' onChange={(event) => this.handleFactNumberChanged(event)}/>
                </label>
                <p>The fact for the number {this.state.factNumber} is: <b>{this.state.factText}</b></p>
                <button onClick={() => this.handleGetFact()}>Get fact!</button>
            </div>
        );
    }
}
```

## Exercise time: date facts

Create a React web app that renders a fact based on a date entered by the user.

To get random fact based on a date, call the following endpoint:

```http://numbersapi.com/01/01/date```

```text
January 1st is the day in 1990 that David Dinkins is sworn in as New York City's first black mayor.
```

## Routing

https://reach.tech/router

```shell script 
yarn add @reach/router
```

### Rendering links

```jsx harmony
import React from 'react';
import './App.css';
import { Router, Link } from '@reach/router'

const Home = () => (
    <div>
        <h1>Home</h1>
        <nav>
            <Link to="/">Home</Link> |{" "}
            <Link to="/dashboard">Dashboard</Link>
        </nav>
    </div>
);
const Dashboard = () => (
    <div>
        <h1>Dashboard</h1>
        <nav>
            <Link to="/">Home</Link> |{" "}
            <Link to="/dashboard">Dashboard</Link>
        </nav>
    </div>
);

function App() {
  return (
      <Router>
        <Home path="/" />
        <Dashboard path="/dashboard" />
      </Router>
  );
}

export default App;
```

### Parsing data from the URL

```jsx harmony
import React from 'react';
import './App.css';
import { Router } from '@reach/router'

const User = (props) => (
    <div>
        <h1>User</h1>
        <p>Your user id is {props.userId}</p>
    </div>
);

function App() {
    return (
        <Router>
            <User path="/user/:userId" />
        </Router>
    );
}

export default App;
```

### Navigate programmatically

If you need to navigate programmatically (like after a form submits), import `navigate`:

```jsx harmony
import React, {Component} from 'react';
import {navigate} from '@reach/router';
import Axios from 'axios';

class User extends Component {
    state = {
        user: {name: '', surname: '', department: ''}
    };

    componentDidMount() {
        //fetch user from db
        const self = this;
        Axios.get(`/users/this.props.userId`)
            .then(response => {
                self.setState({response: result.data})
            }
        );
    }

    goHome = () => {
        navigate('/');    
    };   

    render() {
        return (
            <div>
                <h1>User info</h1>
                <p>Hello, your user id {this.props.userId}</p>
                <ul>
                    <li>Name: {this.state.user.name}</li>
                    <li>Surname: {this.state.user.surname}</li>
                </ul>
                <button onClick={this.goHome}>Save</button>
            </div>
        );
    }
}

export default User;
```

## Exercise time: navigation

Create a React web app based on `http://numbersapi.com/` that has 3 pages:

- Home: this page welcomes the user and contains links to the other pages
- Trivia: Accessed with the route `/trivia/:number`, this shows a fact based on the number passed in the URL parameter
- Math: Accessed with the route `/math/:number`, this shows a math fact based on the number passed in the URL parameter

## Debugging

### React Developer tools

Install in Chrome from [this link](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)

> React Developer Tools is a Chrome DevTools extension for the open-source React JavaScript library. 
It allows you to inspect the React component hierarchies in the Chrome Developer Tools.
