import React,{useState,useContext} from 'react';
import { Navigate } from 'react-router-dom';
import Parse from 'parse/dist/parse.min.js';
import { Form, Input, Button, Row, Col} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import AuthContext from '../../../../Contexts/Auth';
import './../Styles/LoginFormStyle.css'

function UserLogin(){

  const authcontext = useContext(AuthContext);

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);


  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    setCurrentUser(currentUser);
    return currentUser;
  };


  const doUserLogIn = async function () {
    const usernameValue = username;
    const passwordValue = password;
    try {
      const loggedInUser = await Parse.User.logIn(usernameValue, passwordValue);
      setUsername('');
      setPassword('');
      // Update state variable holding current user
      getCurrentUser();
      // authenticated
      authcontext.authenticated =true;
      authcontext.currentUser = currentUser
      return true;
    } catch (error) {
      // Error can be caused by wrong parameters or lack of Internet connection
      alert(`Error! ${error.message}`);
      return false;
    }
  };


  return (
    <>
    <Row justify="space-around" align="middle" className='full-center'>
      <Col >
      { currentUser === null
       ? (<Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          onChange={(event) => setUsername(event.target.value)}
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" onClick={() => doUserLogIn()}>
            Log in
          </Button>
          Or <a href="/signup">register now!</a>
        </Form.Item>
      </Form>)
      :( 
        <Navigate to="/todos"/>
      
      )
        }
        
      </Col>
    </Row>
    

    


    </>
  );
    }
export default UserLogin ;