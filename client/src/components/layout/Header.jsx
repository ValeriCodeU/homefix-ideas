import { NavLink } from 'react-router'

const navLinks = [
    { to: '/', label: 'Начало', end: true },
    { to: '/ideas', label: 'Идеи', end: true },
    { to: '/ideas/create', label: 'Добави идея' },
    { to: '/my-ideas', label: 'Моите идеи' },
    { to: '/login', label: 'Вход' },
    { to: '/register', label: 'Регистрация' },
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

    return (
        <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                <NavLink to="/" className="text-xl font-bold text-blue-600">
                    HomeFix Ideas
                </NavLink>

                <nav aria-label="Основна навигация">
                    <ul className="flex flex-wrap gap-1">
                        {navLinks.map(({ to, label, end }) => (
                            <li key={to}>
                                <NavLink to={to} end={end} className={linkClass}>
                                    {label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    )
}
