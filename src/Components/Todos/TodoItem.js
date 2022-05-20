import React, { useState, useContext } from "react";
import { Row, Col, Button, Space, Input } from "antd";
import Parse from "parse/dist/parse.min.js";
import TodoContext from "../../Contexts/TodoContext";
import "../Todos/Styles/TodoItemStyles.css";

function TodoIteam(props) {
  const [editstatus, setEditStatus] = useState(false);
  const [editText, setEditText] = useState(props.item.text);
  const [buttonLoading, setButtonLoading] = useState(false);

  const todoContext = useContext(TodoContext);

  let inputHandler = (e) => setEditText(e.target.value);

  const saveEditHandler = (text) => {
    editTodo(props.item.key, text);
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

  let editTodo = (key, newText) => {
    setButtonLoading(true);
    let parseQuery = new Parse.Query("Todos");
    parseQuery.equalTo("objectId", key);
    parseQuery.find().then((result) => {
      let Todo = result[0];
      Todo.set("todoText", newText);
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
            <p className="task-text">{props.item.text}</p>
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
        <Row justify="space-around" align="middle" className="task-box">
          <Col xs={24} sm={24} md={14} lg={16} xl={12}>
            <Input onChange={inputHandler} value={editText} />
          </Col>

          <Space align="center">
            <Col xs={4} sm={4} md={4} lg={6} xl={6}>
              <Button
                shape="round"
                className="edit-btn"
                loading={buttonLoading}
                onClick={() => saveEditHandler(editText)}
              >
                save
              </Button>
            </Col>
          </Space>
        </Row>
      )}
    </>
  );
}

export default TodoIteam;
