import { Link } from 'react-router';

import Icon from '../icon/Icon.jsx';

export default function NotFound() {

    return (
        <section className="mx-auto flex max-w-xl flex-col items-center gap-4 py-8 text-center sm:py-16">
            <p className="text-7xl font-extrabold tracking-tight text-brand-600 sm:text-8xl">404</p>
            <h1 className="page-title">Страницата не е намерена</h1>
            <p className="text-stone-600">
                Търсеният адрес не съществува. Върнете се към началната страница
                или разгледайте идеите.
            </p>

            <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Link
                    to="/ideas"
                    className="btn btn-lg btn-primary"
                >
                    Към идеите
                </Link>
                <Link
                    to="/"
                    className="btn btn-lg btn-secondary"
                >
                    <Icon name="home" />
                    Към началото
                </Link>
            </div>
        </section>
    );
}
