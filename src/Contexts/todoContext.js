import React from 'react';

const TodoContext = React.createContext({
    addTodoText : '',
    todos:[],
    loading:false,
    editTodo : () => {},
    toggleTodo : () => {},
    deleteTodo : () => {},
    addTodo : () => {},
})

export default TodoContext;