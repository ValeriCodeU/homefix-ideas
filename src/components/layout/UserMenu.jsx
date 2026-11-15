import { useEffect, useRef, useState } from 'react';

import { getDisplayName } from '../../utils/userDisplay.js';

export default function UserMenu({
    email,
    onLogout,
}) {

    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const displayName = getDisplayName(email); //помощна променлива за показване на името на потребителя

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const clickOutsideHandler = (event) => {
            if (!menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        const keyDownHandler = (event) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        document.addEventListener('pointerdown', clickOutsideHandler);
        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('pointerdown', clickOutsideHandler);
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [isOpen]);

    const toggleMenuHandler = () => {
        setIsOpen((state) => !state);
    };

    const logoutClickHandler = () => {
        setIsOpen(false);
        onLogout();
    };

    return (
        <div ref={menuRef} className="relative">
            <button
                type="button"
                onClick={toggleMenuHandler}
                aria-expanded={isOpen}
                aria-controls="user-menu"
                aria-label={`Профил: ${displayName}`}
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-stone-600 transition-colors hover:bg-stone-100"
            >
                <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700"
                    aria-hidden="true"
                >
                    {displayName.charAt(0).toUpperCase()}
                </span>
                <span className="hidden lg:inline">Добре дошли,</span>
                {/* На тесен екран остава само аватарът. Имейлът се вижда в падащото меню */}
                <span className="hidden max-w-24 truncate font-semibold text-stone-900 sm:block lg:max-w-48">
                    {displayName}
                </span>
                <svg
                    className={`h-4 w-4 shrink-0 text-stone-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {isOpen && (
                <div
                    id="user-menu"
                    className="absolute right-0 top-full z-10 mt-2 w-56 rounded-xl border border-stone-200 bg-white py-1 shadow-lg"
                >
                    <p className="border-b border-stone-200 px-4 py-2 text-sm text-stone-600">
                        Влезли сте като
                        <span className="block break-all font-semibold text-stone-900">{email}</span>
                    </p>
                    <button
                        type="button"
                        onClick={logoutClickHandler}
                        className="block w-full px-4 py-2 text-left text-sm font-medium text-stone-700 transition-colors hover:bg-stone-100 hover:text-stone-900 focus-visible:-outline-offset-2"
                    >
                        Изход
                    </button>
                </div>
            )}
        </div>
    );
}
