import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';

import * as ideaService from '../../services/ideaService.js';
import * as likeService from '../../services/likeService.js';
import AuthContext from '../../contexts/AuthContext.jsx';
import useIdeaFilters from '../../hooks/useIdeaFilters.js';
import IdeaFilters from '../idea-filters/IdeaFilters.jsx';
import IdeaList from '../idea-list/IdeaList.jsx';
import Pagination from '../pagination/Pagination.jsx';
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

    const {
        category,
        search,
        sort,
        hasFilters,
        showFilters,
        pageIdeas,
        currentPage,
        totalPages,
        filterChangeHandler,
        pageChangeHandler,
    } = useIdeaFilters(ideas);

    useEffect(() => {
        let ignore = false;

        likeService.withLikesCount(ideaService.getByOwnerId(userId))
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
                <p className="text-slate-600">
                    Идеите, които сте споделили с общността.{' '}
                    {hasFilters && (
                        <Link
                            to="/my-ideas"
                            className="font-medium text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Изчисти филтрите
                        </Link>
                    )}
                </p>
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

            {showFilters && (
                <IdeaFilters
                    search={search}
                    category={category}
                    sort={sort}
                    onFilterChange={filterChangeHandler}
                />
            )}

            <IdeaList
                ideas={pageIdeas}
                isLoading={isLoading}
                error={error}
                loadingText="Зареждане на идеите ви…"
                emptyMessage={hasFilters ? 'Няма идеи по тези критерии.' : 'Все още нямате публикувани идеи.'}
                emptyLinkTo={hasFilters ? '/my-ideas' : '/ideas/create'}
                emptyLinkLabel={hasFilters ? 'Изчисти филтрите' : 'Добави първата си идея'}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={pageChangeHandler}
            />
        </section>
    );
}
