// Малки линейни икони като inline SVG, без външна библиотека.
// Цветът идва от цвета на текста (currentColor), а размерът от className.
const icons = {
    home: (
        <>
            <path d="M4 11.5 12 4.5l8 7V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19z" />
            <path d="M9.5 20.5v-6h5v6" />
        </>
    ),
    search: (
        <>
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4.5 4.5" />
        </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="M6 6l12 12M18 6 6 18" />,
    arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
    arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,

    // Празни състояния. Сърцето е със същата форма като в HeartIcon, който остава отделен заради запълването
    idea: (
        <>
            <path d="M8.5 14.4A6 6 0 1 1 15.5 14.4c-.6.5-1 1.3-1 2.1v1h-5v-1c0-.8-.4-1.6-1-2.1z" />
            <path d="M10 20.5h4" />
        </>
    ),
    heart: <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />,

    // Категории: името съвпада с полето icon в categoryOptions
    organization: (
        <>
            <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
            <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
            <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
            <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
        </>
    ),
    furniture: (
        <>
            <path d="M6.5 10.5v-3A2.5 2.5 0 0 1 9 5h6a2.5 2.5 0 0 1 2.5 2.5v3" />
            <path d="M4 12.5a2 2 0 0 1 4 0V15h8v-2.5a2 2 0 0 1 4 0V18H4z" />
            <path d="M6.5 18v2M17.5 18v2" />
        </>
    ),
    storage: (
        <>
            <rect x="3.5" y="4.5" width="17" height="4.5" rx="1" />
            <path d="M5 9v9a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 18V9" />
            <path d="M10 13h4" />
        </>
    ),
    renovation: (
        <>
            <rect x="3.5" y="4" width="13" height="5.5" rx="1.5" />
            <path d="M16.5 6.75H19a1.5 1.5 0 0 1 1.5 1.5v2.25A1.5 1.5 0 0 1 19 12h-7v2.5" />
            <rect x="10.5" y="14.5" width="3" height="6" rx="1" />
        </>
    ),
    outdoor: (
        <>
            <path d="M7.5 15h9l-1 5.5h-7z" />
            <path d="M12 15V9.5" />
            <path d="M12 11c0-3 2-5 5.5-5 0 3.2-2.2 5-5.5 5z" />
            <path d="M12 13c0-2.4-1.8-4-4.8-4 0 2.6 1.9 4 4.8 4z" />
        </>
    ),
    decoration: (
        <>
            <rect x="3.5" y="5" width="17" height="14" rx="2" />
            <circle cx="9" cy="10" r="1.5" />
            <path d="m4 17 4.5-4 3.5 3 3-2.5 5 4" />
        </>
    ),
};

export default function Icon({
    name,
    className = 'h-5 w-5',
}) {

    return (
        <svg
            className={`shrink-0 ${className}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            {icons[name]}
        </svg>
    );
}
