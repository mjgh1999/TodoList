import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import UserLogin from './Components/LoginForm/loginForm.js';
import UserRegistration from './Components/SignUpForm/signUpForm.js';
import PageLayout from './Components/Layout/Layout.js';
import TabView from './Components/tab/tabs.js'
import AuthContext from './Contexts/auth';
import UserEditProfile from './Components/Profile/profile';

import Parse from 'parse/dist/parse.min.js';
const PARSE_APPLICATION_ID = 'b7seVwvkuKvXCA8OSYfn5QCagO01EIBiGnAy6GMr';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'GcagYgPfQG2wZ02VxVZP4zirRi8LRD3zCJFtYKva';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;







const PrivateRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}




function App() {
  
  const currentUserpars = Parse.User.current();
  const[auth,Setauth] = useState(false)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [correntUser, setCorrentUser] = useState(currentUserpars);


    

  useEffect(()=>{
    if(correntUser){
      Setauth(true)
    }
  },[])



  return (
    <div className="App">
      <AuthContext.Provider value={{
        authenticated: auth,
        currentUser:correntUser,
        username: username,
        password: password,
        phone: phoneNumber,
        login: () => { Setauth(true) },
        logout: () => { Setauth(false) }
      }}>

        <Router>
          <PageLayout />
          <Routes>
            <Route path='/login' element={<UserLogin />} />
            <Route path='/signup' element={<UserRegistration />} />
            <Route path='/todos' element={<PrivateRoute isAuthenticated={currentUserpars} children={<TabView />} />} />
            <Route path='/profile' element={<PrivateRoute isAuthenticated={currentUserpars} children={<UserEditProfile />} />} />
          </Routes>

        </Router>

      </AuthContext.Provider>
      
    </div>
  );
}

export default App;
