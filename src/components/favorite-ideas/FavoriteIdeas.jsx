import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';

import * as ideaService from '../../services/ideaService.js';
import * as likeService from '../../services/likeService.js';
import AuthContext from '../../contexts/AuthContext.jsx';
import useIdeaFilters from '../../hooks/useIdeaFilters.js';
import IdeaFilters from '../idea-filters/IdeaFilters.jsx';
import IdeaList from '../idea-list/IdeaList.jsx';
import Pagination from '../pagination/Pagination.jsx';
import { favoriteSortOptions } from '../../utils/ideaOptions.js';

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
    const ideas = await likeService.withLikesCount(ideaService.getByIds(ideaIds));

    // показваме последно харесаните първи
    return [...ideas].sort((a, b) => ideaIds.indexOf(a._id) - ideaIds.indexOf(b._id));
};

export default function FavoriteIdeas() {

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
        matchingIdeas,
        pageIdeas,
        currentPage,
        totalPages,
        filterChangeHandler,
        pageChangeHandler,
    } = useIdeaFilters(ideas, favoriteSortOptions);

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
                    <p className="text-slate-600">
                        Идеите, които сте харесали.{' '}
                        {hasFilters && (
                            <Link
                                to="/favorites"
                                className="font-medium text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                Изчисти филтрите
                            </Link>
                        )}
                    </p>
                </div>

                {!isLoading && !error && matchingIdeas.length > 0 && (
                    <span className="text-sm font-medium text-slate-500">
                        {getFavoritesLabel(matchingIdeas.length)}
                    </span>
                )}
            </div>

            {showFilters && (
                <IdeaFilters
                    search={search}
                    category={category}
                    sort={sort}
                    sortOptions={favoriteSortOptions}
                    onFilterChange={filterChangeHandler}
                />
            )}

            <IdeaList
                ideas={pageIdeas}
                isLoading={isLoading}
                error={error}
                loadingText="Зареждане на любимите ви идеи…"
                emptyMessage={hasFilters
                    ? 'Няма идеи по тези критерии.'
                    : 'Все още нямате любими идеи. Натиснете „Харесай“ на страницата на идея и тя ще се появи тук.'}
                emptyLinkTo={hasFilters ? '/favorites' : '/ideas'}
                emptyLinkLabel={hasFilters ? 'Изчисти филтрите' : 'Разгледай идеите'}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={pageChangeHandler}
            />
        </section>
    );
}
