import { NavLink } from 'react-router';
import { useContext, useState } from 'react';
import AuthContext from '../../contexts/AuthContext.jsx';
import Icon from '../icon/Icon.jsx';
import Logo from '../logo/Logo.jsx';
import UserMenu from './UserMenu.jsx';

// variant превръща линка в бутон: accent за „Добави идея“, primary за „Регистрация“
const navLinks = [
    { to: '/', label: 'Начало', end: true },
    { to: '/ideas', label: 'Идеи', end: true },
    { to: '/my-ideas', label: 'Моите идеи', privateOnly: true },
    { to: '/favorites', label: 'Любими', privateOnly: true },
    { to: '/ideas/create', label: 'Добави идея', privateOnly: true, variant: 'accent', icon: 'plus' },
    { to: '/login', label: 'Вход', guestOnly: true },
    { to: '/register', label: 'Регистрация', guestOnly: true, variant: 'primary' },
];

const textLinkClass = 'block rounded-lg px-3 py-2.5 text-base font-semibold transition-colors lg:py-2 lg:text-sm';
const buttonLinkClass = 'w-full px-4 py-2.5 lg:w-auto lg:py-2';

const getLinkClass = (variant, isActive) => {
    if (variant === 'accent') {
        return `btn btn-accent ${buttonLinkClass} ${isActive ? 'bg-accent-500' : ''}`;
    }

    if (variant === 'primary') {
        return `btn btn-primary ${buttonLinkClass} ${isActive ? 'bg-brand-800' : ''}`;
    }

    if (isActive) {
        return `${textLinkClass} bg-brand-100 text-brand-900`;
    }

    return `${textLinkClass} text-stone-700 hover:bg-stone-100 hover:text-stone-900`;
};

export default function Header() {

    const { isAuthenticated, user, logoutHandler } = useContext(AuthContext);

    // Под 1024px (lg) линковете са скрити зад бутон (хамбургер меню). От lg нагоре са винаги видими
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const visibleLinks = navLinks.filter((link) => {
        if (link.guestOnly) return !isAuthenticated;
        if (link.privateOnly) return isAuthenticated;
        return true;
    });

    const toggleMenuHandler = () => {
        setIsMenuOpen((state) => !state);
    };

    // Менюто се затваря при избор на линк, иначе остава отворено върху новата страница
    const closeMenuHandler = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="border-b border-stone-200 bg-white">
            <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-2 gap-y-3 px-4 py-3">
                <NavLink
                    to="/"
                    onClick={closeMenuHandler}
                    className="rounded-lg"
                    aria-label="HomeFix Ideas, начална страница"
                >
                    <Logo />
                </NavLink>

                <button
                    type="button"
                    onClick={toggleMenuHandler}
                    aria-expanded={isMenuOpen}
                    aria-controls="main-nav"
                    aria-label={isMenuOpen ? 'Затвори менюто' : 'Отвори менюто'}
                    className="order-1 ml-auto rounded-lg p-2 text-stone-700 transition-colors hover:bg-stone-100 lg:hidden"
                >
                    <Icon name={isMenuOpen ? 'close' : 'menu'} className="h-6 w-6" />
                </button>

                <nav
                    id="main-nav"
                    aria-label="Основна навигация"
                    className={`${isMenuOpen ? 'block' : 'hidden'} order-3 w-full border-t border-stone-200 pt-3 lg:order-1 lg:ml-auto lg:block lg:w-auto lg:border-0 lg:pt-0`}
                >
                    <ul className="flex flex-col gap-1 lg:flex-row lg:items-center">
                        {visibleLinks.map(({ to, label, end, variant, icon }) => (
                            <li key={to} className={variant ? 'mt-2 lg:ml-1 lg:mt-0' : ''}>
                                <NavLink
                                    to={to}
                                    end={end}
                                    onClick={closeMenuHandler}
                                    className={({ isActive }) => getLinkClass(variant, isActive)}
                                >
                                    {icon && <Icon name={icon} className="h-4 w-4" />}
                                    {label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                {isAuthenticated && (
                    <div className="order-2">
                        <UserMenu email={user.email} onLogout={logoutHandler} />
                    </div>
                )}
            </div>
        </header>
    );
}
