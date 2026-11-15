import Icon from '../icon/Icon.jsx';
import { categoryOptions } from '../../utils/ideaOptions.js';

export default function CategoryBadge({
    category,
    className = 'bg-stone-100 text-stone-800',
}) {

    const option = categoryOptions.find((item) => item.value === category);

    // Непозната категория се показва както е записана, без икона
    return (
        <span className={`badge ${className}`}>
            {option && <Icon name={option.icon} className="h-3.5 w-3.5" />}
            <span className="sr-only">Категория:</span>
            {option ? option.label : category}
        </span>
    );
}
