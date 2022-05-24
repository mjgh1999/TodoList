import React from "react";

function todoReducer(prevState, action) {
  switch (action.type) {
    case "init_todo":
      return initTodo(prevState, action);

    case "add_todo":
      return addTodo(prevState, action);

    case "delete_todo":
      return deleteTodo(prevState, action);

    case "toggle_todo":
      return toggleTodo(prevState, action);

    case "edit_todo":
      return editTodo(prevState, action);

    default:
      return prevState;
  }
}

export default todoReducer;

const initTodo = (prevState, action) => {
  let todos = action.payload.todos;
  return {
    todos: todos,
  };
};

const addTodo = (prevState, action) => {
  let newTodo = action.payload.newTodo;
  // let subList = prevState.todos
  // subList.push(newTodo);
  return {
    todos: [...prevState.todos, newTodo],
  };
};

let deleteTodo = (prevState, action) => {
  let key = action.payload.key;
  let subTodo = prevState.todos.filter((item) => item.key != key);
  return {
    todos: subTodo,
  };
};

let toggleTodo = (prevState, action) => {
  console.log("key : " + action.payload.key);
  let key = action.payload.key;
  let targetTodo = prevState.todos.find((item) => item.key === key);
  let targetDownStatus = targetTodo.done;
  let toggledTodo = {
    key: targetTodo.key,
    done: !targetDownStatus,
    text: targetTodo.text,
    priority: targetTodo.priority,
    dueDate: targetTodo.dueDate,
  };
  console.log({ toggledTodo });
  let newTodoList = prevState.todos.filter((item) => item.key != key);
  return {
    todos: [...newTodoList, toggledTodo],
  };
};

let editTodo = (prevState, action) => {
  let newText = action.payload.newText;
  let newPriority = action.payload.newPriority;
  let newDueDate = action.payload.newDueDate;
  let key = action.payload.key;
  let targetTodo = prevState.todos.find((item) => item.key === key);
  let editedTodo = {
    key: targetTodo.key,
    done: targetTodo.done,
    text: newText,
    priority: newPriority,
    dueDate: newDueDate,
  };

  let newTodoList = prevState.todos.filter((item) => item.key != key);
  let subTodo = [...newTodoList, editedTodo];
  return {
    todos: subTodo,
  };
};
