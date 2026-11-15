import { Link } from 'react-router';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

import AuthContext from '../../contexts/AuthContext.jsx';
import FieldError from '../field-error/FieldError.jsx';
import { emailRules, loginPasswordRules } from '../../utils/validation.js';

const initialValues = {
    email: '',
    password: '',
};

export default function Login() {

    const { loginHandler } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: initialValues,
        mode: 'onTouched',
    });

    const loginSubmitHandler = async (data) => {
        try {
            await loginHandler(data);

        } catch (err) {
            await Swal.fire({
                title: '❌ Грешка!',
                text: err.code === 403
                    ? 'Грешен имейл или парола.'
                    : 'Възникна грешка. Опитайте отново по-късно.',
            });
        }
    };

    return (
        <div className="mx-auto max-w-md space-y-6">
            <div className="space-y-1 text-center">
                <h1 className="page-title">Вход</h1>
                <p className="text-stone-600">
                    Влезте в профила си, за да споделяте и управлявате своите идеи.
                </p>
            </div>

            <form className="card space-y-4 p-6 sm:p-8" onSubmit={handleSubmit(loginSubmitHandler)} noValidate>
                <div>
                    <label htmlFor="email" className="form-label">Имейл</label>
                    <input
                        id="email"
                        {...register('email', emailRules)}
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        aria-invalid={!!errors.email}
                        className="form-field"
                    />
                    <FieldError message={errors.email?.message} />
                </div>

                <div>
                    <label htmlFor="password" className="form-label">Парола</label>
                    <input
                        id="password"
                        {...register('password', loginPasswordRules)}
                        type="password"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        aria-invalid={!!errors.password}
                        className="form-field"
                    />
                    <FieldError message={errors.password?.message} />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-lg btn-primary w-full"
                >
                    {isSubmitting ? 'Влизане…' : 'Вход'}
                </button>
            </form>

            <p className="text-center text-sm text-stone-600">
                Нямате профил?{' '}
                <Link
                    to="/register"
                    className="link rounded"
                >
                    Регистрирайте се
                </Link>
            </p>
        </div>
    );
}
