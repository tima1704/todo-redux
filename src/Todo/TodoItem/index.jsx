import React from "react";
import cls from './index.module.scss';

export const TodoItem = ({item, handleDeleteTodo}) => {
  return (
    <div className={cls["each-item"]}>
      <h3>{item.data}</h3>
      <button onClick={() => handleDeleteTodo(item.id)}>delete todo</button>
    </div>
  );
};
