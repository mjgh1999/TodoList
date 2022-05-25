import { Table, Divider, Spin } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState, useContext } from "react";
import TodoButtons from "./TodoActionButtons";
import Parse from "parse/dist/parse.min.js";
import TodoContext from "../../Contexts/TodoContext";

const columns = [
  {
    title: "Title",
    dataIndex: "text",
    key: "text",
    width: "20%",
    sortDirections: ["descend"],
  },
  {
    title: "Priority",
    dataIndex: "priority",
    key: "priority",
    sorter: {
      compare: (a, b) => a.priority - b.priority,
    },
    width: "20%",
  },
  {
    title: "Due Date",
    dataIndex: "dueDate",
    key: "dueDate",
    sorter: {
      compare: (a, b) => a.dueDate - b.dueDate,
    },
  },
  {
    title: "Actions",
    dataIndex: "actions",
  },
];

const TodoTable = (props) => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [skip, setSkip] = useState(0);

  const todoContext = useContext(TodoContext);

  const fetchData = () => {
    const parseQuery = new Parse.Query("Todos");
    const currentUser = Parse.User.current();
    parseQuery.equalTo("ownerUser", currentUser).equalTo("done", props.done);
    parseQuery.count().then((count) => {
      setCount(count);
      parseQuery.skip(skip * 10).limit(10);
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
            text: todo.get("todoText"),
            done: todo.get("done"),
            priority: todo.get("priority"),
            dueDate: todoDueDate,
            actions: (
              <TodoButtons
                item={{
                  key: todo.id,
                  text: todo.get("todoText"),
                  done: todo.get("done"),
                  priority: todo.get("priority"),
                  dueDate: todoDueDate,
                }}
              />
            ),
          };
          fetchTodoList.push(todoIteam);
        });

        if (props.done) {
          todoContext.dispatch({
            type: "init_Donetodo",
            payload: { doneTodos: fetchTodoList, done: props.done },
          });
        } else {
          todoContext.dispatch({
            type: "init_UnDonetodo",
            payload: { undoneTodos: fetchTodoList, done: props.done },
          });
        }
      });
    });
  };

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    if (skip > parseInt(count / 10)) {
      return;
    } else {
      setLoading(true);
      fetchData();
      setSkip(skip + 1);
      setLoading(false);
    }
  };

  let sortBy = (sortType, ordering) => {
    setLoading(true);
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
      setLoading(false);
    });
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
    >
      <InfiniteScroll
        dataLength={count}
        next={loadMoreData}
        hasMore={skip <= parseInt(count / 10)}
        loader={<Spin />}
        endMessage={<Divider plain>It is all, nothing more</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <Table
          columns={columns}
          rowKey={(record) => record.key}
          dataSource={
            props.done ? todoContext.doneTodos : todoContext.undoneTodos
          }
          pagination={false}

          //pagination={pagination}
          //loading={loading}
          //onChange={handleTableChange}
        />
      </InfiniteScroll>
    </div>
  );
};

export default TodoTable;
