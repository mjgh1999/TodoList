// import React ,{useState,useEffect} from 'react';

// function todoReducer(state,action){
//     switch(action.type){
//         case 'add_todo':
//             if(text){
//                 setLoading(true)
//                 let Todo = new Parse.Object('Todos');
//                 const currentUser = await Parse.User.current();
//                 Todo.set('todoText', text);
//                 Todo.set('done', false);
//                 Todo.set('ownerUser',currentUser)
                
//                 // After setting the to-do values, save it on the server
//                 try {
//                   await Todo.save();
//                   // Success
//                   setLoading(false)
//                   setTodos([...todos,{key:Todo.id,done:false,text}]);
//                   setText('');
//                   return true;
//                 } catch (error) {
//                   // Error can be caused by lack of Internet connection
//                   alert(`Error! ${error.message}`);
//                   setLoading(false)
//                   return false;
//                 };
//             }
//     }
//     return state;
// }

// export default todoReducer;