import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as todoActions from "./actions/todoActions";

class TodoListRedux extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            note: null
        };

        this.onClickHandler = this.onClickHandler.bind(this);
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.addClickHandler = this.addClickHandler.bind(this);
        this.onEnterHandler = this.onEnterHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    // this marks an item as done
    onClickHandler(index) {
        this.props.actions.updateTodoSuccess(index);
    }

    // this deletes an item
    onDeleteHandler(index) {
        this.props.actions.deleteTodoSuccess(index);
    }

    // this adds an item to the list when the add button is clicked
    addClickHandler(event) {
        this.props.actions.createTodoSuccess(this.state.note);
    }

    // this adds an item to the list when the enter button is clicked
    onEnterHandler(event) {
        if (event.key === 'Enter') {
            this.props.actions.createTodoSuccess(this.state.note);
        }
    }

    // this changes the local page state when the textbox is typed in
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
                    {this.props.todos.map(todo =>
                        todo.done ?
                            <tr key={todo.index}><td>
                                <span className="checked" onClick={() => this.onClickHandler(todo.index)}>{todo.note}</span>
                                <span className="close" onClick={() => this.onDeleteHandler(todo.index)}>{"\u00D7"}</span>
                            </td></tr>
                            :
                            <tr key={todo.index}><td>
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

function mapStateToProps(state) {
    return {
        todos: state.todoReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(todoActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoListRedux);

//export default ({}) => <h1>Test</h1>