import React, { Component } from 'react';
import './App.css';
import TodoListSimple from "./TodoListSimple";

class App extends Component {

    render() {
        return (
            <div className="App">
                <TodoListSimple/>
            </div>
        );
    }
}

export default App;