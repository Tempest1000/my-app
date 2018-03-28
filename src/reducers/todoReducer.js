export default(state = [{index: 0, note: "one", done: false}, {index: 1, note: "two", done: false}, {index: 2, note: "three", done: true}], action) => {
    switch(action) {
        case "add":
            return [...state, action.item];
        default:
            return state;
    }
};