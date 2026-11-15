import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import * as ideaService from '../../services/ideaService.js';
import * as likeService from '../../services/likeService.js';
import useIdeaFilters from '../../hooks/useIdeaFilters.js';
import EmptyState from '../empty-state/EmptyState.jsx';
import IdeaFilters from '../idea-filters/IdeaFilters.jsx';
import IdeaList from '../idea-list/IdeaList.jsx';
import Pagination from '../pagination/Pagination.jsx';
import { categoryOptions } from '../../utils/ideaOptions.js';
import { IDEAS_PER_PAGE } from '../../utils/ideaQuery.js';

const getSubtitle = (selectedCategory, search) => {
    if (search) {
        return `Резултати за „${search}“.`;
    }

    if (selectedCategory) {
        return `Идеи от категория „${selectedCategory.label}“.`;
    }

    return 'Разгледайте всички практични идеи, споделени от общността.';
};

const getEmptyMessage = (selectedCategory, search) => {
    if (search) {
        return 'Няма идеи по тези критерии.';
    }

    if (selectedCategory) {
        return `В категория „${selectedCategory.label}“ все още няма идеи.`;
    }

    return 'Все още няма добавени идеи.';
};

export default function IdeasCatalog() {

    const [ideas, setIdeas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const {
        category,
        search,
        sort,
        hasFilters,
        matchingIdeas,
        pageIdeas,
        currentPage,
        totalPages,
        filterChangeHandler,
        pageChangeHandler,
    } = useIdeaFilters(ideas);

    const selectedCategory = categoryOptions.find((option) => option.value === category);
    const isUnknownCategory = category !== '' && selectedCategory === undefined;

    useEffect(() => {
        let ignore = false;

        likeService.withLikesCount(ideaService.getAll())
            .then((result) => {
                if (ignore) return;

                setIdeas(result);
            })
            .catch(() => {
                if (!ignore) {
                    setError('В момента идеите не могат да бъдат заредени. Опитайте отново по-късно.');
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
    }, []);

    if (isUnknownCategory) {
        return (
            <section className="space-y-6">
                <h1 className="page-title">Идеи</h1>
                <EmptyState
                    icon="search"
                    message="Такава категория не съществува."
                    linkTo="/ideas"
                    linkLabel="Към всички идеи"
                />
            </section>
        );
    }

    return (
        <section className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-2">
                <div className="min-w-0 space-y-1">
                    <h1 className="page-title">Идеи</h1>
                    <p className="break-words text-stone-600">
                        {getSubtitle(selectedCategory, search)}{' '}
                        {hasFilters && (
                            <Link
                                to="/ideas"
                                className="link rounded"
                            >
                                Изчисти филтрите
                            </Link>
                        )}
                    </p>
                </div>

                {!isLoading && !error && matchingIdeas.length > 0 && (
                    <span className="text-sm font-semibold text-stone-600">
                        {matchingIdeas.length} {matchingIdeas.length === 1 ? 'идея' : 'идеи'}
                    </span>
                )}
            </div>

            <IdeaFilters
                search={search}
                category={category}
                sort={sort}
                onFilterChange={filterChangeHandler}
            />

            <IdeaList
                ideas={pageIdeas}
                isLoading={isLoading}
                error={error}
                skeletonCount={IDEAS_PER_PAGE}
                emptyIcon={search ? 'search' : 'idea'}
                emptyMessage={getEmptyMessage(selectedCategory, search)}
                emptyLinkTo={search ? '/ideas' : '/ideas/create'}
                emptyLinkLabel={search ? 'Изчисти филтрите' : 'Сподели първата идея'}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={pageChangeHandler}
            />
        </section>
    );
}
