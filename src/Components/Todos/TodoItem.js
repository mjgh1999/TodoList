import React, { useState, useContext } from "react";
import { Row, Col, Button, Space, Input, Form, Select, DatePicker } from "antd";
import Parse from "parse/dist/parse.min.js";
import TodoContext from "../../Contexts/TodoContext";
import "../Todos/Styles/TodoItemStyles.css";

const { Option } = Select;

function TodoIteam(props) {
  const [editstatus, setEditStatus] = useState(false);
  const [editText, setEditText] = useState(props.item.text);
  const [editpriority, setEditpriority] = useState(props.item.priority);
  const [editdueDate, setEditDueDate] = useState(props.item.dueDate);
  const [buttonLoading, setButtonLoading] = useState(false);

  const todoContext = useContext(TodoContext);

  let inputHandler = (e) => setEditText(e.target.value);

  const saveEditHandler = (text, priority, dueDate) => {
    editTodo(props.item.key, text, priority, dueDate);
    setEditStatus(false);
  };

  let deleteTodo = (key) => {
    setButtonLoading(true);
    let parseQuery = new Parse.Query("Todos");
    parseQuery.equalTo("objectId", key);
    parseQuery.find().then((result) => {
      let Todo = result[0];
      Todo.destroy().then((Todo) => {
        todoContext.dispatch({
          type: "delete_todo",
          payload: { key: Todo.id },
        });
        setButtonLoading(false);
      });
    });
  };

  let toggleTodo = (key) => {
    setButtonLoading(true);
    let parseQuery = new Parse.Query("Todos");
    parseQuery.equalTo("objectId", key);
    parseQuery.find().then((result) => {
      let Todo = result[0];
      let statusDown = Todo.get("done");
      Todo.set("done", !statusDown);
      Todo.save().then((Todo) => {
        todoContext.dispatch({
          type: "toggle_todo",
          payload: { key: Todo.id },
        });
        setButtonLoading(false);
      });
    });
  };

  let editTodo = (key, newText, newPriority, newDueDate) => {
    setButtonLoading(true);
    let parseQuery = new Parse.Query("Todos");
    parseQuery.equalTo("objectId", key);
    parseQuery.find().then((result) => {
      let Todo = result[0];
      Todo.set("todoText", newText);
      Todo.set("priority", newPriority);
      if (newDueDate != "Not Set") {
        Todo.set("dueDate", newDueDate.toDate());
      }
      Todo.save().then((Todo) => {
        todoContext.dispatch({
          type: "edit_todo",
          payload: { key: Todo.id, newText: newText },
        });
        setButtonLoading(false);
      });
    });
  };

  return (
    <>
      {!editstatus ? (
        <Row justify="space-around" align="middle" className="task-box">
          <Col xs={24} sm={24} md={14} lg={16} xl={12}>
            <Row justify="space-around" align="middle">
              <Col xs={24} sm={24} md={14} lg={16} xl={8}>
                <p className="task-text">{props.item.text}</p>
              </Col>
              <Col xs={24} sm={24} md={14} lg={16} xl={8}>
                <p className="task-text">{props.item.priority}</p>
              </Col>
              <Col xs={24} sm={24} md={14} lg={16} xl={8}>
                <p className="task-text">{props.item.dueDate}</p>
              </Col>
            </Row>
          </Col>

          <Space align="center">
            {!buttonLoading ? (
              <>
                {!props.item.done ? (
                  <Col xs={4} sm={4} md={4} lg={6} xl={6}>
                    <Button
                      shape="round"
                      className="done-btn"
                      onClick={() => toggleTodo(props.item.key)}
                    >
                      done
                    </Button>
                  </Col>
                ) : (
                  <Col xs={4} sm={4} md={4} lg={6} xl={6}>
                    <Button
                      shape="round"
                      className="undone-btn"
                      onClick={() => toggleTodo(props.item.key)}
                    >
                      undone
                    </Button>
                  </Col>
                )}

                <Col xs={4} sm={4} md={4} lg={6} xl={6}>
                  <Button
                    shape="round"
                    className="edit-btn"
                    onClick={() => setEditStatus(true)}
                  >
                    edit
                  </Button>
                </Col>

                <Col xs={4} sm={4} md={4} lg={6} xl={6}>
                  <Button
                    shape="round"
                    danger
                    className="delete-btn"
                    onClick={() => deleteTodo(props.item.key)}
                  >
                    delete
                  </Button>
                </Col>
              </>
            ) : (
              <>
                <Col xs={4} sm={4} md={4} lg={6} xl={6}>
                  <Button shape="round" type="primary" loading={buttonLoading}>
                    Loading
                  </Button>
                </Col>
              </>
            )}
          </Space>
        </Row>
      ) : (
        <Space align="center">
          <Form name="add_todo" layout="inline">
            <Row align="middle" justify="space-around" gutter={[10, 50]}>
              <Col xs={24} sm={24} md={14} lg={8} xl={8}>
                <Form.Item
                  name="title"
                  label="Title"
                  onChange={inputHandler}
                >
                  <Input defaultValue={editText} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={14} lg={4} xl={4}>
                <Form.Item name="priority" label="priority">
                  <Select
                    placeholder="priority"
                    defaultValue={editpriority}
                    onSelect={(value) => setEditpriority(value)}
                  >
                    <Option value="1">important</Option>
                    <Option value="2">neutral</Option>
                    <Option value="3">unimportant</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={14} lg={7} xl={7} offset={1}>
                <Form.Item label="Due Date" defaultValue={editdueDate}>
                  <DatePicker
                    style={{ width: "100%" }}
                    onChange={(value) => setEditDueDate(value)}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={14} lg={3} xl={3}>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    shape="round"
                    className="edit-btn"
                    onClick={() =>
                      saveEditHandler(editText, editpriority, editdueDate)
                    }
                    loading={buttonLoading}
                    block
                  >
                    Save
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Space>
      )}
    </>
  );
}

export default TodoIteam;
