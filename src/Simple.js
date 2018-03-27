import React from 'react';

class Simple extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            note: null
        };

        this.onClickHandler = this.onClickHandler.bind(this);
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.addClickHandler = this.addClickHandler.bind(this);
        this.onEnterHandler = this.onEnterHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    componentWillMount() {
        this.setState({todos: [{index: 0, note: "one", done: false}, {index: 1, note: "two", done: false}, {index: 2, note: "three", done: true}]});
    }

    onClickHandler(index) {
        let indexInArray = this.state.todos.findIndex(todo => todo.index === index);

        if (indexInArray === -1) return;

        let elements = this.state.todos.slice();

        let selected = elements[indexInArray];

        elements[indexInArray] = selected.done ?
            Object.assign({}, {index: selected.index, note: selected.note, done: false})
            :
            Object.assign({}, {index: selected.index, note: selected.note, done: true});

        this.setState({todos: elements});
    }

    onDeleteHandler(index) {
        this.setState({deleting: true});

        let elements = [
            ...this.state.todos.filter(todo => todo.index !== index)
        ];

        this.setState({todos: elements});
    }

    addClickHandler(event) {
        event.preventDefault();

        let maxIndex = Math.max.apply(Math, this.state.todos.map(todo => todo.index));

        let elements = [
            ...this.state.todos,
            Object.assign({}, {index: maxIndex + 1, note: this.state.note, done: false})
        ];

        this.setState({todos: elements});
    }

    onEnterHandler(event) {
        if (event.key === 'Enter') {
            let maxIndex = Math.max.apply(Math, this.state.todos.map(todo => todo.index));

            let elements = [
                ...this.state.todos,
                Object.assign({}, {index: maxIndex + 1, note: this.state.note, done: false})
            ];

            this.setState({todos: elements});
        }
    }

    onChangeHandler(event) {
        event.preventDefault();
        this.setState({note: event.target.value});
    }

    render() {

        return (
            <div className="container">
                <div id="myDIV" className="header">
                    <h3>My To Do List</h3>
                    <br/>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Add item..." onKeyUp={this.onEnterHandler} onChange={this.onChangeHandler}/>
                        <span className="input-group-btn">
                            <button className="btn btn-secondary" type="button" onClick={this.addClickHandler}>Go!</button>
                        </span>
                    </div>
                </div>
                <br/>
                <table className="table table-striped">
                    <thead>
                    <tr><th></th></tr>
                    </thead>
                    <tbody>
                    {this.state.todos.map(todo =>
                        todo.done ?
                            <tr><td>
                                <span className="checked" onClick={() => this.onClickHandler(todo.index)}>{todo.note}</span>
                                <span className="close" onClick={() => this.onDeleteHandler(todo.index)}>{"\u00D7"}</span>
                            </td></tr>
                            :
                            <tr><td>
                                <span onClick={() => this.onClickHandler(todo.index)}>{todo.note}</span>
                                <span className="close" onClick={() => this.onDeleteHandler(todo.index)}>{"\u00D7"}</span>
                            </td></tr>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Simple;

//export default ({}) => <h1>Test</h1>