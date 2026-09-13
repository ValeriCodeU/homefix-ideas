import { useEffect } from 'react'
import { Link } from 'react-router'
import { useForm } from 'react-hook-form'

import FieldError from '../field-error/FieldError.jsx'
import { categoryOptions, difficultyOptions } from '../../utils/ideaOptions.js'
import { ideaRules } from '../../utils/validation.js'

const labelClass = 'mb-1 block text-sm font-medium text-slate-700'
const fieldClass = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 transition-colors hover:border-slate-400 focus:border-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 aria-invalid:border-red-500'

const toFormValues = (values) => ({
    title: values?.title ?? '',
    category: values?.category ?? '',
    difficulty: values?.difficulty ?? '',
    estimatedCost: values?.estimatedCost ?? '',
    imageUrl: values?.imageUrl ?? '',
    materials: values?.materials ?? '',
    description: values?.description ?? '',
})

export default function IdeaForm({
    initialValues = null,
    onSubmit,
    heading,
    helperText,
    submitLabel,
    cancelTo = '/ideas',
}) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: toFormValues(initialValues),
        mode: 'onTouched',
    })

    useEffect(() => {
        reset(toFormValues(initialValues))
    }, [initialValues, reset])

    return (
        <div className="mx-auto max-w-2xl space-y-6">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold text-slate-900">{heading}</h1>
                {helperText && <p className="text-slate-600">{helperText}</p>}
            </div>

            <form className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <label htmlFor="title" className={labelClass}>Заглавие</label>
                        <input
                            id="title"
                            {...register('title', ideaRules.title)}
                            type="text"
                            placeholder="Напр. Органайзер за кабели под бюрото"
                            aria-invalid={!!errors.title}
                            className={fieldClass}
                        />
                        <FieldError message={errors.title?.message} />
                    </div>

                    <div>
                        <label htmlFor="category" className={labelClass}>Категория</label>
                        <select
                            id="category"
                            {...register('category', ideaRules.category)}
                            aria-invalid={!!errors.category}
                            className={fieldClass}
                        >
                            <option value="" disabled>Изберете категория</option>
                            {categoryOptions.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        <FieldError message={errors.category?.message} />
                    </div>

                    <div>
                        <label htmlFor="difficulty" className={labelClass}>Трудност</label>
                        <select
                            id="difficulty"
                            {...register('difficulty', ideaRules.difficulty)}
                            aria-invalid={!!errors.difficulty}
                            className={fieldClass}
                        >
                            <option value="" disabled>Изберете трудност</option>
                            {difficultyOptions.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        <FieldError message={errors.difficulty?.message} />
                    </div>

                    <div>
                        <label htmlFor="estimatedCost" className={labelClass}>Ориентировъчна цена (€)</label>
                        <input
                            id="estimatedCost"
                            {...register('estimatedCost', ideaRules.estimatedCost)}
                            type="number"
                            min="0"
                            placeholder="Напр. 25"
                            aria-invalid={!!errors.estimatedCost}
                            className={fieldClass}
                        />
                        <FieldError message={errors.estimatedCost?.message} />
                    </div>

                    <div>
                        <label htmlFor="imageUrl" className={labelClass}>Връзка към изображение</label>
                        <input
                            id="imageUrl"
                            {...register('imageUrl', ideaRules.imageUrl)}
                            type="url"
                            placeholder="https://…"
                            aria-invalid={!!errors.imageUrl}
                            className={fieldClass}
                        />
                        <FieldError message={errors.imageUrl?.message} />
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="materials" className={labelClass}>Материали</label>
                        <textarea
                            id="materials"
                            {...register('materials', ideaRules.materials)}
                            rows="3"
                            placeholder="Избройте необходимите материали и инструменти"
                            aria-invalid={!!errors.materials}
                            className={fieldClass}
                        />
                        <FieldError message={errors.materials?.message} />
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="description" className={labelClass}>Описание</label>
                        <textarea
                            id="description"
                            {...register('description', ideaRules.description)}
                            rows="5"
                            placeholder="Опишете идеята, стъпките и полезните съвети"
                            aria-invalid={!!errors.description}
                            className={fieldClass}
                        />
                        <FieldError message={errors.description?.message} />
                    </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {submitLabel}
                    </button>
                    <Link
                        to={cancelTo}
                        className="rounded-lg border border-slate-300 px-6 py-3 text-center text-base font-semibold text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        Отказ
                    </Link>
                </div>
            </form>
        </div>
    )
}
