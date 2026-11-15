import { Link } from 'react-router';

import Logo from '../logo/Logo.jsx';

const footerLinkClass = 'rounded text-brand-100 underline-offset-4 transition-colors hover:text-white hover:underline';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="on-dark bg-brand-900">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-start md:justify-between">
                <div className="space-y-3">
                    <Logo className="text-white" />
                    <p className="max-w-md text-sm text-brand-200">
                        Практични идеи за дома и ремонти по свой вкус, споделени от общността.
                    </p>
                </div>

                <nav aria-label="Навигация в долната част" className="md:shrink-0">
                    <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                        <li>
                            <Link to="/" className={footerLinkClass}>Начало</Link>
                        </li>
                        <li>
                            <Link to="/ideas" className={footerLinkClass}>Идеи</Link>
                        </li>
                        <li>
                            <Link to="/ideas/create" className={footerLinkClass}>Добави идея</Link>
                        </li>
                        <li>
                            <a
                                href="https://github.com/ValeriCodeU/homefix-ideas"
                                target="_blank"
                                rel="noreferrer"
                                className={footerLinkClass}
                            >
                                Код в GitHub
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="border-t border-white/10">
                <p className="mx-auto w-full max-w-6xl px-4 py-4 text-sm text-brand-200">
                    &copy; {currentYear} HomeFix Ideas. Курсов проект за SoftUni.
                </p>
            </div>
        </footer>
    );
}
