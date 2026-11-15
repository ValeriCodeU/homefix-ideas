import { Link } from 'react-router';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

import AuthContext from '../../contexts/AuthContext.jsx';
import FieldError from '../field-error/FieldError.jsx';
import { confirmPasswordRules, emailRules, registerPasswordRules } from '../../utils/validation.js';

const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
};

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
    };

    return (
        <div className="mx-auto max-w-md space-y-6">
            <div className="space-y-1 text-center">
                <h1 className="page-title">Регистрация</h1>
                <p className="text-stone-600">
                    Създайте профил, за да споделяте и управлявате своите идеи.
                </p>
            </div>

            <form onSubmit={handleSubmit(registerSubmitHandler)} noValidate className="card space-y-4 p-6 sm:p-8">
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
                        {...register('password', registerPasswordRules)}
                        type="password"
                        autoComplete="new-password"
                        placeholder="••••••••"
                        aria-invalid={!!errors.password}
                        className="form-field"
                    />
                    <FieldError message={errors.password?.message} />
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="form-label">Повторете паролата</label>
                    <input
                        id="confirmPassword"
                        {...register('confirmPassword', confirmPasswordRules)}
                        type="password"
                        autoComplete="new-password"
                        placeholder="••••••••"
                        aria-invalid={!!errors.confirmPassword}
                        className="form-field"
                    />
                    <FieldError message={errors.confirmPassword?.message} />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-lg btn-primary w-full"
                >
                    {isSubmitting ? 'Регистриране…' : 'Регистрация'}
                </button>
            </form>

            <p className="text-center text-sm text-stone-600">
                Вече имате профил?{' '}
                <Link
                    to="/login"
                    className="link rounded"
                >
                    Влезте
                </Link>
            </p>
        </div>
    );
}
