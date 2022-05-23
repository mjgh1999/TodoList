import React, { useState, useContext } from "react";
import { Row, Col, Button, Space, Input, Select } from "antd";
import { CaretDownOutlined, CaretUpFilled } from "@ant-design/icons";
import Parse from "parse/dist/parse.min.js";
import TodoContext from "../../Contexts/TodoContext";
import "../Todos/Styles/TodoItemStyles.css";

const { Option } = Select;

function TodoSort() {
  const [sortby, setSortBy] = useState("priority");
  const [buttonLoading, setButtonLoading] = useState(false);
  const todoContext = useContext(TodoContext);

  let sortBy = (sortType, ordering) => {
    setButtonLoading(true);

    let parseQuery = new Parse.Query("Todos");

    const currentUser = Parse.User.current();

    {
      ordering
        ? parseQuery.equalTo("ownerUser", currentUser).ascending(sortType)
        : parseQuery.equalTo("ownerUser", currentUser).descending(sortType);
    }
    parseQuery.find().then((todos) => {
      let fetchTodoList = [];
      todos.forEach((todo) => {
        let todoDate = todo.get("dueDate");
        let todoDueDate;
        if (todoDate) {
          todoDueDate = todoDate.toLocaleDateString();
        } else {
          todoDueDate = "Not Set";
        }
        let todoIteam = {
          key: todo.id,
          done: todo.get("done"),
          text: todo.get("todoText"),
          priority: todo.get("priority"),
          dueDate: todoDueDate,
        };
        fetchTodoList.push(todoIteam);
      });
      todoContext.dispatch({
        type: "init_todo",
        payload: { todos: fetchTodoList },
      });
      setButtonLoading(false);
    });
  };

  return (
    <>
      <Row justify="space-around" align="middle" className="task-titles-box ">
        <Col xs={24} sm={24} md={14} lg={16} xl={12}>
          <Row justify="space-around" align="middle">
            <Col xs={24} sm={24} md={14} lg={16} xl={8}>
              <p className="task-titles">Title</p>
            </Col>
            <Col xs={24} sm={24} md={14} lg={16} xl={8}>
              <p className="task-titles">Priority</p>
            </Col>
            <Col xs={24} sm={24} md={14} lg={16} xl={8}>
              <p className="task-titles">Due Date</p>
            </Col>
          </Row>
        </Col>

        <Space align="center">
          <>
            <Col xs={4} sm={4} md={4} lg={6} xl={6}>
              <Select
                placeholder="Sorted By"
                defaultValue="priority"
                onSelect={(value) => setSortBy(value)}
              >
                <Option value="dueDate">Due Date</Option>
                <Option value="priority">Priority</Option>
              </Select>
            </Col>

            <Col xs={4} sm={4} md={4} lg={6} xl={6}>
              <Button onClick={() => sortBy(sortby, 1)} loading={buttonLoading}>
                <CaretDownOutlined />
              </Button>
            </Col>

            <Col xs={4} sm={4} md={4} lg={6} xl={6}>
              <Button onClick={() => sortBy(sortby, 0)} loading={buttonLoading}>
                <CaretUpFilled />
              </Button>
            </Col>
          </>
        </Space>
      </Row>
    </>
  );
}

export default TodoSort;
