import { createContext } from 'react';

const AuthContext = createContext({
    isAuthenticated: false,
    user: {
        email: '',
        password: '',
        _createdOn: '',
        _id: '',
        accessToken: '',
    },
    registerHandler() { },
    loginHandler() { },
    logoutHandler() { },
});



export default AuthContext;