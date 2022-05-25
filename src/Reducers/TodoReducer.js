import React from "react";

function todoReducer(prevState, action) {
  switch (action.type) {
    case "init_todo":
      return initTodo(prevState, action);

    case "init_Donetodo":
      return initDoneTodo(prevState, action);

    case "init_UnDonetodo":
      return initUnDoneTodo(prevState, action);

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
    ...prevState,
    todos: todos,
  };
};

const initDoneTodo = (prevState, action) => {
  let todos = action.payload.doneTodos;
  return {
    ...prevState,
    doneTodos: [...prevState.doneTodos, todos],
  };
};

const initUnDoneTodo = (prevState, action) => {
  let todos = action.payload.undoneTodos;
  return {
    ...prevState,
    undoneTodos: [...prevState.undoneTodos, ...todos],
  };
};

const addTodo = (prevState, action) => {
  let newTodo = action.payload.newTodo;
  // let subList = prevState.todos
  // subList.push(newTodo);
  return {
    ...prevState,
    undoneTodos: [...prevState.undoneTodos, newTodo],
  };
};

let deleteTodo = (prevState, action) => {
  let key = action.payload.key;
  let done = action.payload.done;
  let subTodo;
  if (done) {
    subTodo = prevState.doneTodos.filter((item) => item.key != key);
    return {
      ...prevState,
      doneTodos: subTodo,
    };
  } else {
    subTodo = prevState.undoneTodos.filter((item) => item.key != key);
    return {
      ...prevState,
      undoneTodos: subTodo,
    };
  }
};

let toggleTodo = (prevState, action) => {
  let key = action.payload.key;
  let done = action.payload.done;
  let targetTodo;
  let newTodoList;
  if (done) {
    targetTodo = prevState.doneTodos.find((item) => item.key === key);
  } else {
    targetTodo = prevState.undoneTodos.find((item) => item.key === key);
  }
  let targetDownStatus = targetTodo.done;
  let toggledTodo = {
    key: targetTodo.key,
    done: !targetDownStatus,
    text: targetTodo.text,
    priority: targetTodo.priority,
    dueDate: targetTodo.dueDate,
  };
  if (done) {
    newTodoList = prevState.doneTodos.filter((item) => item.key != key);
    return {
      ...prevState,
      doneTodos: [...newTodoList, toggledTodo],
    };
  } else {
    newTodoList = prevState.undoneTodos.filter((item) => item.key != key);
    return {
      ...prevState,
      undoneTodos: [...newTodoList, toggledTodo],
    };
  }
};

let editTodo = (prevState, action) => {
  let done = action.payload.done;
  let newText = action.payload.newText;
  let newPriority = action.payload.newPriority;
  let newDueDate = action.payload.newDueDate;
  let targetTodo;
  let newTodoList;
  let key = action.payload.key;
  if (done) {
    targetTodo = prevState.doneTodos.find((item) => item.key === key);
  } else {
    targetTodo = prevState.undoneTodos.find((item) => item.key === key);
  }
  let editedTodo = {
    key: targetTodo.key,
    done: targetTodo.done,
    text: newText,
    priority: newPriority,
    dueDate: newDueDate,
  };
  let subTodo;
  if (done) {
    newTodoList = prevState.doneTodos.filter((item) => item.key != key);
    subTodo = [...newTodoList, editedTodo];
    return {
      ...prevState,
      doneTodos: subTodo,
    };
  } else {
    newTodoList = prevState.undoneTodos.filter((item) => item.key != key);
    subTodo = [...newTodoList, editedTodo];
    return {
      ...prevState,
      undoneTodos: subTodo,
    };
  }
};
