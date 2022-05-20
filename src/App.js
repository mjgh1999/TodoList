import React, { useState, useEffect, useReducer } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
// Components
import UserLogin from "./Components/User/Authentication/LoginForm/LoginForm.js";
import UserRegistration from "./Components/User/Authentication/SignUpForm/SignUpForm.js";
import PageHeader from "./Components/Layout/Header/Header.js";
import TodoMain from "./Components/Todos/TodoMain.js";
import UserEditProfile from "./Components/User/Profile/Profile.js";
// Contexts
import AuthContext from "./Contexts/Auth";
import TodoContext from "./Contexts/TodoContext";
// Reducers
import todoReducer from "./Reducers/TodoReducer";
// Styles
import "./App.css";
// Back-End API Connection
import Parse from "parse/dist/parse.min.js";
const PARSE_APPLICATION_ID = "b7seVwvkuKvXCA8OSYfn5QCagO01EIBiGnAy6GMr";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = "GcagYgPfQG2wZ02VxVZP4zirRi8LRD3zCJFtYKva";
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

const PrivateRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const currentUserpars = Parse.User.current();
  const [auth, Setauth] = useState(false);
  const [correntUser, setCorrentUser] = useState(currentUserpars);
  const [state, dispatch] = useReducer(todoReducer, { todos: [] });

  useEffect(() => {
    if (correntUser) {
      Setauth(true);
    }
  }, [correntUser]);

  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          authenticated: auth,
          currentUser: correntUser,
        }}
      >
        <TodoContext.Provider
          value={{
            todos: state.todos,
            dispatch: dispatch,
          }}
        >
          <Router>
            <PageHeader />
            <Routes>
              <Route path="/login" element={<UserLogin />} />
              <Route path="/signup" element={<UserRegistration />} />
              <Route
                path="/profile"
                element={
                  <PrivateRoute
                    isAuthenticated={auth}
                    children={<UserEditProfile />}
                  />
                }
              />
              <Route
                path="/todos"
                element={
                  <PrivateRoute
                    isAuthenticated={auth}
                    children={<TodoMain />}
                  />
                }
              />
              <Route
                path="/"
                element={
                  <PrivateRoute
                    isAuthenticated={auth}
                    children={<TodoMain />}
                  />
                }
              />
            </Routes>
          </Router>
        </TodoContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
