import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, removeTodo } from "../store/actions";
import { TodoItem } from "./TodoItem";
import cls from "./index.module.scss";

export const Todo = () => {
  const [inputData, setInputData] = React.useState("");

  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.todoReducer);

  const handleCreateTodo = () => {
    dispatch(addTodo(inputData));
    setInputData("");
  };

  const handleDeleteTodo = (id) => dispatch(deleteTodo(id));

  return (
    <div className={cls["todo-container"]}>
      <div className={cls["child-div"]}>
        <h1>Add Your List Here</h1>
        <div className={cls["add-items"]}>
          <input
            type="text"
            value={inputData}
            onChange={(event) => setInputData(event.target.value)}
            placeholder="Add Items.."
          />
        </div>
        <button onClick={handleCreateTodo}>add todo</button>
        <button onClick={() => dispatch(removeTodo())}>remove todo</button>
      </div>
      {list.length === 0 ? (
        <p>Todo is empty..</p>
      ) : (
        list.map((item) => (
          <TodoItem item={item} handleDeleteTodo={handleDeleteTodo} />
        ))
      )}
    </div>
  );
};
