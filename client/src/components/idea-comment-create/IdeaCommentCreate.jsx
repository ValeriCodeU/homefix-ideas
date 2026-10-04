import { useTransition } from 'react'
import { useForm } from 'react-hook-form'

import FieldError from '../field-error/FieldError.jsx'
import { commentRules } from '../../utils/validation.js'

const labelClass = 'mb-1 block text-sm font-medium text-slate-700';
const fieldClass = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 transition-colors hover:border-slate-400 focus:border-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 aria-invalid:border-red-500';

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
                <label htmlFor="comment-text" className={labelClass}>Вашият коментар</label>
                <textarea
                    id="comment-text"
                    {...register('text', commentRules)}
                    rows="3"
                    placeholder="Споделете опит, съвет или въпрос към автора…"
                    aria-invalid={!!errors.text}
                    className={fieldClass}
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
    )
}
