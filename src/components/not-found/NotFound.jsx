import { Link } from 'react-router';

export default function NotFound() {

    return (
        <section className="space-y-3">
            <h1 className="text-3xl font-bold text-slate-900">Страницата не е намерена</h1>
            <p className="text-slate-600">
                Търсеният адрес не съществува. Използвайте навигацията, за да се
                върнете към идеите.
            </p>
            <Link
                to="/ideas"
                className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
                Към идеите
            </Link>
        </section>
    );
}
