import { Link } from 'react-router'

export default function IdeaCard({
    _id,
    title,
    category,
    difficulty,
    estimatedCost,
    description,
    imageUrl
}) {

    return (
        <article className="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
            {imageUrl
                ? (
                    <img
                        src={imageUrl}
                        alt={`Изображение към идея: ${title}`}
                        className="h-44 w-full object-cover"
                    />
                )
                : (
                    <div
                        className="flex h-44 w-full items-center justify-center bg-gradient-to-br from-blue-100 to-slate-200"
                        aria-hidden="true"
                    >
                        <span className="text-lg font-semibold text-blue-700">HomeFix Ideas</span>
                    </div>
                )
            }

            <div className="flex flex-1 flex-col gap-3 p-4">
                <div className="flex flex-wrap gap-2">
                    {category && (
                        <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                            {category}
                        </span>
                    )}
                    {difficulty && (
                        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                            {difficulty}
                        </span>
                    )}
                </div>

                <h3 className="text-lg font-semibold text-slate-900">{title}</h3>

                {description && (
                    <p className="line-clamp-3 text-sm text-slate-600">{description}</p>
                )}

                <div className="mt-auto flex items-center justify-between pt-2">
                    {/* {estimatedCost
                        ? (
                            <span className="text-sm font-medium text-slate-700">
                                Ориентировъчно: {estimatedCost}
                            </span>
                        )
                        : <span />
                    } */}
                    {estimatedCost !== undefined &&
                        estimatedCost !== null &&
                        estimatedCost !== '' && (
                            <span className="text-sm font-medium text-slate-700">
                                Ориентировъчно: {estimatedCost} €
                            </span>
                        )}

                    <Link
                        to={`/ideas/${_id}`}
                        className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        Детайли
                    </Link>
                </div>
            </div>
        </article>
    )
}
