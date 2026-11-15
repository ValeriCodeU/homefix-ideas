import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import * as ideaService from '../../services/ideaService.js';
import * as likeService from '../../services/likeService.js';
import Icon from '../icon/Icon.jsx';
import IdeaList from '../idea-list/IdeaList.jsx';
import { categoryOptions } from '../../utils/ideaOptions.js';
import heroImage from '../../assets/hero-balcony.jpg';

const params = new URLSearchParams();
params.append('sortBy', '_createdOn desc');
params.append('pageSize', '3');

const query = params.toString().replace(/\+/g, '%20');

export default function Home() {
    const [latestIdeas, setLatestIdeas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let ignore = false;

        likeService.withLikesCount(ideaService.getAll(query))
            .then((ideas) => {
                if (ignore) return;

                setLatestIdeas(ideas);
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

    return (
        <div className="space-y-14">
            <section className="on-dark grid overflow-hidden rounded-3xl bg-brand-800 lg:grid-cols-2">
                <div className="space-y-6 p-8 sm:p-12">
                    <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-accent-300 sm:text-sm">
                        <Icon name="home" className="h-4 w-4" />
                        Домашни проекти от общността
                    </p>
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                        Практични идеи за <span className="whitespace-nowrap">по-добър дом</span>
                    </h1>
                    <p className="text-lg text-brand-100">
                        HomeFix Ideas събира практични идеи за подобрения и DIY проекти у дома.
                        Разгледайте предложенията на общността или споделете своя собствена идея.
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Link to="/ideas" className="btn btn-lg btn-accent">
                            Разгледай идеите
                            <Icon name="arrowRight" />
                        </Link>
                        <Link
                            to="/ideas/create"
                            className="btn btn-lg border border-white/40 text-white hover:bg-white/10"
                        >
                            Сподели идея
                        </Link>
                    </div>
                </div>

                <div className="relative h-64 sm:h-80 lg:h-auto">
                    <img
                        src={heroImage}
                        alt="Балкон с вертикална градина от дървени летви и саксии с цветя"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </div>
            </section>

            <section className="space-y-6">
                <div className="flex flex-wrap items-end justify-between gap-2">
                    <h2 className="section-title">Последно добавени идеи</h2>
                    <Link to="/ideas" className="link inline-flex items-center gap-1 rounded text-sm">
                        Виж всички идеи
                        <Icon name="arrowRight" className="h-4 w-4" />
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
                <h2 className="section-title">Намери вдъхновение за дома</h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {categoryOptions.map((category) => (
                        <Link
                            key={category.value}
                            to={`/ideas?category=${category.value}`}
                            className="card group flex flex-col gap-3 p-4 transition hover:border-brand-200 hover:shadow-md sm:flex-row sm:items-center"
                        >
                            <span
                                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700 transition-colors group-hover:bg-brand-600 group-hover:text-white"
                                aria-hidden="true"
                            >
                                <Icon name={category.icon} className="h-6 w-6" />
                            </span>
                            <span className="font-semibold text-stone-800">{category.label}</span>
                            <Icon
                                name="arrowRight"
                                className="ml-auto hidden h-4 w-4 text-stone-400 transition group-hover:translate-x-0.5 group-hover:text-brand-700 sm:block"
                            />
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
