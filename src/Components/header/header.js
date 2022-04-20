import React from 'react';
import { Layout,Divider, Input, Button ,Row, Col ,Typography, Space} from 'antd';
const { Header, Content } = Layout;
const { Text, Link ,Title} = Typography;




function PageHeader (){
  
    return (

        <Layout >
            <Content >
                
                <Space direction="vertical">
                    <Title></Title>
                    <Title>Welcome!</Title>
                    <Text>To get started, add some items to your list:</Text>
                    <Space direction="horizontal">
                        <Input placeholder="i want to do ..." />
                        <Button type="primary">add</Button>
                    </Space>
                    
                    </Space>
                    <Divider></Divider>
                    
            </Content>
        </Layout>
    );
      }
  export default PageHeader;