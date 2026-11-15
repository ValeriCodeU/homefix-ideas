import { Link } from 'react-router';

export default function NotFound() {

    return (
        <section className="space-y-3">
            <h1 className="page-title">Страницата не е намерена</h1>
            <p className="text-stone-600">
                Търсеният адрес не съществува. Използвайте навигацията, за да се
                върнете към идеите.
            </p>
            <Link
                to="/ideas"
                className="btn btn-lg btn-primary"
            >
                Към идеите
            </Link>
        </section>
    );
}
