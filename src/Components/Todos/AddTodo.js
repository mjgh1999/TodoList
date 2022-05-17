import React ,{useState,useEffect,useReducer,useContext} from 'react';
import { Input, Button ,Typography, Space} from 'antd';
import TodoContext from '../../Contexts/todoContext';
import AuthContext from '../../Contexts/auth.js'

const { Text ,Title} = Typography;


function AddTodo(){
    const authContext = useContext(AuthContext);
    const todoContext = useContext(TodoContext);
    
    
    
    const [text,setText] = useState('');
    let inputHandler= e =>setText(e.target.value)
    

    return(
        <Space direction="vertical">
        <Title></Title>
        <Title>Welcome!</Title>
        <Text>To get started, add some items to your list:</Text>
        
        <Space direction="horizontal">
            <Input placeholder="i want to do ..." value={text} onChange={inputHandler} />
            <Button type="primary" onClick={ ()=>todoContext.dispatch( { type:'add_todo', payload:{ text : text }})}>add</Button> 
        </Space>
                    
        </Space>
    );
    


}

export default AddTodo;

