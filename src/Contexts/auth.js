import React from 'react';

const AuthContext = React.createContext({
    authenticated : false,
    currentUser : null,
    username : '',
    password: '',
    phone: '',
    login : () => {},
    logout : () => {},
})

export default AuthContext;