import * as types from './actionTypes';

export function createTodoSuccess(note) {
    return {
        type: types.CREATE_TODO_SUCCESS,
        note
    }
}

// the other way to declare the function
/*
export const createTodoSuccess = (todo) => {
    return {
        type: actionsTypes.CREATE_TODO_SUCCESS,
        todo
    }
};
*/

export function deleteTodoSuccess(index) {
    return {
        type: types.DELETE_TODO_SUCCESS,
        index
    }
}

export function updateTodoSuccess(index) {
    return {
        type: types.UPDATE_TODO_SUCCESS,
        index
    }
}