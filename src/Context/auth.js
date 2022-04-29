import React from 'react';

const AuthContext = React.createContext({
    authenticated : false,
    username : '',
    password: '',
    phone: '',
    login : () => {},
    logout : () => {},
})

export default AuthContext;