// Знакът е същият като във favicon-а (public/favicon.svg): къща с кехлибарена врата
export default function Logo({
    className = 'text-stone-900',
}) {

    return (
        <span className={`inline-flex items-center gap-2 text-xl font-extrabold tracking-tight ${className}`}>
            <svg className="h-8 w-8 shrink-0" viewBox="0 0 32 32" aria-hidden="true">
                <rect width="32" height="32" rx="8" className="fill-brand-600" />
                <path
                    d="M7.5 15.2 16 8l8.5 7.2V22a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                />
                <rect x="13.4" y="17" width="5.2" height="7" rx="1" className="fill-accent-400" />
            </svg>
            HomeFix Ideas
        </span>
    );
}
