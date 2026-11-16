import { useState } from 'react';

import IdeaCommentEdit from '../idea-comment-edit/IdeaCommentEdit.jsx';
import { getDisplayName } from '../../utils/userDisplay.js';
import { formatDate } from '../../utils/formatDate.js';

export default function IdeaCommentList({
    comments,
    ideaOwnerId,
    currentUserId,
    onUpdate,
    onDelete,
}) {

    // Само един коментар се редактира в даден момент
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [deletingCommentId, setDeletingCommentId] = useState(null);

    const saveHandler = async (comment, text) => {
        // Без промяна в текста няма нужда от заявка
        if (text === comment.text) {
            setEditingCommentId(null);
            return;
        }

        const isUpdated = await onUpdate(comment._id, text);

        // При грешка формата остава отворена, за да може авторът да опита отново
        if (isUpdated) {
            setEditingCommentId(null);
        }
    };

    const deleteHandler = async (comment) => {
        setDeletingCommentId(comment._id);

        await onDelete(comment._id);

        setDeletingCommentId(null);
    };

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
                const isOwnComment = comment._ownerId === currentUserId && !comment.isPending;
                const isEditing = isOwnComment && editingCommentId === comment._id;
                const isDeleting = deletingCommentId === comment._id;
                const isEdited = comment._updatedOn !== undefined;

                return (
                    <li
                        key={comment._id}
                        className={`flex gap-3 transition-opacity ${comment.isPending || isDeleting ? 'opacity-60' : ''}`}
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

                                {isEdited && (
                                    <span className="text-sm text-stone-600">(редактиран)</span>
                                )}
                            </div>

                            {isEditing && (
                                <IdeaCommentEdit
                                    text={comment.text}
                                    onSave={(text) => saveHandler(comment, text)}
                                    onCancel={() => setEditingCommentId(null)}
                                />
                            )}

                            {!isEditing && (
                                <p className="mt-1 whitespace-pre-line wrap-break-word text-stone-700">
                                    {comment.text}
                                </p>
                            )}

                            {isOwnComment && !isEditing && (
                                <div className="mt-2 flex gap-4 text-sm">
                                    <button
                                        type="button"
                                        onClick={() => setEditingCommentId(comment._id)}
                                        disabled={isDeleting}
                                        className="link rounded disabled:cursor-not-allowed"
                                    >
                                        Редактирай
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => deleteHandler(comment)}
                                        disabled={isDeleting}
                                        className="rounded font-semibold text-red-700 underline-offset-2 hover:underline disabled:cursor-not-allowed"
                                    >
                                        Изтрий
                                    </button>
                                </div>
                            )}
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}
