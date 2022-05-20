import React from "react";
import { Layout, Divider } from "antd";
import AddTodo from "./../Todos/AddTodo.js";
import TodosList from "./TodosList";
const { Content } = Layout;

function TodoMain() {
  return (
    <>
      <Layout>
        <Content>
          <AddTodo />

          <Divider></Divider>

          <TodosList />
        </Content>
      </Layout>
    </>
  );
}

export default TodoMain;
