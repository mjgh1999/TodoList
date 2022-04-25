import React,{useState} from 'react';
import { Card ,Row,Col,Button,Typography,Space,Input } from 'antd';
import '../task/taskStyle.css';
const { Title, Paragraph, Text, Link } = Typography;




function TaskIteam (probs){

    const [editstatus,setEditStatus] = useState(false)
    const [editText,setEditText] = useState(probs.item.text)
    let inputHandler = e => setEditText(e.target.value)

    const saveEditHandler = text =>{
        probs.edit(probs.item.key,text);
        setEditStatus(false);
    }
  
    return (
        <>
               
            {
                        !editstatus
                           ?(
                            <Row justify="space-around" align="middle" className='task-box'>
                                <Col xs={24} sm={24} md={14} lg={16} xl={12}>
                                    <p className='task-text'>{probs.item.text}</p>
                                </Col>

                                <Space align='center'>
                                    {
                                        ! probs.item.done  
                                        ? <Col xs={4} sm={4} md={4} lg={6} xl={6}> 
                                            <Button shape='round' className='done-btn' onClick={()=>probs.toggleaction(probs.item.key)}>done</Button>
                                        </Col>
                                        :
                                        <Col xs={4} sm={4} md={4} lg={6} xl={6}>
                                            <Button shape='round' className='undone-btn' onClick={()=>probs.toggleaction(probs.item.key)} >undone</Button>
                                        </Col>
                                    }
                                    
                                    <Col xs={4} sm={4} md={4} lg={6} xl={6}>
                                        <Button shape='round' className='edit-btn' onClick={()=>setEditStatus(true)}>edit</Button>
                                    </Col>
                                    
                                    <Col xs={4} sm={4} md={4} lg={6} xl={6}>
                                        <Button shape='round' danger className='delete-btn' onClick={()=>probs.delete(probs.item.key)}>delete</Button>
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
    
export default TaskIteam;