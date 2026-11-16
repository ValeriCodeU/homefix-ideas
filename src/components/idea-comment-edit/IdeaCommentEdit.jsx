import { useForm } from 'react-hook-form';

import FieldError from '../field-error/FieldError.jsx';
import { commentRules } from '../../utils/validation.js';

export default function IdeaCommentEdit({
    text,
    onSave,
    onCancel,
}) {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: { text },
    });

    // handleSubmit изчаква заявката, затова isSubmitting остава true, докато сървърът отговори
    const submitHandler = async (data) => {
        await onSave(data.text.trim());
    };

    return (
        <form className="mt-2 space-y-3" onSubmit={handleSubmit(submitHandler)} noValidate>
            <div>
                <label htmlFor="comment-edit-text" className="sr-only">Редакция на коментара</label>
                <textarea
                    id="comment-edit-text"
                    {...register('text', commentRules)}
                    rows="3"
                    autoFocus
                    aria-invalid={!!errors.text}
                    className="form-field"
                />
                <FieldError message={errors.text?.message} />
            </div>

            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className="btn btn-secondary"
                >
                    Отказ
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                >
                    {isSubmitting ? 'Запазване…' : 'Запази'}
                </button>
            </div>
        </form>
    );
}
