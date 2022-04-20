import React from 'react';
import { Card ,Row,Col,Button,Typography,Space } from 'antd';
import '../task/taskStyle.css';
const { Title, Paragraph, Text, Link } = Typography;




function TaskIteam (){
  
    return (
        
                <Row justify="space-around" align="middle" className='task-box'>
                        
                        <Col xs={24} sm={24} md={14} lg={16} xl={12}>
                    
                            <p className='task-text'>this is a task</p>
                            
                        </Col>

                        <Space align='center'>
                            <Col xs={4} sm={4} md={4} lg={6} xl={6}> 
                            
                                <Button shape='round' className='done-btn'>done</Button>
                            </Col>
                            <Col xs={4} sm={4} md={4} lg={6} xl={6}>
                                <Button shape='round' className='undone-btn'>undone</Button>
                            </Col>
                            <Col xs={4} sm={4} md={4} lg={6} xl={6}>
                                <Button shape='round' danger className='delete-btn'>delete</Button>
                            </Col>
                            </Space>
                        
                        
            
                </Row>
           
    );
      }
    
export default TaskIteam;