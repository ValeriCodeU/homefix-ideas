import { useContext, useEffect, useState } from 'react';

import * as ideaService from '../../services/ideaService.js';
import * as likeService from '../../services/likeService.js';
import AuthContext from '../../contexts/AuthContext.jsx';
import IdeaList from '../idea-list/IdeaList.jsx';

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

            <IdeaList
                ideas={ideas}
                isLoading={isLoading}
                error={error}
                loadingText="Зареждане на любимите ви идеи…"
                emptyMessage="Все още нямате любими идеи. Натиснете „Харесай“ на страницата на идея и тя ще се появи тук."
                emptyLinkTo="/ideas"
                emptyLinkLabel="Разгледай идеите"
            />
        </section>
    );
}
