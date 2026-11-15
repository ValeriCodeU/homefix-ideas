import { getDisplayName } from '../../utils/userDisplay.js';
import { formatDate } from '../../utils/formatDate.js';

export default function IdeaCommentList({
    comments,
    ideaOwnerId
}) {

    if (comments.length === 0) {
        return (
            <p className="rounded-lg border border-dashed border-stone-300 p-6 text-center text-stone-600">
                Все още няма коментари. Споделете пръв опит или въпрос!
            </p>
        );
    }

    return (
        <ul className="space-y-4">
            {comments.map((comment) => {
                const displayName = getDisplayName(comment.author?.email);
                const isIdeaAuthor = comment._ownerId === ideaOwnerId;

                return (
                    <li
                        key={comment._id}
                        className={`flex gap-3 transition-opacity ${comment.isPending ? 'opacity-60' : ''}`}
                    >
                        <span
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-700"
                            aria-hidden="true"
                        >
                            {displayName.charAt(0).toUpperCase()}
                        </span>

                        <div className="min-w-0 flex-1 rounded-xl bg-stone-100 p-4">
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                <span className="font-semibold text-stone-900">{displayName}</span>

                                {isIdeaAuthor && (
                                    <span className="badge bg-brand-100 text-brand-800">
                                        Автор
                                    </span>
                                )}

                                <span className="text-sm text-stone-600">
                                    {comment.isPending ? 'Изпраща се…' : formatDate(comment._createdOn)}
                                </span>
                            </div>

                            <p className="mt-1 whitespace-pre-line wrap-break-word text-stone-700">
                                {comment.text}
                            </p>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}
