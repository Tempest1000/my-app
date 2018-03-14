# ReactJS Tutorial

## VS Code

Useful:           https://github.com/Microsoft/vscode-tips-and-tricks
                  https://github.com/viatsko/awesome-vscode

Command palette:  ctrl + shift + p
Terminal:         ctrl + `
Zen mode:         ctrl + k, z
Explorer:         ctrl + shift + 1
Join:             ctrl + j
Markdown preview: ctrl + shift + v
Markdown side:    ctrl + k, v
Suggestion:       ctrl + space
Intellisense:     Pressing Tab or Enter will insert the selected member


## Create React App

This application uses create react app

https://github.com/facebook/create-react-app

This is a library that allows a ReactJS app to be created immediately without needing tools like Webpack or Babel.

Those tools are preconfigured in the library and hidden. Node is required, creating an app is a simple as: 

```
npx create-react-app my-app
```

Once done you can start the app with

```npm start``` or ```yarn start```

## Creating a basic app

Use npm to install create-react-app 

This will pull all the packages down here:

```
%userprofile%\AppData\Roaming\npm\node_modules\create-react-app
```

Then execute this script to create a new folder named my-app

```
create-react-app my-app
```

Create a file named index.css with this code:

```css
body {
  font: 14px "Century Gothic", Futura, sans-serif;
  margin: 20px;
}

ol, ul {
  padding-left: 30px;
}

.board-row:after {
  clear: both;
  content: "";
  display: table;
}

.status {
  margin-bottom: 10px;
}

.square {
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
}

.square:focus {
  outline: none;
}

.kbd-navigation .square:focus {
  background: #ddd;
}

.game {
  display: flex;
  flex-direction: row;
}

.game-info {
  margin-left: 20px;
}
```

And an index.js file with this basic code for a dumb stateless functional component (presentation only).

```javascript

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const MyStatelessFunctionalComponent = ({name}) => {
  return (
    <div>Hello {name}</div>
  );
}

// ========================================

ReactDOM.render(
  <MyStatelessFunctionalComponent name="Andrew" />,
  document.getElementById('root')
);
```

For a smart component that would could be aware of the store and state this would be the code:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

  class MyComponent extends React.Component { 
      render() { 
        return (
          <div>Hello {this.props.name}</div>
        );
      }
  }

  // ========================================
  
  ReactDOM.render(
    <MyComponent name="Andrew" />,
    document.getElementById('root')
  );
```

Then run npm start ... this runs an npm script located in package.json here:

```javascript
  "scripts": {
    "start": "react-scripts start",
```

## Tutorial

### Overview

The test tutorial here:

https://reactjs.org/tutorial/tutorial.html

Has three components: 

* Square - a button
* Board - 9 squares
* Game - board and other info

### Passing Data through Props

To pass some data from the Board to the Square a ```value``` prop is used, like in the example before with name="Andrew". 

```javascript
renderSquare(i) {
  return <Square value={i} />;
}
```

### Components

The most simple way to create a component is with a javascript function:

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}<h1>;
}
```

This is called a "functional" component because it is just a function. 

Stateless functional components are dumb presentation components with no state.

With ES6 classes a class can be used to define a component (note the use of this):

```javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}<h1>;
  }
}
```

### Functions vs Classes

Classes have additional features over functionality components, namely Local State and Lifecycle methods.

Local state is initialized in the constructor.

To convert a function to a class the following must be done:

1. Extend with React.Component
2. Add a render() method
3. Move function body into render() method
4. Replace props with this.props in render() body

When something is rendered to the DOM for the first time this is called "mounting" in React.

A special method named componentDidMount() can be called after the component is rendered.

This methods are called "lifecycle hooks" in React.

### State vs Props

Props are read-only ... a function or a class must never modify its own props. 

State is used in the component to create values that can be changed in that component. State allows React components to change their output over time in response to user actions, network responses, etc. State is private and fully controlled by the component. State is only available to classes.

Props are used to pass values from a one component down to another ... in a parent child relationship. 

React elements can represent DOM tags (div, p, input, etc) or user-defined components:

```javascript
const element = <div />;
const element = <Welcome name="Test" />;
```

When React sees a user-defined components it passes JSX attributes to this component as a single object, this object is called "props".

React calls the ```Welcome``` component with {name: 'Test'} as the props.

Functions in React are valid React components if they accept a single "props" (which stands for properties), the function must also return a React element.

Usually state from one component is passed as props to another.

Note when setting state you cannot do this (this will not re-render the component):

```javascript
this.state.value = this.props.value
```

You must use the setState method of the this context:

```javascript
this.setState({value: this.props.value})
```

setState can also take a function as a argument like this:

```javascript
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```

or

```javascript
this.setState(function(prevState, props) {
  return {
    counter: prevState.counter + props.increment
  };
});
```

setState also merges the object provided into the current state.

For this state:

```javascript
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```

Calling ```this.setState({posts: response.posts}) will merge posts into the local state and leave comments intact.

This is used when act with state and props together.

The full code would look like this.

Note that state for the component (this.state) is created in the constructor of the component and is private to the component. 

```javascript
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
  }

  render() {
    return (
      <button className="square" onClick={() => this.setState({value: this.props.value})}>
        {this.state.value}
      </button>
    );
  }
}
```

When setState is called and update to the component is scheduled causing React to merge in the passed state update and rerender the component and its descendants, when the component renders this.state.value will be the index.

To add a click event handler function and code that switches in the index on an off do this.

Note the binding so the correct this context is passed (the this context of the component, not the button).

```javascript
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
  }
  
  onClickHandler() {
    if (this.state.value == null) {
      this.setState({value: this.props.value})
    } else {
      this.setState({value: null})
    }
  }

  render() {
    return (
      <button className="square" onClick={this.onClickHandler.bind(this)}>
        {this.state.value}
      </button>
    );
  }
}
```

## Lifting State Up

Need squares in one place. Store state in the board.

When refactoring note the difference between ```onClick={props.onClick}``` which passes the function down versus ```onClick={props.onClick()}``` which would call onClick immediately (and break everything).

## Dealing with Functions

Calling a function:

Explicit bind needed with ES6 if using class (smart component)

onClick={this.onClickHandler.bind(this)} // binding in the render method ... this causes the "this" context to be the React component (class or function that the event handler is in), in the example above this.props.value would fail without the binding

I think this is only needed if you are going to be using the this context in the event handler ... like this.props.something

If using stateless functional component ... const Square = ({onClickHandler}) => {
... some other code ...
onClick={onClickHandler}

**Unless there are parameters ... then have to use something like this:
onClick={onDelete.bind(this, course.id)}

**This will not work:

onClick={() => onDelete(course.id)}

When using a React smart components and the component has a parameter:

onClick={() => this.onClickHandler("test")}

Can also do this, I have no idea why this works:

onClick={this.handleClick.bind(this, i)}

From other redux docs:

ReactJs gotcha ... the "this" context in our change handler is wrong.
In the first line "this" context is the caller not the React component. 
The "this" context is the input (textbox), not the component.

To fix the problem bind to the "this" context in the constructor.

```javascript
    onTitleChange(event) {
        const course = this.state.course; // note: "this" here is wrong ... the "this" context here is the caller (form control)
        course.title = event.target.value; // the event passed is the title change with the value being the payload
        this.setState({course: course});
    }

Can also have this in the ctor of the React component:

this.onTitleChange = this.onTitleChange.bind(this);
... and then this in the render code: onClick={this.onTitleChange}


Don't use this outside of the component if you can help it.

When inside a block of html like this would do a bind ... that is because in a stateless functional component the this has no meaning

```
<td><Link to="/courses" onClick={onDelete.bind(this, course.id)}>Delete</Link></td>
<td><a href={course.watchHref} target="_blank">Watch</a></td>
<td><Link to={`/course/${course.id}`}>{course.title}</Link></td>
<td>{course.authorId}</td>
<td>{course.category}</td>
<td>{course.length}</td>
```

When adding to a component do this to automatically bind it:

```
deleteCourse = (id, event) => {
    event.preventDefault();
```

Then you don't need to do this in the ctor:

```
this.deleteCourse = this.deleteCourse.bind(this);
```

Component example

```
class Counter extends React.Component {
  
  test = () => {
    console.log(this.props.name);
  }
  
  render() {
    return (
      <div>
      <h1> { store.getState() }</h1>
       <button
        onClick={ this.test }
       >Increment</button>
      </div>
    );
  }
}
```

Could also do this:

```
() => this.test
```

When moving the function outside of the component and refering to props in the function you must have an explicit bind.

```
  function test() {
    console.log(this.props.name);
  }
```

Doing this won't work, this is because using the fat arrow syntax you are creating a new function that has a .bind called on it, but it doesn't bind the contents of the target (the test function outside of the component).

```
onClick={ () => test() }
```

Would have to do this instead

```
onClick={test.bind(this)}
```

Long story short don't put your functions outside of your component classes.

### Full example of the ways functions can be called (use JSBin):


```html
<!DOCTYPE html>
<html>
<head>
<meta name="description" content="TodoApp">
  <meta charset="utf-8">
  <script src="https://fb.me/react-0.14.7.min.js"></script>
  <script src="https://fb.me/react-dom-0.14.7.min.js"></script>    
  <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/3.5.1/redux.min.js"></script>
  <title>React Demo</title>
</head>
<body>
<div id="root"></div>
</body>
</html>
```

```javascript
// same as: var createStore = Redux.createStore
const { createStore } = Redux;

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default: 
      return state;
  }
}

const store = createStore(counter);

function test3() {
  console.log("test3")
}

function test4() {
  console.log(this.props.name);
}

// note: can't use fat arrow syntax here
const MyStatelessFunctionalComponent = ({onTestFuncWithParam}) => {
    return(
      <div>
       <button
        onClick={ onTestFuncWithParam.bind(this, "Message from below") }
       >Raise Message</button>
      </div>
    );
};

class MySmartReactComponent extends React.Component {
  render() {
    return (
      <span>
       <button
        onClick={this.props.onTestSmartComponentFunc}
       >Raise Message No Param</button>
       <button
        onClick={() => this.props.onTestSmartComponentFunc("Some message")}
       >Raise Message With Param</button>
       <button
        onClick={ this.props.onTestSmartComponentFunc.bind(this, "Some message")}
       >Raise Message With Param 2</button>
      </span>
    );
  }
}

class Counter extends React.Component {
  
  test1() {
    console.log("test1");
  }
  
  test2(message) {
    console.log(message);
  }
  
  testFuncWithParam(message) {
    console.log(message);
  }
  
  render() {
    return (
      <div>
      <h1> { store.getState() }</h1>
       <button
        onClick={ () => store.dispatch({ type: 'INCREMENT' }) }
       >Increment</button>
       <br/><br/>
       <button
        onClick={ this.test1 }
       >Test Function</button>
       <br/><br/>
       <button
        onClick={ () => this.test1() }
       >Test Arrow Function</button>
       <br/><br/>
       <button
        onClick={ () => this.test2("hello") }
       >Test Arrow Function with Param</button>
       <br/><br/>
       <button
        onClick={ test3 }
       >Test External Function</button>
       <br/><br/>
       <button
        onClick={ () => test3() }
       >Test External Function with Arrows</button>
       <br/><br/>
       <button
        onClick={ test4.bind(this) }
       >Test External Function that needs this context with props</button>
       <br/><br/>
       <MyStatelessFunctionalComponent onTestFuncWithParam={ this.testFuncWithParam } />
       <br/>
       <MySmartReactComponent onTestSmartComponentFunc={ this.test1 } onTestSmartComponentFunc={ this.testFuncWithParam } />
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(
    <Counter name="TheUserName" />,
    document.getElementById('root')
  );
}

store.subscribe(render);
render();
```

