import React, { useState, useContext } from "react";
import Parse from "parse/dist/parse.min.js";
import { Form, Input, Select, Row, Col, Button } from "antd";
import AuthContext from "../../../Contexts/Auth";

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

function UserEditProfile() {
  const authcontext = useContext(AuthContext);

  const [form] = Form.useForm();

  // State variables
  const [username, setUsername] = useState(authcontext.username);
  const [password, setPassword] = useState(authcontext.password);
  const [phoneNumber, setphoneNumber] = useState(authcontext.phone);
  const [editMode, SetEditMode] = useState(false);
  const [disable, SetDisable] = useState(true);

  let saveProfile = async function () {
    try {
      const Person = await Parse.User.current();
      Person.set("username", username);
      Person.set("password", password);
      Person.set("phone", phoneNumber);
      await Person.save();

      SetEditMode(false);
      SetDisable(true);
      alert("Profile was edited");

      return true;
    } catch (error) {
      // Error can be caused by lack of Internet connection
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  let activeEdit = function () {
    SetEditMode(true);
    SetDisable(false);
  };

  return (
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
              initialValue={authcontext.currentUser.get("username")}
              name="username"
              label="Username"
              rules={[
                {
                  disable: true,
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input disabled={disable} />
            </Form.Item>

            <Form.Item
              onChange={(event) => setphoneNumber(event.target.value)}
              initialValue={authcontext.currentUser.get("phone")}
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input
                disabled={disable}
                addonBefore={prefixSelector}
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              initialValue={authcontext.currentUser.get("password")}
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password disabled={disable} />
            </Form.Item>

            {editMode ? (
              <Form.Item
                onChange={(event) => setPassword(event.target.value)}
                disabled={disable}
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
            ) : (
              <></>
            )}

            <Form.Item {...tailFormItemLayout}>
              {!editMode ? (
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => activeEdit()}
                >
                  Edit
                </Button>
              ) : (
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => saveProfile()}
                >
                  Save
                </Button>
              )}
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default UserEditProfile;
