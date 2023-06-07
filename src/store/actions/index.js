export const addTodo = (data) => {
  const id = new Date().getTime().toString();
  const payload = {
    id: id,
    data: data,
  };
  return {
    type: "ADD_TODO",
    payload: payload,
  };
};

export const deleteTodo = (id) => {
  return {
    type: "DELETE_TODO",
    id,
  };
};

export const removeTodo = () => {
  return {
    type: "REMOVE_TODO",
  };
};
