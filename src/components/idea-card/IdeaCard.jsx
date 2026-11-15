import { Link, useLocation } from 'react-router';

import CategoryBadge from '../category-badge/CategoryBadge.jsx';
import DifficultyBadge from '../difficulty-badge/DifficultyBadge.jsx';
import HeartIcon from '../heart-icon/HeartIcon.jsx';
import Icon from '../icon/Icon.jsx';
import IdeaImage from '../idea-image/IdeaImage.jsx';

export default function IdeaCard({
    _id,
    title,
    category,
    difficulty,
    estimatedCost,
    description,
    imageUrl,
    likesCount
}) {

    // useLocation hook
    // Подаваме адреса на текущия списък с филтрите му, за да може линкът в детайлите да върне към него
    const { pathname, search } = useLocation();

    const hasCost = estimatedCost !== undefined && estimatedCost !== null && estimatedCost !== '';

    return (
        <article className="card group relative flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
            <div className="relative aspect-4/3 overflow-hidden">
                <IdeaImage
                    imageUrl={imageUrl}
                    title={title}
                    className="h-full w-full transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none"
                />

                {category && (
                    <CategoryBadge
                        category={category}
                        className="absolute left-3 top-3 bg-white/95 py-1 text-stone-800 shadow-sm"
                    />
                )}

                <span className="badge absolute right-3 top-3 bg-white/95 py-1 text-stone-800 shadow-sm">
                    <span className="text-red-600">
                        <HeartIcon isFilled={likesCount > 0} className="h-4 w-4" />
                    </span>
                    <span className="sr-only">Харесвания:</span>
                    {likesCount}
                </span>
            </div>

            <div className="flex flex-1 flex-col gap-2 p-4">
                <h3 className="text-lg font-bold leading-snug text-stone-900">{title}</h3>

                {description && (
                    <p className="line-clamp-2 text-sm text-stone-600">{description}</p>
                )}

                <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 pt-3">
                    {difficulty && <DifficultyBadge difficulty={difficulty} />}

                    {hasCost && (
                        <span className="text-sm font-bold text-stone-900">
                            <span className="sr-only">Ориентировъчна цена:</span>
                            около {estimatedCost} €
                        </span>
                    )}

                    {/* after:inset-0 разпъва линка върху цялата карта, така че и снимката, и заглавието водят към детайлите */}
                    <Link
                        to={`/ideas/${_id}`}
                        state={{ backTo: `${pathname}${search}` }}
                        className="link ml-auto inline-flex items-center gap-1 rounded text-sm after:absolute after:inset-0"
                    >
                        Детайли
                        <Icon name="arrowRight" className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </article>
    );
}
