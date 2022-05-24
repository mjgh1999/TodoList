import React, { useState, useContext } from "react";
import {
  Input,
  Button,
  Typography,
  Space,
  Form,
  Select,
  DatePicker,
  Row,
  Col,
} from "antd";
import TodoContext from "../../Contexts/TodoContext";
import Parse from "parse/dist/parse.min.js";

const { Text, Title } = Typography;
const { Option } = Select;

function AddTodo() {
  const [form] = Form.useForm();
  const todoContext = useContext(TodoContext);
  const [buttonLoading, setButtonLoading] = useState(false);

  const addTodo = (values) => {
    console.log(values);

    setButtonLoading(true);
    let todoDue = "Not Set";
    let Todo = new Parse.Object("Todos");
    const currentUser = Parse.User.current();
    Todo.set("todoText", values.text);
    Todo.set("done", false);
    Todo.set("priority", values.priority);
    if (values.dueDate) {
      Todo.set("dueDate", values.dueDate.toDate());
      todoDue = values.dueDate.toDate().toLocaleDateString();
    }
    Todo.set("ownerUser", currentUser);
    Todo.save().then((Todo) => {
      let newTodo = {
        key: Todo.id,
        done: false,
        text: values.text,
        priority: values.priority,
        dueDate: todoDue,
      };

      todoContext.dispatch({
        type: "add_todo",
        payload: { newTodo: newTodo },
      });
      form.resetFields();
      setButtonLoading(false);
    });
  };

  return (
    <Space direction="vertical">
      <Title></Title>
      <Title>Welcome!</Title>
      <Text>To get started, add some items to your list:</Text>

      <Space direction="horizontal">
        <Form form={form} name="add_todo" layout="inline" onFinish={addTodo}>
          <Row align="middle" justify="space-around" gutter={[10, 50]}>
            <Col xs={24} sm={24} md={14} lg={8} xl={8}>
              <Form.Item
                name="text"
                label="Title"
                rules={[
                  { required: true, message: "Please input your todo title!" },
                ]}
              >
                <Input placeholder="i want to do ..." />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={14} lg={4} xl={4}>
              <Form.Item initialValue="2" name="priority" label="priority">
                <Select placeholder="priority">
                  <Option value="1">important</Option>
                  <Option value="2">neutral</Option>
                  <Option value="3">unimportant</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={14} lg={7} xl={7} offset={1}>
              <Form.Item name="dueDate" label="Due Date">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={14} lg={3} xl={3}>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={buttonLoading}
                  block
                >
                  add
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Space>
    </Space>
  );
}

export default AddTodo;
