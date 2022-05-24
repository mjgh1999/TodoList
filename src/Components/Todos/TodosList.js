import React, { useState, useEffect, useContext } from "react";
import { Tabs, Typography, Spin } from "antd";
import TodoIteam from "./TodoItem";
import TodoSort from "./TodoSort";
import Parse from "parse/dist/parse.min.js";
import TodoContext from "../../Contexts/TodoContext";
const { Text } = Typography;
const { TabPane } = Tabs;

function TodosList() {
  const [loading, setLoading] = useState(true);
  const todoContext = useContext(TodoContext);
  const [doneList, setDoneList] = useState([]);
  const [undoneList, setUnDoneList] = useState([]);

  useEffect(() => {
    setLoading(true);
    initTodos();
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    let doneTodoList = todoContext.todos.filter((item) => item.done === true);
    let unDoneTodoList = todoContext.todos.filter(
      (item) => item.done === false
    );
    setDoneList(doneTodoList);
    setUnDoneList(unDoneTodoList);

    setLoading(false);
  }, [todoContext.todos]);

  // prepare todo list
  const initTodos = () => {
    const parseQuery = new Parse.Query("Todos");
    const currentUser = Parse.User.current();
    parseQuery.equalTo("ownerUser", currentUser);
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
    });
  };

  return (
    <>
      <Tabs type="card" defaultActiveKey="1" centered>
        <TabPane tab={undoneList.length + " Todos "} key="1">
          {!loading ? (
            <>
              <TodoSort />
              {undoneList.length === 0 ? (
                <Text>There is no todo </Text>
              ) : (
                undoneList.map((item) => (
                  <TodoIteam key={item.key} item={item} />
                ))
              )}
            </>
          ) : (
            <Spin size="large" />
          )}
        </TabPane>
        <TabPane tab={doneList.length + " Done "} key="2">
          {!loading ? (
            <>
              <TodoSort />
              {doneList.length === 0 ? (
                <Text>There is no done task </Text>
              ) : (
                doneList.map((item) => <TodoIteam key={item.key} item={item} />)
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
