import React from "react";

const TodoContext = React.createContext({
  todos: [],
  doneTodos: [],
  undoneTodos: [],
});
export default TodoContext;
