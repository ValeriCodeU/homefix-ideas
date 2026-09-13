import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router'

import AuthContext from '../../contexts/AuthContext.jsx'

export default function GuestRoute() {

    const { isAuthenticated } = useContext(AuthContext);

    return isAuthenticated
        ? <Navigate to="/" replace />
        : <Outlet />;
}
