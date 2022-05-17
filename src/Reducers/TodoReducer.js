import React ,{useState,useEffect,useContext} from 'react';
import Parse from 'parse/dist/parse.min.js';



function todoReducer(state,action){
    
    

    switch(action.type) {
        
        case 'add_todo':
            
            return addButtonHandler(state,action);
            break;

        case 'delete_todo':
            return deleteTodo(state,action);
        
        case 'toggle_todo':
            return toggleTodo(state,action);
        
        case 'edit_todo':
            return editTodo(state,action);
        
        case 'read_todo':
            return readTodos(state,action);
        
        default:
            return state;
    }
    
}






export default todoReducer;



const addButtonHandler= async function (state,action){
    let addTodoText = action.payload.text;
    if(addTodoText){
      state.loading = true;
      // setLoading(true)
      let Todo = new Parse.Object('Todos');
      const currentUser = await Parse.User.current();
      Todo.set('todoText', addTodoText);
      Todo.set('done', false);
      Todo.set('ownerUser',currentUser)
      
      // After setting the to-do values, save it on the server
      try {
        await Todo.save();
        alert('do ittttttttt')
        // Success
        //setLoading(false)
        
        //setTodos([...todos,{key:Todo.id,done:false,addTodoText}]);
        let newTodo = {key:Todo.id,done:false,addTodoText}
        let subList = state.todos
        subList.push(newTodo);
        let returnState = {
            todos: subList,
            text:'',
            loading:false,
        }
        //setText('');
        return returnState;
        
      } catch (error) {
        // Error can be caused by lack of Internet connection
        alert(`Error! ${error.message}`);
        state.loading = false;
        return false;
      };
    
    
    
  }
  }

   // prepare todo list
const readTodos = async function (state,action) {
    // Reading parse objects is done by using Parse.Query
    const parseQuery = new Parse.Query('Todos');
    const currentUser = await Parse.User.current();
    parseQuery.equalTo('ownerUser', currentUser);
    try {
      let todolist = await parseQuery.find();
      let addList = []
      for (let result of todolist) {
          let todoText = result.get('todoText')
          let todoid = result.id
          let doneStatus = result.get('done')
          let newTodo = {key:todoid,done:doneStatus,text:todoText}
          addList.push(newTodo);
      };
      // Be aware that empty or invalid queries return as an empty array
      // Set results to state variable
      //setTodos([...todos,...addList]);
      let returnState = {
        ...state,
        todos: addList
    }
      return returnState;

    } catch (error) {
      // Error can be caused by lack of Internet connection
      alert(`Error! ${error.message}`);
      return false;
    };
  };
  

let deleteTodo = async function (state,action){
    // This will create your query
    let key = action.payload.key
    let Todo = new Parse.Query("Todos");
    Todo.equalTo('objectId', key);
    try {
      let queryResult = await Todo.find();
      let Todo = queryResult[0];
      await Todo.destroy();
      
      
      let subTodo = state.todos.filter(item => item.key != key)
      let returnState = {
        ...state,
        todos: subTodo
    }
    //   setTodos(todos.filter(item => item.key != key))

      return returnState;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
    
  }

  let toggleTodo = async function (state,action){
    let key = action.payload.key
    let Todo = new Parse.Query("Todos");
    Todo.equalTo('objectId', key);
    try {
      let queryResult = await Todo.find();
      let Todo = queryResult[0];
      let statusDown = Todo.get('done')
      
      Todo.set('done', ! statusDown);
      Todo.save();

      // State
      let targetTodo = state.todos.find(item => item.key===key);
      targetTodo.done = !targetTodo.done
      let newTodoList = state.todos.filter(item => item.key != key)
      let subTodo =[...newTodoList,targetTodo];
      let returnState = {
          ...state,
          todos: subTodo
      }
      return returnState;
    } catch (error) {
      // Error can be caused by lack of Internet connection
      alert(`Error! ${error.message}`);
      return false;
    }
  }

  
  let editTodo = async function (state,action){
    let newText = action.payload.text;
    let key = action.payload.key
    // API
    let Todo = new Parse.Query("Todos");
    Todo.equalTo('objectId', key);
    try {
      let queryResult = await Todo.find();
      let Todo = queryResult[0];

      Todo.set('todoText', newText);
      Todo.save();
      
      // State
      let targetTodo = state.todos.find(item => item.key===key);
      targetTodo.done = !targetTodo.done
      let newTodoList = state.todos.filter(item => item.key != key)
      let subTodo =[...newTodoList,targetTodo];
      let returnState = {
          ...state,
          todos: subTodo
      }
   

    //   setTodos([...newTodoList,targetTodo])
      
      return returnState;

    } catch (error) {
      // Error can be caused by lack of Internet connection
      alert(`Error! ${error.message}`);
      return false;
    }
    
  }