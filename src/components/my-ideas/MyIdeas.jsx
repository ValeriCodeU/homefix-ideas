import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';

import * as ideaService from '../../services/ideaService.js';
import AuthContext from '../../contexts/AuthContext.jsx';
import IdeaCard from '../idea-card/IdeaCard.jsx';
import SkeletonCard from '../skeleton-card/SkeletonCard.jsx';
import { getDisplayName } from '../../utils/userDisplay.js';

const getIdeasLabel = (count) => {
    if (count === 1) {
        return '1 публикувана идея';
    }

    return `${count} публикувани идеи`;
};

export default function MyIdeas() {

    const { user } = useContext(AuthContext);
    const userId = user._id;

    const [ideas, setIdeas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let ignore = false;

        ideaService.getByOwnerId(userId)
            .then((result) => {
                if (ignore) return;

                setIdeas(result);
            })
            .catch(() => {
                if (!ignore) {
                    setError('Вашите идеи не могат да бъдат заредени. Опитайте отново по-късно.');
                }
            })
            .finally(() => {
                if (!ignore) {
                    setIsLoading(false);
                }
            });

        return () => {
            ignore = true;
        };
    }, [userId]);

    const displayName = getDisplayName(user.email);

    return (
        <section className="space-y-6">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold text-slate-900">Моите идеи</h1>
                <p className="text-slate-600">Идеите, които сте споделили с общността.</p>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <span
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xl font-semibold text-blue-700"
                    aria-hidden="true"
                >
                    {displayName.charAt(0).toUpperCase()}
                </span>

                <div className="min-w-0">
                    <p className="truncate text-lg font-semibold text-slate-900">{displayName}</p>
                    <p className="break-all text-sm text-slate-600">{user.email}</p>
                    {!isLoading && !error && (
                        <p className="mt-1 text-sm font-medium text-slate-700">{getIdeasLabel(ideas.length)}</p>
                    )}
                </div>
            </div>

            {isLoading && (
                <div className="space-y-4">
                    <p className="text-slate-600">Зареждане на идеите ви…</p>
                    <div className="grid animate-pulse gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 3 }).map((item, index) => (
                            <SkeletonCard key={index} />
                        ))}
                    </div>
                </div>
            )}

            {!isLoading && error && (
                <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                    {error}
                </p>
            )}

            {!isLoading && !error && ideas.length === 0 && (
                <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
                    <p className="text-slate-600">Все още нямате публикувани идеи.</p>
                    <Link
                        to="/ideas/create"
                        className="mt-4 inline-block rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        Добави първата си идея
                    </Link>
                </div>
            )}

            {!isLoading && !error && ideas.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {ideas.map((idea) => (
                        <IdeaCard key={idea._id} {...idea} />
                    ))}
                </div>
            )}
        </section>
    );
}
