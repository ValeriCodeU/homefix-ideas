import { Link } from 'react-router'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'

const initialValues = {
    email: '',
    password: '',
}
import AuthContext from '../../contexts/AuthContext.jsx'

const labelClass = 'mb-1 block text-sm font-medium text-slate-700'
const fieldClass = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 transition-colors hover:border-slate-400 focus:border-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'

export default function Login() {

    const { loginHandler } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: initialValues
    });

    return (
        <div className="mx-auto max-w-md space-y-6">
            <div className="space-y-1 text-center">
                <h1 className="text-3xl font-bold text-slate-900">Вход</h1>
                <p className="text-slate-600">
                    Влезте в профила си, за да споделяте и управлявате своите идеи.
                </p>
            </div>

            <form className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8" onSubmit={handleSubmit(loginHandler)}>
                <div>
                    <label htmlFor="email" className={labelClass}>Имейл</label>
                    <input
                        id="email"
                        {...register('email')}
                        type="email"
                        placeholder="you@example.com"
                        className={fieldClass}
                    />
                </div>

                <div>
                    <label htmlFor="password" className={labelClass}>Парола</label>
                    <input
                        id="password"
                        {...register('password')}
                        type="password"
                        placeholder="••••••••"
                        className={fieldClass}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    Вход
                </button>
            </form>

            <p className="text-center text-sm text-slate-600">
                Нямате профил?{' '}
                <Link
                    to="/register"
                    className="font-medium text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    Регистрирайте се
                </Link>
            </p>
        </div>
    )
}
