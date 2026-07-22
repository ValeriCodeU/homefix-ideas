import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'

import * as ideaService from '../../services/ideaService.js'

const hasValue = (value) =>
    value !== undefined && value !== null && value !== ''

export default function IdeaDetails() {
    const { ideaId } = useParams()

    const [idea, setIdea] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        let ignore = false

        ideaService.getById(ideaId)
            .then((result) => {
                if (ignore) return

                if (result && result._id) {
                    setIdea(result)
                } else {
                    setError('Идеята не съществува или не може да бъде заредена.')
                }
            })
            .catch(() => {
                if (!ignore) {
                    setError('Идеята не съществува или не може да бъде заредена.')
                }
            })
            .finally(() => {
                if (!ignore) {
                    setIsLoading(false)
                }
            })

        return () => {
            ignore = true
        }
    }, [ideaId])

    return (
        <div className="space-y-6">
            <Link
                to="/ideas"
                className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
                &larr; Назад към идеите
            </Link>

            {isLoading && (
                <p className="text-slate-600">Зареждане на идеята…</p>
            )}

            {!isLoading && error && (
                <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                    {error}
                </p>
            )}

            {!isLoading && !error && idea && (
                <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="grid gap-0 lg:grid-cols-2">
                        {idea.imageUrl
                            ? (
                                <img
                                    src={idea.imageUrl}
                                    alt={`Изображение към идея: ${idea.title}`}
                                    className="h-64 w-full object-cover lg:h-full"
                                />
                            )
                            : (
                                <div
                                    className="flex h-64 w-full items-center justify-center bg-gradient-to-br from-blue-100 to-slate-200 lg:h-full"
                                    aria-hidden="true"
                                >
                                    <span className="text-2xl font-semibold text-blue-700">HomeFix Ideas</span>
                                </div>
                            )
                        }

                        <div className="flex flex-col gap-4 p-6 sm:p-8">
                            {(hasValue(idea.category) || hasValue(idea.difficulty)) && (
                                <div className="flex flex-wrap gap-2">
                                    {hasValue(idea.category) && (
                                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                                            {idea.category}
                                        </span>
                                    )}
                                    {hasValue(idea.difficulty) && (
                                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                                            {idea.difficulty}
                                        </span>
                                    )}
                                </div>
                            )}

                            <h1 className="text-3xl font-bold text-slate-900">{idea.title}</h1>

                            <dl className="flex flex-col gap-3">
                                {hasValue(idea.estimatedCost) && (
                                    <div>
                                        <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                            Ориентировъчна цена
                                        </dt>
                                        <dd className="text-lg font-semibold text-slate-900">
                                            {idea.estimatedCost} €
                                        </dd>
                                    </div>
                                )}

                                {hasValue(idea.materials) && (
                                    <div>
                                        <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                            Материали
                                        </dt>
                                        <dd className="text-slate-700">{idea.materials}</dd>
                                    </div>
                                )}
                            </dl>
                        </div>
                    </div>

                    {hasValue(idea.description) && (
                        <div className="border-t border-slate-200 p-6 sm:p-8">
                            <h2 className="mb-2 text-lg font-semibold text-slate-900">Описание</h2>
                            <p className="whitespace-pre-line leading-relaxed text-slate-700">
                                {idea.description}
                            </p>
                        </div>
                    )}
                </article>
            )}
        </div>
    )
}
