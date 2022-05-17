import React ,{useState,useEffect,useContext} from 'react';
import { Tabs,Typography} from 'antd';
import TodoIteam from './TodoItem';
import Parse from 'parse/dist/parse.min.js';
import TodoContext from '../../Contexts/TodoContext';
const { Text } = Typography;
const { TabPane } = Tabs;



function TodosList (){

    

    const [loading,setLoading]=useState(false)
    const todoContext = useContext(TodoContext);
    
    useEffect(()=>{
      setLoading(true);
      initTodos();
      setLoading(false);
    },[todoContext.state])
  

    // prepare todo list
    const initTodos = () => {
      const parseQuery = new Parse.Query('Todos');
      const currentUser = Parse.User.current();
      parseQuery.equalTo('ownerUser', currentUser);
      parseQuery.find().then(todos =>{
          let fetchTodoList = [];
          todos.forEach(todo => {
            fetchTodoList.push({ key:todo.id, done:todo.get('done'), text:todo.get('todoText')})
          });
          todoContext.dispatch({type:'init_todo', payload:{todos:fetchTodoList}})
          
        })
      };

    let deleteTodo = (key) => {
      let parseQuery = new Parse.Query("Todos");
      parseQuery.equalTo('objectId', key);
      parseQuery.find().then(result =>{
      let Todo = result[0];
      Todo.destroy();
      });
      todoContext.dispatch({type:'delete_todo', payload:{key:key}}) 
      }

    let toggleTodo = async function (key){
      let parseQuery = new Parse.Query("Todos");
      parseQuery.equalTo('objectId', key);
      parseQuery.find().then(result =>{
        let Todo = result[0];
        let statusDown = Todo.get('done')
        Todo.set('done', ! statusDown);
        Todo.save();
      });
      todoContext.dispatch({type:'toggle_todo', payload:{key:key}})     
    }

    let editTodo = async function (key,newText){
      let parseQuery = new Parse.Query("Todos");
      parseQuery.equalTo('objectId', key);
      parseQuery.find().then(result => {
        let Todo = result[0];
        Todo.set('todoText', newText);
        Todo.save();
      });
      todoContext.dispatch({type:'edit_todo', payload:{key:key,newText:newText}})
    }
      

    let doneTodoList = todoContext.todos.filter(item=>item.done===true);
    let unDoneTodoList = todoContext.todos.filter(item=>item.done===false);

    return (    
    
        <>
            <Tabs type="card" defaultActiveKey="1"  centered >
                <TabPane tab={unDoneTodoList.length +' Todos '} key="1">
                      
                    {! loading 
                      ?<> 
                        { unDoneTodoList.length === 0
                              ? (<Text>There is no todo </Text>)
                              : (unDoneTodoList.map(item=><TodoIteam 
                                                            // dispatch = {dispatch}
                                                            key={item.key} 
                                                            item={item} 
                                                            delete={deleteTodo} 
                                                            toggleaction={toggleTodo} 
                                                            edit={editTodo}
                                                            load = {loading}/>))
                      }</>
                      :(<p>loading...</p>)
                    }
                      

                </TabPane>
                <TabPane tab={doneTodoList.length +' Done '} key="2">
                      {! loading 
                        ?<>{
                            doneTodoList.length === 0
                              ? <Text>There is no done task </Text>
                              : doneTodoList.map(item=><TodoIteam 
                                                          key={item.key} 
                                                          item={item} 
                                                          delete={deleteTodo} 
                                                          toggleaction={toggleTodo} 
                                                          edit={editTodo}
                                                          load = {loading}/>)
                      }</>
                      :(<p>loading...</p>)
                    }
                        
                    
                      
                </TabPane>
            </Tabs>
                    
    
        </>

    );
      }
    
export default TodosList;