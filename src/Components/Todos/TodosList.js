import React ,{useState,useEffect,useContext} from 'react';
import { Tabs,Typography,Spin} from 'antd';
import TodoIteam from './TodoItem';
import Parse from 'parse/dist/parse.min.js';
import TodoContext from '../../Contexts/TodoContext';
const { Text } = Typography;
const { TabPane } = Tabs;



function TodosList (){

    

    const [loading,setLoading]=useState(false)
    const[buttonLoading,setButtonLoading]=useState(false);
    const todoContext = useContext(TodoContext);
    
    useEffect(()=>{
      
      initTodos();
      
    },[todoContext.state])
  

    // prepare todo list
    const initTodos = () => {
      setLoading(true);
      console.log(loading);
      const parseQuery = new Parse.Query('Todos');
      const currentUser = Parse.User.current();
      parseQuery.equalTo('ownerUser', currentUser);
      parseQuery.find().then(todos =>{
          let fetchTodoList = [];
          todos.forEach(todo => {
            fetchTodoList.push({ key:todo.id, done:todo.get('done'), text:todo.get('todoText')})
          });
          todoContext.dispatch({type:'init_todo', payload:{todos:fetchTodoList}})
          setLoading(false);
        })
      };

    let deleteTodo = (key) => {
      setButtonLoading(true)
      let parseQuery = new Parse.Query("Todos");
      parseQuery.equalTo('objectId', key);
      parseQuery.find().then(result =>{
      let Todo = result[0];
      Todo.destroy();
      });
      todoContext.dispatch({type:'delete_todo', payload:{key:key}})
      setLoading(false);
      
      
      }

    let toggleTodo = async function (key){
      setButtonLoading(true)
      let parseQuery = new Parse.Query("Todos");
      parseQuery.equalTo('objectId', key);
      parseQuery.find().then(result =>{
        let Todo = result[0];
        let statusDown = Todo.get('done')
        Todo.set('done', ! statusDown);
        Todo.save();
      });
      todoContext.dispatch({type:'toggle_todo', payload:{key:key}})
      setButtonLoading(false)     
    }

    let editTodo = async function (key,newText){
      setButtonLoading(true)
      let parseQuery = new Parse.Query("Todos");
      parseQuery.equalTo('objectId', key);
      parseQuery.find().then(result => {
        let Todo = result[0];
        Todo.set('todoText', newText);
        Todo.save();
      });
      todoContext.dispatch({type:'edit_todo', payload:{key:key,newText:newText}})
      setButtonLoading(false)
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
                                                           />))
                      }</>
                      :(<Spin size="large" />)
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
                                                          buttonLoading = {buttonLoading}
                                                          />)
                      }</>
                      :(<Spin size="large" />)
                    }
                        
                    
                      
                </TabPane>
            </Tabs>
                    
    
        </>

    );
      }
    
export default TodosList;