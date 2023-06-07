const initialData = {
  list: JSON.parse(localStorage.getItem("todoList")) || [],
};

export const todoReducer = (state = initialData, action) => {
  switch (action.type) {
    case "ADD_TODO":
      const { id, data } = action.payload;
      const updatedList = [
        ...state.list,
        {
          id: id,
          data: data,
        },
      ];
      localStorage.setItem("todoList", JSON.stringify(updatedList));
      return {
        ...state,
        list: updatedList,
      };
    case "DELETE_TODO":
      const newList = state.list.filter((item) => item.id !== action.id);
      localStorage.setItem("todoList", JSON.stringify(newList));
      return {
        ...state,
        list: newList,
      };
    case "REMOVE_TODO":
      localStorage.removeItem("todoList");
      return {
        ...state,
        list: [],
      };
    default:
      return state;
  }
};
