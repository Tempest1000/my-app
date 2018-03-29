import React, { Component } from 'react';
import './App.css';
//import TodoListSimple from "./TodoListSimple";
import TodoListRedux from "./TodoListRedux";

class App extends Component {

    render() {
        return (
            <div className="App">
                <TodoListRedux/>
            </div>
        );
    }
}

export default App;