import React, {useContext } from 'react';
import { Layout, Menu , Button} from 'antd';
import {NavLink } from 'react-router-dom';
import Parse from 'parse/dist/parse.min.js';
import './style/LayoutStyle.css'
import AuthContext from '../../Context/auth.js'

const { Header, Footer } = Layout;


const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 8,
      offset: 8,
    },
  },
};





function PageLayout (){
 
  const authContext = useContext(AuthContext);
      
  const doUserLogOut = async function () {
    try {
      await Parse.User.logOut();
      // To verify that current user is now empty, currentAsync can be used
      const currentUser = await Parse.User.current();
      if (currentUser === null) {
        alert('Success! No user is logged in anymore!');
      }
      // Update state variable holding current user
      authContext.authenticated = false;
      authContext.username = '';
      authContext.password = '';
      authContext.phone = '';
  
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
            ?  <Button shape='round' className="logout" onClick={() => doUserLogOut()}><NavLink>Log Out</NavLink></Button>
            :  <Button shape='round' className="login"><NavLink to='/login'>Log In</NavLink></Button>
          }
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
          {
            authContext.authenticated
            ?  (
                <>
                <Menu.Item><NavLink to='/todos'>Todos</NavLink></Menu.Item>
                <Menu.Item><NavLink to='/login'>Login</NavLink></Menu.Item>
                </>
                )
            :  (
                <>
                <Menu.Item><NavLink>Login</NavLink></Menu.Item>
                </>
            )
          }
           
           
          </Menu>
        </Header>
        </Layout>
      );
      
    
  }
  export default PageLayout;