import { createContext, useState } from 'react';
import { useNavigate } from 'react-router';
import * as authService from '../services/authService.js';

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


export function AuthProvider({
    children
}) {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const registerHandler = async (data) => {

        const result = await authService.register(data.email, data.password);

        setUser(result);

        navigate('/');

        console.log('Registration result:', result);
    }

    const loginHandler = async (data) => {
        const result = await authService.login(data.email, data.password);

        setUser(result);

        navigate('/');

        console.log('Login result:', result);
    }

    const logoutHandler = async () => {
        try {
            await authService.logout(user.accessToken);
        } catch (err) {
            console.error('Logout error:', err);
        }
        setUser(null);
        navigate('/');
    }


    const userContextValues = {
        user,
        isAuthenticated: !!user?.accessToken,
        registerHandler,
        loginHandler,
        logoutHandler,
    }


    return (
        <AuthContext.Provider value={userContextValues}>
            {children}
        </AuthContext.Provider>
    );
}



export default AuthContext;