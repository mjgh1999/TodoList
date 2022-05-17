import React,{useState} from 'react';
import { Row,Col,Button,Space,Input } from 'antd';
import '../Todos/Styles/TodoItemStyles.css'




function TodoIteam (props){

    const [editstatus,setEditStatus] = useState(false)
    const [editText,setEditText] = useState(props.item.text)
    let inputHandler = e => setEditText(e.target.value)

    const saveEditHandler = text =>{
        props.edit(props.item.key,text);
        setEditStatus(false);
    }
  
    return (
        <>
               
            {
                        !editstatus
                           ?(
                            <Row justify="space-around" align="middle" className='task-box'>
                               <Col xs={24} sm={24} md={14} lg={16} xl={12}>
                               
                                <p className='task-text'>{props.item.text}</p>
                        
                                
                                </Col>
                            
                                <Space align='center'>
                                    {
                                        ! props.item.done  
                                        ? <Col xs={4} sm={4} md={4} lg={6} xl={6}> 
                                            <Button shape='round' className='done-btn' onClick={()=>props.toggleaction(props.item.key)}>done</Button>
                                        </Col>
                                        :
                                        <Col xs={4} sm={4} md={4} lg={6} xl={6}>
                                            <Button shape='round' className='undone-btn' onClick={()=>props.toggleaction(props.item.key)} >undone</Button>
                                        </Col>
                                    }
                                    
                                    <Col xs={4} sm={4} md={4} lg={6} xl={6}>
                                        <Button shape='round' className='edit-btn' onClick={()=>setEditStatus(true)}>edit</Button>
                                    </Col>
                                    
                                    <Col xs={4} sm={4} md={4} lg={6} xl={6}>
                                        <Button shape='round' danger className='delete-btn' onClick={()=>props.delete(props.item.key)}>delete</Button>
                                    </Col>
                                    
                                </Space>
                            </Row>
                           )
                           :(
                            <Row justify="space-around" align="middle" className='task-box'>
                                <Col xs={24} sm={24} md={14} lg={16} xl={12}>
                                    <Input onChange={inputHandler} value={editText} />
                                </Col>

                                <Space align='center'>
                       
                                    <Col xs={4} sm={4} md={4} lg={6} xl={6}>
                                        <Button shape='round' className='edit-btn' onClick={()=>saveEditHandler(editText)} >save</Button>
                                    </Col>
                       
                                </Space>
                            </Row>
                           )
                       } 
                
         </>
           
    );
      }
    
export default TodoIteam;