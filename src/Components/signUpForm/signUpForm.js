import React from 'react';
import { Form,
  Input,
  Select,
  Row,
  Col,
  Button,
  } from 'antd';

import './styles/signUpForm.css'
const { Option } = Select;
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

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="98">+98</Option>
      </Select>
    </Form.Item>
  );

function SignUpForm (){
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
  };

  return (
    <>  
        <Row justify="space-around" align="middle" className='full-center '>
          <Col >
            <Form 
      
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        labelAlign = 'left'
        labelCol={{ span: 10 }}
        

        >

          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input/>
          </Form.Item>


          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          </Form.Item>


          <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
          </Form.Item>

        <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
        </Form.Item>


        <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>


            </Form>
          </Col>
        </Row>
      
    </>
  );
    }
export default SignUpForm;