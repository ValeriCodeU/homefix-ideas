import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';

import * as ideaService from '../../services/ideaService.js';
import IdeaCard from '../idea-card/IdeaCard.jsx';
import SkeletonCard from '../skeleton-card/SkeletonCard.jsx';
import { categoryOptions } from '../../utils/ideaOptions.js';

const loadIdeas = (category) => {
    if (category) {
        return ideaService.getByCategory(category);
    }

    return ideaService.getAll();
};

export default function IdeasCatalog() {

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category') ?? '';
    const selectedCategory = categoryOptions.find((option) => option.value === category);
    const isUnknownCategory = category !== '' && selectedCategory === undefined;

    const [ideas, setIdeas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [prevCategory, setPrevCategory] = useState(category);

    // Каталогът остава на екрана, когато се смени само категорията в URL
    // Затова при нова категория връщаме състоянието "зареждане" още по време на рендера
    if (category !== prevCategory) {
        setPrevCategory(category);
        setIsLoading(true);
        setError('');
    }

    useEffect(() => {
        if (isUnknownCategory) {
            return;
        }

        let ignore = false;

        loadIdeas(category)
            .then((result) => {
                if (ignore) return;
                const sorted = [...result].sort((a, b) => b._createdOn - a._createdOn);
                setIdeas(sorted);
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
    }, [category, isUnknownCategory]);

    if (isUnknownCategory) {
        return (
            <section className="space-y-6">
                <h1 className="text-3xl font-bold text-slate-900">Идеи</h1>
                <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
                    <p className="text-slate-600">Такава категория не съществува.</p>
                    <Link
                        to="/ideas"
                        className="mt-4 inline-block rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        Към всички идеи
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-2">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold text-slate-900">Идеи</h1>
                    {!selectedCategory && (
                        <p className="text-slate-600">
                            Разгледайте всички практични идеи, споделени от общността.
                        </p>
                    )}
                    {selectedCategory && (
                        <p className="text-slate-600">
                            Идеи от категория „{selectedCategory.label}“.{' '}
                            <Link
                                to="/ideas"
                                className="font-medium text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                Покажи всички идеи
                            </Link>
                        </p>
                    )}
                </div>

                {!isLoading && !error && ideas.length > 0 && (
                    <span className="text-sm font-medium text-slate-500">
                        {ideas.length} {ideas.length === 1 ? 'идея' : 'идеи'}
                    </span>
                )}
            </div>

            {isLoading && (
                <div className="space-y-4">
                    <p className="text-slate-600">Зареждане на идеите…</p>
                    <div className="grid animate-pulse gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((item, index) => (
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
                    {!selectedCategory && (
                        <p className="text-slate-600">Все още няма добавени идеи.</p>
                    )}
                    {selectedCategory && (
                        <p className="text-slate-600">
                            В категория „{selectedCategory.label}“ все още няма идеи.
                        </p>
                    )}
                    <Link
                        to="/ideas/create"
                        className="mt-4 inline-block rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        Сподели първата идея
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
