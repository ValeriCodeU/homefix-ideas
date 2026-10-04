import { startTransition, useContext, useEffect, useOptimistic, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import Swal from 'sweetalert2'

import * as ideaService from '../../services/ideaService.js'
import * as commentService from '../../services/commentService.js'
import AuthContext from '../../contexts/AuthContext.jsx'
import IdeaCommentCreate from '../idea-comment-create/IdeaCommentCreate.jsx'
import IdeaCommentList from '../idea-comment-list/IdeaCommentList.jsx'
import { categoryOptions, difficultyOptions, getOptionLabel } from '../../utils/ideaOptions.js'

const hasValue = (value) =>
    value !== undefined && value !== null && value !== '';

export default function IdeaDetails() {
    const { ideaId } = useParams();

    const { user, isAuthenticated } = useContext(AuthContext);
    const accessToken = user?.accessToken;

    const [idea, setIdea] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const [comments, setComments] = useState([]);
    const [isCommentsLoading, setIsCommentsLoading] = useState(true);
    const [commentsError, setCommentsError] = useState('');

    const [optimisticComments, addOptimisticComment] = useOptimistic(
        comments,
        (state, newComment) => [newComment, ...state]
    );

    const navigate = useNavigate();

    const isOwner = user && idea && user._id === idea._ownerId;

    useEffect(() => {
        let ignore = false;

        ideaService.getById(ideaId)
            .then((result) => {
                if (ignore) return;

                if (result && result._id) {
                    setIdea(result);
                } else {
                    setError('Идеята не съществува или не може да бъде заредена.');
                }
            })
            .catch(() => {
                if (!ignore) {
                    setError('Идеята не съществува или не може да бъде заредена.');
                }
            })
            .finally(() => {
                if (!ignore) {
                    setIsLoading(false);
                }
            })

        return () => {
            ignore = true;
        };
    }, [ideaId])

    useEffect(() => {
        let ignore = false;

        commentService.getByIdeaId(ideaId)
            .then((result) => {
                if (ignore) return;

                setComments(result);
            })
            .catch(() => {
                if (!ignore) {
                    setCommentsError('Коментарите не могат да бъдат заредени в момента.');
                }
            })
            .finally(() => {
                if (!ignore) {
                    setIsCommentsLoading(false);
                }
            })

        return () => {
            ignore = true;
        };
    }, [ideaId])

    const createCommentHandler = async (text) => {
        const author = { _id: user._id, email: user.email };

        addOptimisticComment({
            _id: `pending-${Date.now()}`,
            _ownerId: user._id,
            text,
            author,
            isPending: true,
        });

        try {
            const createdComment = await commentService.create(ideaId, text, accessToken);

            startTransition(() => {
                setComments((state) => [{ ...createdComment, author }, ...state]);
            });

            return true;
        } catch (err) {
            console.error('Create comment error:', err);

            Swal.fire({
                title: '❌ Грешка!',
                text: 'Коментарът не може да бъде публикуван. Опитайте отново.',
            });

            return false;
        }
    };

    const canShowComments = !isCommentsLoading && !commentsError;

    const deleteIdeaHandler = async () => {
        const confirmed = await Swal.fire({
            title: 'Сигурни ли сте?',
            text: `Тази идея ще бъде изтрита завинаги: ${idea.title}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Да, изтрий',
            cancelButtonText: 'Отказ'
        });

        if (confirmed.isConfirmed) {
            try {
                await ideaService.remove(ideaId, accessToken);

                Swal.fire({
                    title: '✅ Успех!',
                    text: `„${idea.title}“ беше изтрита успешно.`,
                });

                navigate('/ideas');
            } catch (err) {
                console.error('Delete idea error:', err);

                Swal.fire({
                    title: '❌ Грешка!',
                    text: 'Идеята не може да бъде изтрита. Опитайте отново.',
                });
            }
        }
    };

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
                <>
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
                                                {getOptionLabel(categoryOptions, idea.category)}
                                            </span>
                                        )}
                                        {hasValue(idea.difficulty) && (
                                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                                                {getOptionLabel(difficultyOptions, idea.difficulty)}
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

                        {isOwner && (
                            <div className="flex flex-col gap-3 border-t border-slate-200 p-6 sm:flex-row sm:p-8">
                                <Link
                                    to={`/ideas/${ideaId}/edit`}
                                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                >
                                    Редактирай
                                </Link>
                                <button
                                    type="button"
                                    onClick={deleteIdeaHandler}
                                    className="rounded-lg border border-red-600 px-5 py-2.5 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                >
                                    Изтрий
                                </button>
                            </div>
                        )}
                    </article>

                    <section
                        aria-labelledby="comments-heading"
                        className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                    >
                        <div className="flex items-center gap-2">
                            <h2 id="comments-heading" className="text-lg font-semibold text-slate-900">Коментари</h2>
                            {canShowComments && (
                                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                                    {optimisticComments.length}
                                </span>
                            )}
                        </div>

                        {isCommentsLoading && (
                            <p className="text-slate-600">Зареждане на коментарите…</p>
                        )}

                        {!isCommentsLoading && commentsError && (
                            <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                                {commentsError}
                            </p>
                        )}

                        {canShowComments && isAuthenticated && (
                            <IdeaCommentCreate onCreate={createCommentHandler} />
                        )}

                        {canShowComments && !isAuthenticated && (
                            <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
                                <Link
                                    to="/login"
                                    className="font-medium text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                >
                                    Влезте в профила си
                                </Link>
                                , за да коментирате.
                            </p>
                        )}

                        {canShowComments && (
                            <IdeaCommentList comments={optimisticComments} ideaOwnerId={idea._ownerId} />
                        )}
                    </section>
                </>
            )}
        </div>

    )
}
