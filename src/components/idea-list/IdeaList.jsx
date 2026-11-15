import EmptyState from '../empty-state/EmptyState.jsx';
import IdeaCard from '../idea-card/IdeaCard.jsx';
import SkeletonCard from '../skeleton-card/SkeletonCard.jsx';

export default function IdeaList({
    ideas,
    isLoading,
    error,
    loadingText = 'Зареждане на идеите…',
    skeletonCount = 3,
    emptyIcon,
    emptyMessage,
    emptyLinkTo,
    emptyLinkLabel,
}) {

    if (isLoading) {
        return (
            <div className="space-y-4">
                <p className="text-stone-600">{loadingText}</p>
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
            <p className="alert-error">
                {error}
            </p>
        );
    }

    if (ideas.length === 0) {
        return (
            <EmptyState
                icon={emptyIcon}
                message={emptyMessage}
                linkTo={emptyLinkTo}
                linkLabel={emptyLinkLabel}
            />
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
