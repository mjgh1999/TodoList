import React ,{useState,useEffect,useContext} from 'react';
import Parse from 'parse/dist/parse.min.js';



function todoReducer(prevState,action){
    
    

    switch(action.type) {
        
        case 'init_todo':
            return initTodo(prevState,action);

        case 'add_todo':
            return addTodo(prevState,action);

        case 'delete_todo':
            return deleteTodo(prevState,action);
        
        case 'toggle_todo':
            return toggleTodo(prevState,action);
        
        case 'edit_todo':
            return editTodo(prevState,action);
        
       
        
        default:
            return prevState;
    }
    
}


export default todoReducer;

const initTodo = (prevState,action) => {
    let todos = action.payload.todos
    return{
        todos:todos,
    }
    
  };

const addTodo = (prevState,action) => {
    let newTodo = action.payload.newTodo
    let subList = prevState.todos
    console.log({subList});
    subList.push(newTodo);
    console.log({subList});
    return {
        todos:subList,
    }
  }


  

let deleteTodo = (prevState,action) => {
    let key = action.payload.key;
    let subTodo = prevState.todos.filter(item => item.key != key);
    return {
        todos: subTodo
    }
 
    
  }

  let toggleTodo = (prevState,action) => {
      let key = action.payload.key;
      let targetTodo = prevState.todos.find(item => item.key===key);
      let targetDownStatus  = targetTodo.done;
      let toggledTodo = { key:targetTodo.id , done:!targetDownStatus, text:targetTodo.text}
      let newTodoList = prevState.todos.filter(item => item.key != key);
      console.log({toggledTodo})
      let subTodo =[...newTodoList,toggledTodo];
      console.log({subTodo})

      return {
          todos: subTodo
      }
     
  }

  
  let editTodo = (prevState,action) => {
    let newText = action.payload.newText;
    let key = action.payload.key  
    let targetTodo = prevState.todos.find(item => item.key===key);
    targetTodo.text = newText
    let newTodoList = prevState.todos.filter(item => item.key != key)
    let subTodo =[...newTodoList,targetTodo];
    return {
          todos: subTodo
      }
   
  }