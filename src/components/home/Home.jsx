import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import * as ideaService from '../../services/ideaService.js';
import IdeaList from '../idea-list/IdeaList.jsx';
import { categoryOptions } from '../../utils/ideaOptions.js';

const params = new URLSearchParams();
params.append('sortBy', '_createdOn desc');
params.append('pageSize', '3');

const query = params.toString().replace(/\+/g, '%20');

export default function Home() {
    const [latestIdeas, setLatestIdeas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        ideaService.getAll(query)
            .then((ideas) => {
                //ако се ползва за тест - услугата на SoftUni Practise Server - jsonstore, която връщаше обект
                //     const ideasArray = Object.values(ideas);
                //     const sortedIdeas = ideasArray.sort((a, b) => b._createdOn - a._createdOn);
                //     const latestThreeIdeas = sortedIdeas.slice(0, 3);
                //     setLatestIdeas(latestThreeIdeas);
                // })
                //client side sorting, замененено с услуга на сървъра, която връща сортирани идеи
                // const sorted = [...ideas].sort((a, b) => b._createdOn - a._createdOn)
                // setLatestIdeas(sorted.slice(0, 3))

                setLatestIdeas(ideas);
            })
            .catch(() => {
                setError('В момента идеите не могат да бъдат заредени. Опитайте отново по-късно.');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="space-y-16">
            <section className="rounded-2xl bg-white p-8 shadow-sm sm:p-12">
                <div className="mx-auto max-w-2xl space-y-6 text-center">
                    <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
                        Практични идеи за по-добър дом
                    </h1>
                    <p className="text-lg text-slate-600">
                        HomeFix Ideas събира практични идеи за подобрения и DIY проекти у дома.
                        Разгледайте предложенията на общността или споделете своя собствена идея.
                    </p>
                    <div className="flex flex-col justify-center gap-3 sm:flex-row">
                        <Link
                            to="/ideas"
                            className="rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Разгледай идеите
                        </Link>
                        <Link
                            to="/ideas/create"
                            className="rounded-lg border border-blue-600 px-6 py-3 text-base font-semibold text-blue-700 transition-colors hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Сподели идея
                        </Link>
                    </div>
                </div>
            </section>

            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-900">Последно добавени идеи</h2>
                    <Link
                        to="/ideas"
                        className="text-sm font-medium text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        Виж всички идеи
                    </Link>
                </div>

                <IdeaList
                    ideas={latestIdeas}
                    isLoading={isLoading}
                    error={error}
                    emptyMessage="Все още няма добавени идеи. Бъдете първият, който ще сподели!"
                />
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">Намери вдъхновение за дома</h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {categoryOptions.map((category) => (
                        <Link
                            key={category.value}
                            to={`/ideas?category=${category.value}`}
                            className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition-colors hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            <span
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-base font-semibold text-blue-700"
                                aria-hidden="true"
                            >
                                {category.label.charAt(0)}
                            </span>
                            <span className="font-medium text-slate-800">{category.label}</span>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
