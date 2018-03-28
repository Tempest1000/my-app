export const addTodo = (item) => {
  console.log("item ", item);
  return {
      type: "add", item
  };
};