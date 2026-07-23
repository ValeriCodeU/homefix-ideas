import { Link } from 'react-router'
import { useForm } from 'react-hook-form'
import * as ideaService from '../../services/ideaService.js'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'

const categoryOptions = [
    { value: 'Organization', label: 'Организация' },
    { value: 'Furniture', label: 'Мебели' },
    { value: 'Storage', label: 'Съхранение' },
    { value: 'Renovation', label: 'Обновяване' },
    { value: 'Outdoor', label: 'Двор и балкон' },
    { value: 'Decoration', label: 'Декорация' },
]
const difficultyOptions = [
    { value: 'Easy', label: 'Лесно' },
    { value: 'Medium', label: 'Средно' },
    { value: 'Hard', label: 'Трудно' },
]

const labelClass = 'mb-1 block text-sm font-medium text-slate-700'
const fieldClass = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 transition-colors hover:border-slate-400 focus:border-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'

export default function IdeaCreate() {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({});

    const createIdeaSubmitHandler = async (data) => {
        console.log(data);


        try {
            const result = await ideaService.create(data);
            navigate(`/ideas/${result._id}`);

            await Swal.fire({
                title: "✅ Success!",
                text: `${result.title} беше създадена успешно!`,
            });
        }
        catch (error) {
            console.error('Error creating idea:', error);
            await Swal.fire({
                title: "❌ Error!",
                text: error.message,
            });
        }

    }

    return (
        <div className="mx-auto max-w-2xl space-y-6">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold text-slate-900">Добави нова идея</h1>
                <p className="text-slate-600">
                    Споделете практична идея за дома. Попълнете полетата по-долу, за да я
                    представите ясно на общността.
                </p>
            </div>

            <form className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8" onSubmit={handleSubmit(createIdeaSubmitHandler)}>
                <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <label htmlFor="title" className={labelClass}>Заглавие</label>
                        <input
                            id="title"
                            {...register("title")}
                            type="text"
                            placeholder="Напр. Органайзер за кабели под бюрото"
                            className={fieldClass}
                        />
                    </div>

                    <div>
                        <label htmlFor="category" className={labelClass}>Категория</label>
                        <select id="category" {...register("category")} defaultValue="" className={fieldClass}>
                            <option value="" disabled>Изберете категория</option>
                            {categoryOptions.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="difficulty" className={labelClass}>Трудност</label>
                        <select id="difficulty" {...register("difficulty")} defaultValue="" className={fieldClass}>
                            <option value="" disabled>Изберете трудност</option>
                            {difficultyOptions.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="estimatedCost" className={labelClass}>Ориентировъчна цена (€)</label>
                        <input
                            id="estimatedCost"
                            {...register("estimatedCost")}
                            type="number"
                            min="0"
                            placeholder="Напр. 25"
                            className={fieldClass}
                        />
                    </div>

                    <div>
                        <label htmlFor="imageUrl" className={labelClass}>Връзка към изображение</label>
                        <input
                            id="imageUrl"
                            {...register("imageUrl")}
                            type="url"
                            placeholder="https://…"
                            className={fieldClass}
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="materials" className={labelClass}>Материали</label>
                        <textarea
                            id="materials"
                            {...register("materials")}
                            rows="3"
                            placeholder="Избройте необходимите материали и инструменти"
                            className={fieldClass}
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="description" className={labelClass}>Описание</label>
                        <textarea
                            id="description"
                            {...register("description")}
                            rows="5"
                            placeholder="Опишете идеята, стъпките и полезните съвети"
                            className={fieldClass}
                        />
                    </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button
                        type="submit"
                        className="rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        Добави идея
                    </button>
                    <Link
                        to="/ideas"
                        className="rounded-lg border border-slate-300 px-6 py-3 text-center text-base font-semibold text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        Отказ
                    </Link>
                </div>
            </form>
        </div>
    )
}
