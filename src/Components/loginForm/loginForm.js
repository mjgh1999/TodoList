import React,{useState,useContext} from 'react';
import Parse from 'parse/dist/parse.min.js';
import { Form, Input, Button, Row, Col} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import AuthContext from '../../Context/auth';
import './styles/loginForm.css'

function UserLogin  (){

  const authcontext = useContext(AuthContext);

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  // Function that will return current user and also update current username
  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    // Update state variable holding current user
    setCurrentUser(currentUser);
    return currentUser;
  };


  const doUserLogIn = async function () {
    // Note that these values come from state variables that we've declared before
    const usernameValue = username;
    const passwordValue = password;
    try {
      const loggedInUser = await Parse.User.logIn(usernameValue, passwordValue);
      // logIn returns the corresponding ParseUser object
      alert(
        `Success! User ${loggedInUser.get(
          'username'
        )} has successfully loged in!`
      );
      // To verify that this is in fact the current user, `current` can be used
      const currentUser = await Parse.User.current();
      console.log(loggedInUser === currentUser);
      // Clear input fields
      setUsername('');
      setPassword('');
      // Update state variable holding current user
      getCurrentUser();
      // authenticated
      authcontext.login();
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
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>)
      :( 
        <h2 className="heading">{`Hello ${currentUser.get('username')}!`}</h2>
      
      )
        }
        
      </Col>
    </Row>
    

    


    </>
  );
    }
export default UserLogin ;