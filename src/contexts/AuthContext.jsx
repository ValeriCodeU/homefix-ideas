import { createContext } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import * as authService from '../services/authService.js';
import useLocalStorage from '../hooks/useLocalStorage.js';

const AuthContext = createContext({
    isAuthenticated: false,
    user: {
        _id: '',
        email: '',
        accessToken: '',
    },
    registerHandler() { },
    loginHandler() { },
    logoutHandler() { },
    sessionExpiredHandler() { },
});

// Сървърът връща целия запис на потребителя, а за регистрираните и паролата в чист вид.
// В state и в localStorage пазим само полетата, които приложението ползва
const toSessionUser = (result) => ({
    _id: result._id,
    email: result.email,
    accessToken: result.accessToken,
});


export function AuthProvider({
    children
}) {

    const [user, setUser] = useLocalStorage('user', null);
    const navigate = useNavigate();

    const registerHandler = async (data) => {

        const result = await authService.register(data.email, data.password);

        setUser(toSessionUser(result));

        navigate('/');
    };

    const loginHandler = async (data) => {
        const result = await authService.login(data.email, data.password);

        setUser(toSessionUser(result));

        navigate('/');
    };

    const logoutHandler = async () => {
        try {
            await authService.logout(user.accessToken);
        } catch (err) {
            console.error('Logout error:', err);
        }
        setUser(null);
        localStorage.removeItem('user');
        navigate('/');
    };

    const sessionExpiredHandler = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/login');

        Swal.fire({
            title: '⚠️ Сесията изтече',
            text: 'Моля, влезте отново в профила си.',
        });
    };


    const userContextValues = {
        user,
        isAuthenticated: !!user?.accessToken,
        registerHandler,
        loginHandler,
        logoutHandler,
        sessionExpiredHandler,
    };


    return (
        <AuthContext.Provider value={userContextValues}>
            {children}
        </AuthContext.Provider>
    );
}



export default AuthContext;