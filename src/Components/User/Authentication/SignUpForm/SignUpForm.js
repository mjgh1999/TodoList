import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";
import { Form, Input, Select, Row, Col, Button } from "antd";
import AuthContext from "../../../../Contexts/Auth";
import "./../Styles/SignUpFormStyle.css";

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

function UserRegistration() {
  const authcontext = useContext(AuthContext);

  const [form] = Form.useForm();

  // State variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [signUpDown, setSignupDown] = useState(false);

  // Functions used by the screen components
  const doUserRegistration = async function () {
    // Note that these values come from state variables that we've declared before
    const usernameValue = username;
    const passwordValue = password;
    const phoneValue = phoneNumber;
    try {
      // Since the signUp method returns a Promise, we need to call it using await
      const createdUser = await Parse.User.signUp(
        usernameValue,
        passwordValue,
        { phone: phoneValue }
      );
      // authenticated
      const currentUser = await Parse.User.current();
      authcontext.currentUser = currentUser;
      authcontext.authenticated = true;
      setSignupDown(true);
      return true;
    } catch (error) {
      // signUp can fail if any parameter is blank or failed an uniqueness check on the server
      alert(`Error! ${error}`);
      return false;
    }
  };

  return (
    <>
      {!signUpDown ? (
        <>
          <Row justify="space-around" align="middle" className="full-center ">
            <Col>
              <Form
                form={form}
                name="register"
                scrollToFirstError
                labelAlign="left"
                labelCol={{ span: 10 }}
              >
                <Form.Item
                  onChange={(event) => setUsername(event.target.value)}
                  name="username"
                  label="Username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Username!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  onChange={(event) => setphoneNumber(event.target.value)}
                  name="phone"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                  ]}
                >
                  <Input
                    addonBefore={prefixSelector}
                    style={{ width: "100%" }}
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  onChange={(event) => setPassword(event.target.value)}
                  name="confirm"
                  label="Confirm Password"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => doUserRegistration()}
                  >
                    Register
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Navigate to="/todos" />
        </>
      )}
    </>
  );
}

export default UserRegistration;
