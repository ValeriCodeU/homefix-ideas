import { startTransition, useContext, useEffect, useOptimistic, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';

import * as ideaService from '../../services/ideaService.js';
import * as commentService from '../../services/commentService.js';
import AuthContext from '../../contexts/AuthContext.jsx';
import CategoryBadge from '../category-badge/CategoryBadge.jsx';
import DifficultyBadge from '../difficulty-badge/DifficultyBadge.jsx';
import Icon from '../icon/Icon.jsx';
import IdeaCommentCreate from '../idea-comment-create/IdeaCommentCreate.jsx';
import IdeaCommentList from '../idea-comment-list/IdeaCommentList.jsx';
import IdeaImage from '../idea-image/IdeaImage.jsx';
import IdeaLikes from '../idea-likes/IdeaLikes.jsx';
import { isInvalidTokenError } from '../../utils/authErrors.js';

const hasValue = (value) =>
    value !== undefined && value !== null && value !== '';

export default function IdeaDetails() {
    const { ideaId } = useParams();
    const location = useLocation();

    // Картата подава адреса на списъка през state. При директно отваряне на идеята него го няма
    const backTo = location.state?.backTo ?? '/ideas';

    const { user, isAuthenticated, sessionExpiredHandler } = useContext(AuthContext);
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
            });

        return () => {
            ignore = true;
        };
    }, [ideaId]);

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
            });

        return () => {
            ignore = true;
        };
    }, [ideaId]);

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
            if (isInvalidTokenError(err)) {
                sessionExpiredHandler();
                return false;
            }

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
                if (isInvalidTokenError(err)) {
                    sessionExpiredHandler();
                    return;
                }

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
                to={backTo}
                className="link inline-flex items-center gap-1 rounded text-sm"
            >
                <Icon name="arrowLeft" className="h-4 w-4" />
                Назад
            </Link>

            {isLoading && (
                <p className="text-stone-600">Зареждане на идеята…</p>
            )}

            {!isLoading && error && (
                <p className="alert-error">
                    {error}
                </p>
            )}

            {!isLoading && !error && idea && (
                <>
                    <article className="card overflow-hidden">
                        <div className="grid gap-0 lg:grid-cols-2">
                            <IdeaImage
                                imageUrl={idea.imageUrl}
                                title={idea.title}
                                className="h-64 w-full sm:h-80 lg:h-full"
                            />

                            <div className="flex flex-col gap-4 p-6 sm:p-8">
                                {(hasValue(idea.category) || hasValue(idea.difficulty)) && (
                                    <div className="flex flex-wrap gap-2">
                                        {hasValue(idea.category) && (
                                            <CategoryBadge category={idea.category} />
                                        )}
                                        {hasValue(idea.difficulty) && (
                                            <DifficultyBadge difficulty={idea.difficulty} />
                                        )}
                                    </div>
                                )}

                                <h1 className="page-title">{idea.title}</h1>

                                <dl className="flex flex-col gap-4">
                                    {hasValue(idea.estimatedCost) && (
                                        <div>
                                            <dt className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                                                Ориентировъчна цена
                                            </dt>
                                            <dd className="text-2xl font-extrabold text-stone-900">
                                                {idea.estimatedCost} €
                                            </dd>
                                        </div>
                                    )}

                                    {hasValue(idea.materials) && (
                                        <div>
                                            <dt className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                                                Материали
                                            </dt>
                                            <dd className="text-stone-700">{idea.materials}</dd>
                                        </div>
                                    )}
                                </dl>

                                <div className="mt-auto border-t border-stone-200 pt-4">
                                    <IdeaLikes ideaId={ideaId} ideaOwnerId={idea._ownerId} />
                                </div>
                            </div>
                        </div>

                        {hasValue(idea.description) && (
                            <div className="border-t border-stone-200 p-6 sm:p-8">
                                <h2 className="mb-2 text-lg font-bold text-stone-900">Описание</h2>
                                <p className="whitespace-pre-line leading-relaxed text-stone-700">
                                    {idea.description}
                                </p>
                            </div>
                        )}

                        {isOwner && (
                            <div className="flex flex-col gap-3 border-t border-stone-200 p-6 sm:flex-row sm:p-8">
                                <Link
                                    to={`/ideas/${ideaId}/edit`}
                                    className="btn btn-primary"
                                >
                                    Редактирай
                                </Link>
                                <button
                                    type="button"
                                    onClick={deleteIdeaHandler}
                                    className="btn btn-danger"
                                >
                                    Изтрий
                                </button>
                            </div>
                        )}
                    </article>

                    <section
                        aria-labelledby="comments-heading"
                        className="card space-y-6 p-6 sm:p-8"
                    >
                        <div className="flex items-center gap-2">
                            <h2 id="comments-heading" className="text-lg font-bold text-stone-900">Коментари</h2>
                            {canShowComments && (
                                <span className="badge bg-stone-100 text-stone-700">
                                    {optimisticComments.length}
                                </span>
                            )}
                        </div>

                        {isCommentsLoading && (
                            <p className="text-stone-600">Зареждане на коментарите…</p>
                        )}

                        {!isCommentsLoading && commentsError && (
                            <p className="alert-error">
                                {commentsError}
                            </p>
                        )}

                        {canShowComments && isAuthenticated && (
                            <IdeaCommentCreate onCreate={createCommentHandler} />
                        )}

                        {canShowComments && !isAuthenticated && (
                            <p className="rounded-lg bg-brand-50 p-4 text-sm text-stone-700">
                                <Link
                                    to="/login"
                                    className="link rounded"
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

    );
}
