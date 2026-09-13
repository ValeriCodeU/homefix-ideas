import { Link } from 'react-router'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'

import AuthContext from '../../contexts/AuthContext.jsx'
import FieldError from '../field-error/FieldError.jsx'
import { confirmPasswordRules, emailRules, registerPasswordRules } from '../../utils/validation.js'

const labelClass = 'mb-1 block text-sm font-medium text-slate-700'
const fieldClass = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 transition-colors hover:border-slate-400 focus:border-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 aria-invalid:border-red-500'

const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
}

export default function Register() {

    const { registerHandler } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: initialValues,
        mode: 'onTouched',
    });

    const registerSubmitHandler = async (data) => {
        try {
            await registerHandler(data);

        } catch (err) {
            await Swal.fire({
                title: '❌ Грешка!',
                text: err.code === 409
                    ? 'Вече има регистриран потребител с този имейл.'
                    : 'Възникна грешка. Опитайте отново по-късно.',
            });
        }
    }

    return (
        <div className="mx-auto max-w-md space-y-6">
            <div className="space-y-1 text-center">
                <h1 className="text-3xl font-bold text-slate-900">Регистрация</h1>
                <p className="text-slate-600">
                    Създайте профил, за да споделяте и управлявате своите идеи.
                </p>
            </div>

            <form onSubmit={handleSubmit(registerSubmitHandler)} noValidate className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div>
                    <label htmlFor="email" className={labelClass}>Имейл</label>
                    <input
                        id="email"
                        {...register('email', emailRules)}
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        aria-invalid={!!errors.email}
                        className={fieldClass}
                    />
                    <FieldError message={errors.email?.message} />
                </div>

                <div>
                    <label htmlFor="password" className={labelClass}>Парола</label>
                    <input
                        id="password"
                        {...register('password', registerPasswordRules)}
                        type="password"
                        autoComplete="new-password"
                        placeholder="••••••••"
                        aria-invalid={!!errors.password}
                        className={fieldClass}
                    />
                    <FieldError message={errors.password?.message} />
                </div>

                <div>
                    <label htmlFor="confirmPassword" className={labelClass}>Повторете паролата</label>
                    <input
                        id="confirmPassword"
                        {...register('confirmPassword', confirmPasswordRules)}
                        type="password"
                        autoComplete="new-password"
                        placeholder="••••••••"
                        aria-invalid={!!errors.confirmPassword}
                        className={fieldClass}
                    />
                    <FieldError message={errors.confirmPassword?.message} />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isSubmitting ? 'Регистриране…' : 'Регистрация'}
                </button>
            </form>

            <p className="text-center text-sm text-slate-600">
                Вече имате профил?{' '}
                <Link
                    to="/login"
                    className="font-medium text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    Влезте
                </Link>
            </p>
        </div>
    )
}
