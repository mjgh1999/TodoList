import React from 'react';
import { Tabs,Divider, Input, Button ,Row, Col ,Typography, Space} from 'antd';
import TaskIteam from '../task/taskItem';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

function TabView (){
  
    return (
                <Tabs type="card" defaultActiveKey="1" onChange={callback} centered >
                    <TabPane tab="Todos" key="1">
                    <TaskIteam></TaskIteam>
                    <TaskIteam></TaskIteam>
                    <TaskIteam></TaskIteam>
                    <TaskIteam></TaskIteam>
                    </TabPane>
                    <TabPane tab="Done" key="2">
                    <TaskIteam></TaskIteam>
                    </TabPane>
                </Tabs>
    );
      }
    
export default TabView;