import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import './style/LayoutStyle.css'
import PageHeader from '../header/header.js';

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
        </Layout>
      );
      
    }
  }
  export default PageLayout;