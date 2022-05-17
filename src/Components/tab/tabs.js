import React ,{useState,useEffect,useReducer,useContext} from 'react';
import { Tabs,Layout,Divider, Input, Button ,Typography, Space} from 'antd';
import TaskIteam from '../task/taskItem';
import Parse from 'parse/dist/parse.min.js';
import todoReducer from '../../Reducers/TodoReducer';
import TodoContext from '../../Contexts/todoContext';
import AddTodo from './../Todos/AddTodo.js'
const { Content } = Layout;
const { Text ,Title} = Typography;
const { TabPane } = Tabs;







function TabView (){

    

    const [text,setText] = useState('')
    const [todos,setTodos]=useState([])
    const [loading,setLoading]=useState(false)

    //const [state,dispatch] = useReducer(todoReducer,{text : text,todos:todos,loading:loading})
    const todoContext = useContext(TodoContext);
    
    useEffect(()=>{
      todoContext.dispatch({ type:'read_todo'});
      console.log(todoContext.state);
      //readTodos();
    },[])
    
  

    // prepare todo list
    const readTodos = async function () {
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
        todoContext.todos = addList;
        setTodos(todoContext.todos);
        
        console.log(todoContext.todos);

        return true;
      } catch (error) {
        // Error can be caused by lack of Internet connection
        alert(`Error! ${error.message}`);
        return false;
      };
    };

    
   

 

    
      
      let allTodos = todoContext.todos
      console.log({allTodos});
      // let doneTodoList = todos.filter(item=>item.done===true)
      // let unDoneTodoList = todos.filter(item=>item.done===false)
      let doneTodoList = allTodos.filter(item=>item.done===true);
      let unDoneTodoList = allTodos.filter(item=>item.done===false);
    
   

    const addButtonHandler= async function (){
      if(text){
        setLoading(true)
        let Todo = new Parse.Object('Todos');
        const currentUser = await Parse.User.current();
        Todo.set('todoText', text);
        Todo.set('done', false);
        Todo.set('ownerUser',currentUser)
        
        // After setting the to-do values, save it on the server
        try {
          await Todo.save();
          // Success
          setLoading(false)
          setTodos([...todos,{key:Todo.id,done:false,text}]);
          setText('');
          return true;
        } catch (error) {
          // Error can be caused by lack of Internet connection
          alert(`Error! ${error.message}`);
          setLoading(false)
          return false;
        };
      
      
      
    }
    }

    let inputHandler= e =>setText(e.target.value)
    

    let deleteTodo = async function (key){
      // This will create your query
      let parseQuery = new Parse.Query("Todos");
      parseQuery.equalTo('objectId', key);
      try {
        let queryResult = await parseQuery.find();
        let Todo = queryResult[0];
        await Todo.destroy();
        
        

        setTodos(todos.filter(item => item.key != key))

        return true;
      } catch (error) {
        alert(`Error! ${error.message}`);
        return false;
      }
      
    }

    let toggleTodo = async function (key){

      let parseQuery = new Parse.Query("Todos");
      parseQuery.equalTo('objectId', key);
      try {
        let queryResult = await parseQuery.find();
        let Todo = queryResult[0];
        let statusDown = Todo.get('done')
        
        Todo.set('done', ! statusDown);
        Todo.save();

        let targetTodo = todos.find(item => item.key===key);
        targetTodo.done = !targetTodo.done
        let newTodoList = todos.filter(item => item.key != key)
        setTodos([...newTodoList,targetTodo])
        return true;
      } catch (error) {
        // Error can be caused by lack of Internet connection
        alert(`Error! ${error.message}`);
        return false;
      }
    }

    let editTodo = async function (key,newText){

      // This will create your query
      let parseQuery = new Parse.Query("Todos");
      parseQuery.equalTo('objectId', key);
      // The query will resolve only after calling this method
      try {
        let queryResult = await parseQuery.find();
        let Todo = queryResult[0];

        Todo.set('todoText', newText);
        Todo.save();

        let targetTodo = todos.find(item => item.key===key);
        targetTodo.text = newText
        let newTodoList = todos.filter(item => item.key != key)

     

        setTodos([...newTodoList,targetTodo])
        
        return true;
      } catch (error) {
        // Error can be caused by lack of Internet connection
        alert(`Error! ${error.message}`);
        return false;
      }
      
    }
      

    return (    
    
    <>
                <Layout >
                  <Content >
                    
                    {/* <Space direction="vertical">
                    <Title></Title>
                    <Title>Welcome!</Title>
                    <Text>To get started, add some items to your list:</Text>
                    <Space direction="horizontal">
                        <Input placeholder="i want to do ..." value={text} onChange={inputHandler} />
                        <Button type="primary" onClick={addButtonHandler}>add</Button>
                    </Space>
                    
                    </Space> */}

                    <AddTodo/>
                    
                    <Divider></Divider>

                    <Tabs type="card" defaultActiveKey="1"  centered >
                    <TabPane tab={unDoneTodoList.length +' Todos '} key="1">
                      
                    {! loading 
                      ?<> 
                        { unDoneTodoList.length === 0
                              ? (<Text>There is no todo </Text>)
                              : (unDoneTodoList.map(item=><TaskIteam 
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
                              : doneTodoList.map(item=><TaskIteam 
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
                    
            </Content>
        </Layout>
                
                </>
    );
      }
    
export default TabView;