import * as types from "../actions/actionTypes";

export default(state = [{index: 0, note: "one", done: false}, {index: 1, note: "two", done: false}, {index: 2, note: "three", done: true}], action) => {
    switch(action.type) {
        case types.CREATE_TODO_SUCCESS:
            let maxIndex = Math.max.apply(Math, state.map(todo => todo.index));

            return [
                ...state,
                Object.assign({}, {index: maxIndex + 1, note: action.note, done: false})
            ];

        case types.DELETE_TODO_SUCCESS:
            return [
                ...state.filter(todo => todo.index !== action.index)
            ];

        case types.UPDATE_TODO_SUCCESS:
            let indexInArray = state.findIndex(todo => todo.index === action.index);

            if (indexInArray === -1) return state;

            let elements = state.slice();

            let selected = elements[indexInArray];

            elements[indexInArray] = selected.done ?
                Object.assign({}, {index: selected.index, note: selected.note, done: false})
                :
                Object.assign({}, {index: selected.index, note: selected.note, done: true});

            return elements;
        default:
            return state;
    }
};