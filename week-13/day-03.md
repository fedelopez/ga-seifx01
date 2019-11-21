# Day 03

What we covered today:

* React
  * Function Components
  * Lifecycle
  * Testing with Jest and Enzyme
  * React-Router
  * Ajax calls from React
  
### Exercise time: Grocery list

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

### Function Components

We can replace the `Hello` class with a function accepting the `props` as parameter:

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

### Lifecycle

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

**Note:** You cannot modify the component state in componentWillUnmount lifecycle.

```javascript
componentWillUnmount() {
  window.removeEventListener('resize', this.resizeListener);
}
```

Read more about component lifecycle: [React Lifecycle Methods – A Deep Dive](https://programmingwithmosh.com/javascript/react-lifecycle-methods/)

### React Developer tools

Install in Chrome from [this link](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)

> React Developer Tools is a Chrome DevTools extension for the open-source React JavaScript library. 
It allows you to inspect the React component hierarchies in the Chrome Developer Tools.
