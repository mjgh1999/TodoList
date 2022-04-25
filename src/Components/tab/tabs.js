import React ,{useState} from 'react';
import { Tabs,Layout,Divider, Input, Button ,Row, Col ,Typography, Space} from 'antd';
import TaskIteam from '../task/taskItem';
import PageHeader from '../header/header.js';
import Item from 'antd/lib/list/Item';
const { Header, Content } = Layout;
const { Text, Link ,Title} = Typography;
const { TabPane } = Tabs;







function TabView (){

    const [text,setText] = useState('')
    const [todos,setTodos]=useState([])

    let addButtonHandler= e =>{
      if(text){
      setTodos([...todos,{key:Date.now(),done:false,text}]);
      setText('');}
    }

    let inputHandler= e =>setText(e.target.value)

    let doneTodoList = todos.filter(item=>item.done===true)
    let unDoneTodoList = todos.filter(item=>item.done===false)

    let deleteTodo = key =>{
      setTodos(todos.filter(item => item.key != key))
    }

    let toggleTodo = key =>{
      let targetTodo = todos.find(item => item.key===key);
      targetTodo.done = !targetTodo.done
      let newTodoList = todos.filter(item => item.key != key)
      setTodos([...newTodoList,targetTodo])
    }

    let editTodo = (key,newText) =>{
      let targetTodo = todos.find(item => item.key===key);
      targetTodo.text = newText
      let newTodoList = todos.filter(item => item.key != key)
      setTodos([...newTodoList,targetTodo])
    }
      

    return (    
    
    <>
                <Layout >
                  <Content >
                    <Space direction="vertical">
                    <Title></Title>
                    <Title>Welcome!</Title>
                    <Text>To get started, add some items to your list:</Text>
                    <Space direction="horizontal">
                        <Input placeholder="i want to do ..." value={text} onChange={inputHandler} />
                        <Button type="primary" onClick={addButtonHandler}>add</Button>
                    </Space>
                    
                    </Space>
                    <Divider></Divider>

                    <Tabs type="card" defaultActiveKey="1"  centered >
                    <TabPane tab={unDoneTodoList.length +' Todos '} key="1">

                      {
                        unDoneTodoList.length === 0
                          ? <Text>There is no todo </Text>
                          : unDoneTodoList.map(item=><TaskIteam 
                                                        key={item.key} 
                                                        item={item} 
                                                        delete={deleteTodo} 
                                                        toggleaction={toggleTodo} 
                                                        edit={editTodo}/>)
                      }

                    </TabPane>
                    <TabPane tab={doneTodoList.length +' Done '} key="2">
                    {
                        doneTodoList.length === 0
                          ? <Text>There is no done task </Text>
                          : doneTodoList.map(item=><TaskIteam 
                                                      key={item.key} 
                                                      item={item} 
                                                      delete={deleteTodo} 
                                                      toggleaction={toggleTodo} 
                                                      edit={editTodo}/>)
                      }
                      </TabPane>
                </Tabs>
                    
            </Content>
        </Layout>
                
                </>
    );
      }
    
export default TabView;