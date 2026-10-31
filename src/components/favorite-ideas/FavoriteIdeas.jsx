import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';

import * as ideaService from '../../services/ideaService.js';
import * as likeService from '../../services/likeService.js';
import AuthContext from '../../contexts/AuthContext.jsx';
import IdeaCard from '../idea-card/IdeaCard.jsx';
import SkeletonCard from '../skeleton-card/SkeletonCard.jsx';

const getFavoritesLabel = (count) => {
    if (count === 1) {
        return '1 любима идея';
    }

    return `${count} любими идеи`;
};

const loadFavoriteIdeas = async (userId) => {
    const likes = await likeService.getByOwnerId(userId);

    // Сървърът връща грешка за празен списък, затова без харесвания не пращаме втора заявка
    if (likes.length === 0) {
        return [];
    }

    const ideaIds = likes.map((like) => like.ideaId);
    const ideas = await ideaService.getByIds(ideaIds);

    // показваме последно харесаните първи
    return [...ideas].sort((a, b) => ideaIds.indexOf(a._id) - ideaIds.indexOf(b._id));
};

export default function FavoriteIdeas() {

    const { user } = useContext(AuthContext);
    const userId = user._id;

    const [ideas, setIdeas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let ignore = false;

        loadFavoriteIdeas(userId)
            .then((result) => {
                if (ignore) return;

                setIdeas(result);
            })
            .catch(() => {
                if (!ignore) {
                    setError('Любимите ви идеи не могат да бъдат заредени. Опитайте отново по-късно.');
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

    return (
        <section className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-2">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold text-slate-900">Любими идеи</h1>
                    <p className="text-slate-600">Идеите, които сте харесали.</p>
                </div>

                {!isLoading && !error && ideas.length > 0 && (
                    <span className="text-sm font-medium text-slate-500">
                        {getFavoritesLabel(ideas.length)}
                    </span>
                )}
            </div>

            {isLoading && (
                <div className="space-y-4">
                    <p className="text-slate-600">Зареждане на любимите ви идеи…</p>
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
                    <p className="text-slate-600">Все още нямате любими идеи.</p>
                    <p className="mt-1 text-sm text-slate-500">
                        Натиснете „Харесай“ на страницата на идея и тя ще се появи тук.
                    </p>
                    <Link
                        to="/ideas"
                        className="mt-4 inline-block rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        Разгледай идеите
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
