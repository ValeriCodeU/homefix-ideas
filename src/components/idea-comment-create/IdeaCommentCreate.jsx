import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import FieldError from '../field-error/FieldError.jsx';
import { commentRules } from '../../utils/validation.js';

export default function IdeaCommentCreate({ onCreate }) {

    const [isPending, startTransition] = useTransition();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: { text: '' },
    });

    const submitHandler = (data) => {
        startTransition(async () => {
            const isCreated = await onCreate(data.text.trim()); 

            //за това връщаме true или false в зависимост от успеха на създаването
            if (isCreated) {
                reset();
            }
        });
    };

    return (
        <form className="space-y-3" onSubmit={handleSubmit(submitHandler)} noValidate>
            <div>
                <label htmlFor="comment-text" className="form-label">Вашият коментар</label>
                <textarea
                    id="comment-text"
                    {...register('text', commentRules)}
                    rows="3"
                    placeholder="Споделете опит, съвет или въпрос към автора…"
                    aria-invalid={!!errors.text}
                    className="form-field"
                />
                <FieldError message={errors.text?.message} />
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isPending}
                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isPending ? 'Публикуване…' : 'Публикувай'}
                </button>
            </div>
        </form>
    );
}
