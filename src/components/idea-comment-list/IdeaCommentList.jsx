import { getDisplayName } from '../../utils/userDisplay.js'
import { formatDate } from '../../utils/formatDate.js'

export default function IdeaCommentList({
    comments,
    ideaOwnerId
}) {

    if (comments.length === 0) {
        return (
            <p className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-slate-600">
                Все още няма коментари. Споделете пръв опит или въпрос!
            </p>
        )
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
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700"
                            aria-hidden="true"
                        >
                            {displayName.charAt(0).toUpperCase()}
                        </span>

                        <div className="min-w-0 flex-1 rounded-lg bg-slate-50 p-4">
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                <span className="font-semibold text-slate-900">{displayName}</span>

                                {isIdeaAuthor && (
                                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                                        Автор
                                    </span>
                                )}

                                <span className="text-sm text-slate-500">
                                    {comment.isPending ? 'Изпраща се…' : formatDate(comment._createdOn)}
                                </span>
                            </div>

                            <p className="mt-1 whitespace-pre-line wrap-break-word text-slate-700">
                                {comment.text}
                            </p>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}
