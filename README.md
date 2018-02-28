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

### State vs Props

State is used in the component to create values that can be changed in that component.

Props are used to pass values from a one component down to another ... in a parent child relationship. 

Usually state from one component is passed as props to another.

Note when setting state you cannot do this: 

```javascript
this.state.value = this.props.value
```

You must use the setState method of the this context:

```javascript
this.setState({value: this.props.value})
```

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