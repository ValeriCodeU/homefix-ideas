import { useForm } from 'react-hook-form';

import Icon from '../icon/Icon.jsx';
import { categoryOptions, sortOptions as defaultSortOptions } from '../../utils/ideaOptions.js';

export default function IdeaFilters({
    search,
    category,
    sort,
    sortOptions = defaultSortOptions,
    onFilterChange,
}) {

    // Текстът стои във формата и стига до URL-а чак при изпращане
    // values обновява полето, когато URL-ът се смени отвън (Back, "Изчисти филтрите")
    const { register, handleSubmit } = useForm({ values: { search } });

    const searchSubmitHandler = (data) => {
        onFilterChange('q', data.search.trim());
    };

    return (
        <div className="card grid gap-4 p-4 md:grid-cols-[1fr_12rem_12rem]">
            <form role="search" onSubmit={handleSubmit(searchSubmitHandler)} noValidate>
                <label htmlFor="idea-search" className="form-label">Търсене</label>
                <div className="flex gap-2">
                    <input
                        id="idea-search"
                        type="text"
                        {...register('search')}
                        placeholder="Заглавие или материал"
                        className="form-field min-w-0"
                    />
                    <button
                        type="submit"
                        className="btn btn-primary shrink-0 px-4 py-2"
                    >
                        <Icon name="search" className="h-4 w-4" />
                        Търси
                    </button>
                </div>
            </form>

            <div>
                <label htmlFor="idea-category" className="form-label">Категория</label>
                <select
                    id="idea-category"
                    value={category}
                    onChange={(event) => onFilterChange('category', event.target.value)}
                    className="form-field min-w-0"
                >
                    <option value="">Всички категории</option>
                    {categoryOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="idea-sort" className="form-label">Подреждане</label>
                <select
                    id="idea-sort"
                    value={sort}
                    onChange={(event) => onFilterChange('sort', event.target.value)}
                    className="form-field min-w-0"
                >
                    {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}
