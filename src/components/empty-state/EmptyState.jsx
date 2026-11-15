import { Link } from 'react-router';

import Icon from '../icon/Icon.jsx';

// Празно състояние: икона, съобщение и по избор бутон към следващата стъпка
export default function EmptyState({
    icon = 'idea',
    message,
    linkTo,
    linkLabel,
}) {

    return (
        <div className="card flex flex-col items-center gap-4 p-8 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                <Icon name={icon} className="h-7 w-7" />
            </span>

            <p className="max-w-md text-stone-600">{message}</p>

            {linkTo && (
                <Link to={linkTo} className="btn btn-lg btn-primary">
                    {linkLabel}
                </Link>
            )}
        </div>
    );
}
