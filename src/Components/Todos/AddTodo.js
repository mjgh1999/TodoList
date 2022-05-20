import React, { useState, useContext } from "react";
import { Input, Button, Typography, Space, Form, Row, Col } from "antd";
import TodoContext from "../../Contexts/TodoContext";
import Parse from "parse/dist/parse.min.js";

const { Text, Title } = Typography;

function AddTodo() {
  const todoContext = useContext(TodoContext);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [text, setText] = useState("");

  //const inputHandler = (e) => setText(e.target.value);

  const addTodo = () => {
    if (text) {
      setButtonLoading(true);
      let Todo = new Parse.Object("Todos");
      const currentUser = Parse.User.current();
      Todo.set("todoText", text);
      Todo.set("done", false);
      Todo.set("ownerUser", currentUser);
      Todo.save().then((Todo) => {
        let newTodo = { key: Todo.id, done: false, text };
        todoContext.dispatch({
          type: "add_todo",
          payload: { newTodo: newTodo },
        });
        setButtonLoading(false);
        setText("");
      });
    }
  };

  return (
    <Space direction="vertical">
      <Title></Title>
      <Title>Welcome!</Title>
      <Text>To get started, add some items to your list:</Text>

      <Space direction="horizontal">
        <Form name="add_todo" layout="inline">
          <Form.Item
            name="title"
            onChange={(event) => setText(event.target.value)}
          >
            <Input placeholder="i want to do ..." value={text} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              onClick={addTodo}
              loading={buttonLoading}
            >
              add
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </Space>
  );
}

export default AddTodo;
