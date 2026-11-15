import { difficultyOptions, getOptionLabel } from '../../utils/ideaOptions.js';

// Цветът подсказва трудността, но значението идва от текста, а не само от цвета
const difficultyClasses = {
    Easy: 'bg-brand-100 text-brand-800',
    Medium: 'bg-accent-100 text-accent-800',
    Hard: 'bg-red-100 text-red-800',
};

export default function DifficultyBadge({ difficulty }) {

    const colorClass = difficultyClasses[difficulty] ?? 'bg-stone-100 text-stone-700';

    return (
        <span className={`badge ${colorClass}`}>
            <span className="sr-only">Трудност:</span>
            {getOptionLabel(difficultyOptions, difficulty)}
        </span>
    );
}
