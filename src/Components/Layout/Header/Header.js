import React, {useContext } from 'react';
import { Layout, Menu , Button} from 'antd';
import {NavLink } from 'react-router-dom';
import Parse from 'parse/dist/parse.min.js';
import AuthContext from '../../../Contexts/Auth'
import './Styles/HeaderStyles.css'

const { Header } = Layout;




function PageHeader (){
 
  const authContext = useContext(AuthContext);
      
  const doUserLogOut = async function () {
    try {
      await Parse.User.logOut();
      authContext.authenticated = false;
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };

      return (
        <Layout className="layout">
        <Header>
          {
            authContext.authenticated
            ?  <Button shape='round' className="logout" onClick={() => doUserLogOut()}><NavLink to="/login">Log Out</NavLink></Button>
            :  <Button shape='round' className="login"><NavLink to='/login'>Log In</NavLink></Button>
          }
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
          {
            authContext.authenticated
            ?  (
                <>
                <Menu.Item><NavLink to='/todos'>Todos</NavLink></Menu.Item>
                <Menu.Item><NavLink to='/profile'>Profile</NavLink></Menu.Item>
                </>
                )
            :  (
                <>
                <Menu.Item><NavLink to='/login'>Login</NavLink></Menu.Item>
                </>
            )
          }
           
           
          </Menu>
        </Header>
        </Layout>
      );
      
    
  }
  export default PageHeader;