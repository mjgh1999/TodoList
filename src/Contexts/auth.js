import React from 'react';

const AuthContext = React.createContext({
    authenticated : false,
    currentUser : null,
})

export default AuthContext;