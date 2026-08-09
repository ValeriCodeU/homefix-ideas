import { NavLink } from 'react-router'
import { useContext } from 'react'
import AuthContext from '../../contexts/AuthContext.jsx'
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
        'rounded px-3 py-2 text-sm font-medium transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600',
        isActive
            ? 'bg-blue-600 text-white'
            : 'text-slate-700 hover:bg-slate-200 hover:text-slate-900',
    ].join(' ')

export default function Header() {

    const { isAuthenticated, logoutHandler } = useContext(AuthContext);

    const visibleLinks = navLinks.filter((link) => {
        if (link.guestOnly) return !isAuthenticated;
        if (link.privateOnly) return isAuthenticated;
        return true;
    });

    return (
        <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                <NavLink to="/" className="text-xl font-bold text-blue-600">
                    HomeFix Ideas
                </NavLink>

                <nav aria-label="Основна навигация">
                    <ul className="flex flex-wrap gap-1">
                        {visibleLinks.map(({ to, label, end }) => (
                            <li key={to}>
                                <NavLink to={to} end={end} className={linkClass}>
                                    {label}
                                </NavLink>
                            </li>
                        ))}
                        {isAuthenticated && (
                            <li>
                                <button
                                    type="button"
                                    onClick={logoutHandler}
                                    className="rounded px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                >
                                    Изход
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    )
}
