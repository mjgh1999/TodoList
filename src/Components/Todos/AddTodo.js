import React ,{useState,useContext} from 'react';
import { Input, Button ,Typography, Space} from 'antd';
import TodoContext from '../../Contexts/TodoContext';
import Parse from 'parse/dist/parse.min.js';

const { Text ,Title} = Typography;


function AddTodo(){

    const todoContext = useContext(TodoContext);
    const[buttonLoading,setButtonLoading]=useState(false);
    const [text,setText] = useState('');

    const inputHandler = e =>setText(e.target.value)
    
    const addTodo = async function () {
        if (text){
            setButtonLoading(true);
            let Todo = new Parse.Object('Todos');
            const currentUser = Parse.User.current(); 
            Todo.set('todoText', text);
            Todo.set('done', false);
            Todo.set('ownerUser',currentUser)
            await Todo.save();
            let newTodo = {key:Todo.id,done:false,text};
            todoContext.dispatch({type:'add_todo', payload:{newTodo:newTodo}})
            setButtonLoading(false);
            setText('');
            
        }
    }

    return(
        <Space direction="vertical">
        <Title></Title>
        <Title>Welcome!</Title>
        <Text>To get started, add some items to your list:</Text>
        
        <Space direction="horizontal">
            <Input placeholder="i want to do ..." value={text} onChange={inputHandler} />
            <Button type="primary" onClick={addTodo} loading={buttonLoading}>add</Button> 
        </Space>
                    
        </Space>
    );
    


}

export default AddTodo;

