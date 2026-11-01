import { Link } from 'react-router';

import IdeaCard from '../idea-card/IdeaCard.jsx';
import SkeletonCard from '../skeleton-card/SkeletonCard.jsx';

export default function IdeaList({
    ideas,
    isLoading,
    error,
    loadingText = 'Зареждане на идеите…',
    skeletonCount = 3,
    emptyMessage,
    emptyLinkTo,
    emptyLinkLabel,
}) {

    if (isLoading) {
        return (
            <div className="space-y-4">
                <p className="text-slate-600">{loadingText}</p>
                <div className="grid animate-pulse gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: skeletonCount }).map((item, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                {error}
            </p>
        );
    }

    if (ideas.length === 0) {
        return (
            <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
                <p className="text-slate-600">{emptyMessage}</p>
                {emptyLinkTo && (
                    <Link
                        to={emptyLinkTo}
                        className="mt-4 inline-block rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        {emptyLinkLabel}
                    </Link>
                )}
            </div>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ideas.map((idea) => (
                <IdeaCard key={idea._id} {...idea} />
            ))}
        </div>
    );
}
