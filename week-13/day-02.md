# Day 02

What we covered today:

* React
  * Getting started
  * Components
  * Props
  * State
  * Lists and Keys

## Warm-up

* [Text Soup 2](https://github.com/Yiannimoustakas/sei31-homework/tree/master/warmups/week07/day05_text_soup_2)

## React

### Getting started with React

* [create-react-app](https://github.com/facebookincubator/create-react-app)

Creating web applications is hard work and like all good programmers we're going to be lazy. 
`create-react-app` does exactly that! It creates a React application without needing to install or configure tools like 
`Webpack` or `Babel`. They are hidden away, all set up with pre-configurations so we can focus on the code.

The first thing we need to do is install it globally.

`npm install -g create-react-app`

Once installed you can run the below code with the argument of your applications name. This will create the foundations of the application and store it in a folder with the same name as your application.

`create-react-app your_app_name_here`

Alternatively, you can use (no need to install `create-react-app` globally):

`npx create-react-app your_app_name_here`

`cd` into your applications directory and run `cat package.json` to show all the dependencies it has created for you.

```json
{
  "name": "react-demo",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^16.12.0",
    "react-dom": "^16.12.0",
    "react-scripts": "3.2.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

You can start the server by running `yarn start`, this will publish the app so it can be accessed locally and from your network:

```text
You can now view react-demo in the browser.

  Local:            http://localhost:3000/
  On Your Network:  http://192.168.1.25:3000/

Note that the development build is not optimized.
To create a production build, use yarn build.
```

### ReactJS - Components

Components are the building blocks of React. In a way they're pretty similar to Rails partials.

Components are basically functions that return HTML necessary to render a piece of the page. 
[Tyler McGiniss](https://twitter.com/tylermcginnis33) thinks of them as [Kolaches](https://en.wikipedia.org/wiki/Kolach), 
because "they have everything you need, wrapped in a delicious composable bundle."

Components:

* Can be written in either pure JavaScript or JSX
* Can only return a single element (but that element can have multiple children)
* Can either receive data from its parent component, or from the component itself
* Should pass the **FIRST** test, and be:
  * **Focused**
  * **Independent**
  * **Reusable**
  * **Small**
  * **Testable**

## Anatomy of a component

Here is an example of a simple component:

```jsx harmony
// Import any modules required - at a minimum, we will need React.
import React from 'react'

// Create a new class that extends the React.Component
class Hello extends React.Component {
  // The only thing your component absolutely needs is a render function that returns HTML.
  render() {
    return <h1>Hello, World!</h1>;
  }
}

export default Hello // we also need to export the component so it can be referenced elsewhere
```

Now we can use the component in the `index.js`

```jsx harmony
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Hello from './Hello';

// The ReactDOM.render function takes two arguments - what we want to render, and where we want to render it
ReactDOM.render(<Hello />, document.getElementById('root'));
```

### Properties or "props"

Component `props` are a great way to pass variables between components.

Let's make this a bit more dynamic by passing `props` from the `HelloMarvel` component to an updated version of the `Hello` component, 
and using JSX to interpolate the variables (encapsulated in curly brackets, e.g `{this.props.name}`).

In this context, `HelloMarvel` is the **parent component**, which is **invoking** `Hello` - a **child component**.

```jsx harmony
import React  from 'react';

class Hello extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>
  }
}

export default Hello
```

```jsx harmony
import React  from 'react';
import Hello  from './Hello';

class HelloMarvel extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello World</h1>
        // Invoke the component we want to render - HelloUser - and pass in a 'name' attribute that can be accessed in the HelloUser component via this.props.name
        <Hello name="Thor"/>
        <Hello name="Iron Man"/>
        <Hello name="Black Widow"/>
      </div>
    );
  }
}

export default HelloMarvel
```

Now we can put it all together in the `index.js` file:

```jsx harmony
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HelloMarvel from "./HelloMarvel";

ReactDOM.render(<HelloMarvel />, document.getElementById('root'));
```

#### Passing functions to components

You can pass an event handler (like onClick) to a component.

Pass event handlers and other functions as props to child components:

```jsx harmony
import React from 'react';
class ClickListener extends React.Component {
  handleClick() {
    console.log('Click happened');
  }
  render() {
    return <button onClick={() => this.handleClick()}>Click Me</button>;
  }
}
export default ClickListener;
```

#### `this.props.children`

One useful component prop is `this.props.children` - this will give you the content of the component. 
If we have nested components, `this.props.children` will return an array of components nested within the parent component.

```jsx harmony
import React  from 'react';

class Hello extends React.Component {
  render() {
    return (
        <div>
            <h1>Hello, {this.props.name}!</h1>
            {this.props.children}
        </div>
    )
  }
}

export default Hello
```

```jsx harmony
import React  from 'react';
import Hello  from './Hello';

class HelloMarvel extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello World</h1>
        // Invoke the component we want to render - HelloUser - and pass in a 'name' attribute that can be accessed in the HelloUser component via this.props.name
        <Hello name="Thor"><p>He is the Asgardian god of thunder</p></Hello>
        <Hello name="Iron Man"><p>He uses his genius for high-tech solutions to problems</p></Hello>
        <Hello name="Black Widow"><p>She was one of the most talented spies and assassins in the entire world</p></Hello>
      </div>
    );
  }
}

export default HelloMarvel
```

#### `prop` types and validation

To ensure our components are being used correctly, we can add validators to our component.

First, we have to install `prop-types`:

```shell script
yarn add prop-types
```

Next, we need to import `prop-types` in our component and define the props it accepts:

```jsx harmony
import React from 'react';
import PropTypes from 'prop-types';

class HelloUser extends React.component {
  render() {
    return (
      <div>
          <p> Hello, {this.props.name} </p>
          <p> You are visitor number {this.props.visitor} to this site </p>
      </div>  
    );
  }
}

HelloUser.propTypes = {
  // Guarantee that our name prop is a string and is always present.
  name: PropTypes.string.isRequired,
  // Guarantee that our visitor prop is a number.
  visitor: PropTypes.number
};
```

#### Default props

We can also define default values for a component's props:

```jsx harmony
import React from 'react';
import PropTypes from 'prop-types';

class HelloUser extends React.component {
  render() {
    return (
      <div>
          <p>Hello, {this.props.name} </p>
          <p>You are visitor number {this.props.visitor} to this site </p>
      </div>  
    );
  }
}

HelloUser.propTypes = {
    name: PropTypes.string.isRequired,
    visitor: PropTypes.number
};

HelloUser.defaultProps = {
    name: "John",
    visitor: 1
};
```

### State

Props are fine for configuring components with initial values, but if we want to update a property of the object over time, 
or in response to something, we need to use the component's **state**.

To create a **stateful** component (as opposed to a **stateless** component), we need to use the method `setState`.

> setState() schedules an update to a component’s state object. When state changes, the component responds by re-rendering.

Let's improve the `ClickListener` to record the total number of clicks occurred:

```jsx harmony
import React from 'react';
class ClickListener extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
    }

    handleClick() {
        this.setState((state) => {
            return {count: state.count + 1}
        });
    }

    render() {
        return (
            <div>
                <p>Total number of clicks: {this.state.count}</p>
                <button onClick={() => this.handleClick()}>Click Me</button>
            </div>
        )
    }
}
export default ClickListener;
``` 

Read more about stateful components [here](https://reactjs.org/docs/faq-state.html).

### Working with form input elements

```jsx harmony
import React from 'react';
class InputListener extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: 'World'};
    }

    handleChange(e) {
        this.setState({name: e.target.value});
    }

    render() {
        return (
            <div>
                <p>Hello, {this.state.name}!</p>
                <input type='text' onChange={(event) => this.handleChange(event)}/>
            </div>
        )
    }
}
export default InputListener;
``` 

### Lists and Keys

Let's recap how we transform lists in JavaScript:

```javascript
const groceries = ['salad', 'carrots', 'bananas'];
const toUppercase = groceries.map(grocery => grocery.toUpperCase());
console.log(toUppercase);
```

this prints out:

```text
["SALAD", "CARROTS", "BANANAS"]
```

Let's say we want to render multiple components which map to a collection:

```jsx harmony
import React from 'react';

export default class GroceryShopping extends React.Component {
    constructor(props) {
        super(props);
        this.state = {groceries: ['Cabbage', 'Onion', 'Salt']}
    }

    render() {
        const groceries = this.state.groceries.map((grocery, index) =>
            <li key={index}>{grocery}</li>
        );
        return <ul>{groceries}</ul>
    }
}
``` 

Note that when we map each grocery to an `li` element we also need to supply a `key`.

> Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements 
inside the array to give the elements a stable identity.
The best way to pick a key is to use a string that uniquely identifies a list item among its siblings. 
Most often you would use IDs from your data as keys.

Alternatively, `state` can also be initialised outside the constructor:

```jsx harmony
import React from 'react';

export default class GroceryShopping extends React.Component {
    state = {groceries: ['Cabbage', 'Onion', 'Salt']};

    render() {
        const groceries = this.state.groceries.map((grocery, index) =>
            <li key={index}>{grocery}</li>
        );
        return <ul>{groceries}</ul>
    }
}
``` 

### React Components Further Reading

* [ReactJS - Documentation - Reusable Components](https://facebook.github.io/react/docs/reusable-components.html#prop-validation)
* [Ricosta Cruz - ReactJS Cheatsheet](http://ricostacruz.com/cheatsheets/react.html)

## Homework

- [React tic tac toe](https://facebook.github.io/react/tutorial/tutorial.html)

Or 

- [React Tutorial](https://www.youtube.com/watch?v=Ke90Tje7VS0)