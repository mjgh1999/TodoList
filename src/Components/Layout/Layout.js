import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import './style/LayoutStyle.css'


const { Header, Footer } = Layout;


class PageLayout extends Component {
    render() {
      return (
        <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
           <Menu.Item>Home</Menu.Item>
           <Menu.Item>Todos</Menu.Item>
           <Menu.Item>Login</Menu.Item>
          </Menu>
        </Header>
        <Footer style={{ textAlign: 'center',paddingTop:'80%' }}>Todo App ©2022 Created by themjgh</Footer>
        </Layout>
      );
      
    }
  }
  export default PageLayout;