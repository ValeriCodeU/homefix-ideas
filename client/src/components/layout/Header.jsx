import { NavLink } from 'react-router'
import { useContext } from 'react'
import AuthContext from '../../contexts/AuthContext.jsx'
import UserMenu from './UserMenu.jsx'
const navLinks = [
    { to: '/', label: 'Начало', end: true },
    { to: '/ideas', label: 'Идеи', end: true },
    { to: '/ideas/create', label: 'Добави идея', privateOnly: true },
    { to: '/my-ideas', label: 'Моите идеи', privateOnly: true },
    { to: '/login', label: 'Вход', guestOnly: true },
    { to: '/register', label: 'Регистрация', guestOnly: true },
]

const linkClass = ({ isActive }) =>
    [
        'block rounded px-3 py-2 text-sm font-medium transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600',
        isActive
            ? 'bg-blue-600 text-white'
            : 'text-slate-700 hover:bg-slate-200 hover:text-slate-900',
    ].join(' ')

export default function Header() {

    const { isAuthenticated, user, logoutHandler } = useContext(AuthContext);

    const visibleLinks = navLinks.filter((link) => {
        if (link.guestOnly) return !isAuthenticated;
        if (link.privateOnly) return isAuthenticated;
        return true;
    });

    return (
        <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4">
                <NavLink to="/" className="text-xl font-bold text-blue-600">
                    HomeFix Ideas
                </NavLink>

                <nav aria-label="Основна навигация" className="order-last w-full md:order-none md:w-auto">
                    <ul className="flex flex-wrap items-center gap-1">
                        {visibleLinks.map(({ to, label, end }) => (
                            <li key={to}>
                                <NavLink to={to} end={end} className={linkClass}>
                                    {label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                {isAuthenticated && (
                    <UserMenu email={user.email} onLogout={logoutHandler} />
                )}
            </div>
        </header>
    )
}
