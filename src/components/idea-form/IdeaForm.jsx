import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

import FieldError from '../field-error/FieldError.jsx';
import { uploadIdeaImage } from '../../services/imageService.js';
import { categoryOptions, difficultyOptions } from '../../utils/ideaOptions.js';
import { ideaRules } from '../../utils/validation.js';

const labelClass = 'mb-1 block text-sm font-medium text-slate-700';
const fieldClass = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 transition-colors hover:border-slate-400 focus:border-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 aria-invalid:border-red-500';
const fileButtonClass = 'group flex w-full cursor-pointer items-center gap-3 rounded-lg border border-slate-300 bg-white px-3 py-2 transition-colors hover:border-slate-400 peer-focus-visible:border-blue-500 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue-600 peer-aria-invalid:border-red-500';
const previewClass = 'h-48 w-full max-w-sm rounded-lg border border-slate-200 object-cover';

const toFormValues = (values) => ({
    title: values?.title ?? '',
    category: values?.category ?? '',
    difficulty: values?.difficulty ?? '',
    estimatedCost: values?.estimatedCost ?? '',
    imageUrl: values?.imageUrl ?? '',
    materials: values?.materials ?? '',
    description: values?.description ?? '',
});

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
        trigger,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: toFormValues(initialValues),
        mode: 'onTouched',
    });

    const [previewUrl, setPreviewUrl] = useState('');
    const [fileName, setFileName] = useState('');

    const imageField = register('imageFile', ideaRules.imageFile);
    const currentImageUrl = initialValues?.imageUrl;

    useEffect(() => {
        reset(toFormValues(initialValues));
    }, [initialValues, reset]);

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const imageChangeHandler = async (event) => {
        await imageField.onChange(event);

        const file = event.target.files[0];
        const isValid = await trigger('imageFile');

        if (!file) {
            setFileName('');
            setPreviewUrl('');
            return;
        }

        setFileName(file.name);

        if (isValid) {
            setPreviewUrl(URL.createObjectURL(file));
            return;
        }

        setPreviewUrl('');
    };

    const formSubmitHandler = async (data) => {
        const { imageFile, ...ideaData } = data;

        if (imageFile && imageFile.length > 0) {
            try {
                ideaData.imageUrl = await uploadIdeaImage(imageFile[0]);
            } catch (err) {
                console.error('Upload image error:', err);

                await Swal.fire({
                    title: '❌ Грешка!',
                    text: 'Снимката не може да бъде качена. Опитайте отново.',
                });

                return;
            }
        }

        await onSubmit(ideaData);
    };

    return (
        <div className="mx-auto max-w-2xl space-y-6">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold text-slate-900">{heading}</h1>
                {helperText && <p className="text-slate-600">{helperText}</p>}
            </div>

            <form className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8" onSubmit={handleSubmit(formSubmitHandler)} noValidate>
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
                        <label htmlFor="imageFile" className={labelClass}>Снимка</label>
                        <input
                            id="imageFile"
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            {...imageField}
                            onChange={imageChangeHandler}
                            aria-invalid={!!errors.imageFile}
                            aria-describedby="imageFile-hint"
                            className="peer sr-only"
                        />
                        <label htmlFor="imageFile" className={fileButtonClass}>
                            <span className="shrink-0 rounded-md bg-blue-50 px-3 py-0.5 text-sm font-semibold text-blue-700 transition-colors group-hover:bg-blue-100">
                                Изберете файл
                            </span>
                            {fileName && <span className="min-w-0 truncate text-sm text-slate-900">{fileName}</span>}
                            {!fileName && <span className="min-w-0 truncate text-sm text-slate-500">Няма избран файл</span>}
                        </label>
                        <p id="imageFile-hint" className="mt-1 text-xs text-slate-500">По желание. JPEG, PNG или WebP, до 5 MB.</p>
                        <FieldError message={errors.imageFile?.message} />
                    </div>

                    {previewUrl && (
                        <figure className="sm:col-span-2">
                            <img src={previewUrl} alt="Преглед на избраната снимка" className={previewClass} />
                            <figcaption className="mt-1 text-sm text-slate-600">Избрана снимка</figcaption>
                        </figure>
                    )}

                    {!previewUrl && currentImageUrl && (
                        <figure className="sm:col-span-2">
                            <img src={currentImageUrl} alt="Текущата снимка на идеята" className={previewClass} />
                            <figcaption className="mt-1 text-sm text-slate-600">Текуща снимка. Изберете нов файл, ако искате да я смените.</figcaption>
                        </figure>
                    )}

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
                        {isSubmitting ? 'Запазване…' : submitLabel}
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
    );
}
