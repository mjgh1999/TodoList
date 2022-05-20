import React, { useState, useEffect, useContext } from "react";
import { Tabs, Typography, Spin } from "antd";
import TodoIteam from "./TodoItem";
import Parse from "parse/dist/parse.min.js";
import TodoContext from "../../Contexts/TodoContext";
const { Text } = Typography;
const { TabPane } = Tabs;

function TodosList() {
  const [loading, setLoading] = useState(true);
  const todoContext = useContext(TodoContext);

  useEffect(() => {
    initTodos();
    setLoading(false);
  }, []);

  // prepare todo list
  const initTodos = () => {
    const parseQuery = new Parse.Query("Todos");
    const currentUser = Parse.User.current();
    parseQuery.equalTo("ownerUser", currentUser);
    parseQuery.find().then((todos) => {
      let fetchTodoList = [];
      todos.forEach((todo) => {
        fetchTodoList.push({
          key: todo.id,
          done: todo.get("done"),
          text: todo.get("todoText"),
        });
      });
      todoContext.dispatch({
        type: "init_todo",
        payload: { todos: fetchTodoList },
      });
    });
  };

  let doneTodoList = todoContext.todos.filter((item) => item.done === true);
  let unDoneTodoList = todoContext.todos.filter((item) => item.done === false);

  return (
    <>
      <Tabs type="card" defaultActiveKey="1" centered>
        <TabPane tab={unDoneTodoList.length + " Todos "} key="1">
          {!loading ? (
            <>
              {unDoneTodoList.length === 0 ? (
                <Text>There is no todo </Text>
              ) : (
                unDoneTodoList.map((item) => (
                  <TodoIteam key={item.key} item={item} />
                ))
              )}
            </>
          ) : (
            <Spin size="large" />
          )}
        </TabPane>
        <TabPane tab={doneTodoList.length + " Done "} key="2">
          {!loading ? (
            <>
              {doneTodoList.length === 0 ? (
                <Text>There is no done task </Text>
              ) : (
                doneTodoList.map((item) => (
                  <TodoIteam key={item.key} item={item} />
                ))
              )}
            </>
          ) : (
            <Spin size="large" />
          )}
        </TabPane>
      </Tabs>
    </>
  );
}

export default TodosList;
