import { NavLink } from 'react-router'
import { useContext } from 'react'
import AuthContext from '../../contexts/AuthContext.jsx'
import { getDisplayName } from '../../utils/userDisplay.js'
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

    const displayName = getDisplayName(user?.email); //помощна променлива за показване на името на потребителя

    return (
        <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
                <NavLink to="/" className="text-xl font-bold text-blue-600">
                    HomeFix Ideas
                </NavLink>

                <nav aria-label="Основна навигация">
                    <ul className="flex flex-wrap items-center gap-1">
                        {visibleLinks.map(({ to, label, end }) => (
                            <li key={to}>
                                <NavLink to={to} end={end} className={linkClass}>
                                    {label}
                                </NavLink>
                            </li>
                        ))}
                        {isAuthenticated && (
                            <>
                                <li className="flex items-center gap-2 px-2 text-sm text-slate-600" title={user.email}>
                                    <span
                                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700"
                                        aria-hidden="true"
                                    >
                                        {displayName.charAt(0).toUpperCase()}
                                    </span>
                                    <span className="hidden lg:inline">Добре дошли,</span>
                                    <span className="max-w-24 truncate font-semibold text-slate-900 lg:max-w-48">
                                        {displayName}
                                    </span>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        onClick={logoutHandler}
                                        className="block rounded px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                    >
                                        Изход
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    )
}
