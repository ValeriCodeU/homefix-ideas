import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

import * as likeService from '../../services/likeService.js';
import AuthContext from '../../contexts/AuthContext.jsx';
import HeartIcon from '../heart-icon/HeartIcon.jsx';
import { isInvalidTokenError } from '../../utils/authErrors.js';

const getLikesLabel = (count) => {
    if (count === 1) {
        return '1 харесване';
    }

    return `${count} харесвания`;
};

export default function IdeaLikes({
    ideaId,
    ideaOwnerId,
}) {

    const { user, isAuthenticated, sessionExpiredHandler } = useContext(AuthContext);
    const accessToken = user?.accessToken;

    const [likes, setLikes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        let ignore = false;

        likeService.getByIdeaId(ideaId)
            .then((result) => {
                if (ignore) return;

                setLikes(result);
            })
            .catch(() => {
                if (!ignore) {
                    setError('Харесванията не могат да бъдат заредени.');
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

    const likesCount = likes.length;
    const userLike = likes.find((like) => like._ownerId === user?._id);
    const hasLiked = userLike !== undefined;
    const isOwner = user && user._id === ideaOwnerId;
    const canLike = isAuthenticated && !isOwner;

    const likeHandler = async () => {
        setIsPending(true);

        try {
            const createdLike = await likeService.create(ideaId, accessToken);
            setLikes((state) => [...state, createdLike]);
        } catch (err) {
            if (isInvalidTokenError(err)) {
                sessionExpiredHandler();
                return;
            }

            console.error('Like idea error:', err);

            Swal.fire({
                title: '❌ Грешка!',
                text: 'Идеята не може да бъде харесана. Опитайте отново.',
            });
        } finally {
            setIsPending(false);
        }
    };

    const unlikeHandler = async () => {
        setIsPending(true);

        try {
            await likeService.remove(userLike._id, accessToken);

            setLikes((state) => state.filter((like) => like._id !== userLike._id));
        } catch (err) {
            if (isInvalidTokenError(err)) {
                sessionExpiredHandler();
                return;
            }

            console.error('Unlike idea error:', err);

            Swal.fire({
                title: '❌ Грешка!',
                text: 'Харесването не може да бъде премахнато. Опитайте отново.',
            });
        } finally {
            setIsPending(false);
        }
    };

    if (isLoading) {
        return <p className="text-sm text-slate-500">Зареждане на харесванията…</p>;
    }

    if (error) {
        return <p className="text-sm text-red-700">{error}</p>;
    }

    return (
        <div className="flex flex-wrap items-center gap-3">
            {canLike && (
                <button
                    type="button"
                    onClick={hasLiked ? unlikeHandler : likeHandler}
                    disabled={isPending}
                    aria-pressed={hasLiked}
                    className={[
                        'inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors',
                        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600',
                        'disabled:cursor-not-allowed disabled:opacity-60',
                        hasLiked
                            ? 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100'
                            : 'border-slate-300 text-slate-700 hover:bg-slate-100',
                    ].join(' ')}
                >
                    <HeartIcon isFilled={hasLiked} />
                    {hasLiked ? 'Харесано' : 'Харесай'}
                </button>
            )}

            {!canLike && (
                <span className="text-red-600">
                    <HeartIcon isFilled={likesCount > 0} />
                </span>
            )}

            <span className="text-sm font-medium text-slate-700">{getLikesLabel(likesCount)}</span>

            {!isAuthenticated && (
                <span className="text-sm text-slate-600">
                    <Link
                        to="/login"
                        className="font-medium text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        Влезте
                    </Link>
                    , за да харесате.
                </span>
            )}
        </div>
    );
}
