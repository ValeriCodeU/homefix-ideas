import Icon from '../icon/Icon.jsx';

// Снимката на идеята или placeholder, когато imageUrl е празен.
// Размерите идват от className, за да се ползва и в картата, и в детайлите
export default function IdeaImage({
    imageUrl,
    title,
    className = '',
}) {

    if (imageUrl) {
        return (
            <img
                src={imageUrl}
                alt={`Изображение към идея: ${title}`}
                className={`object-cover ${className}`}
            />
        );
    }

    return (
        <div
            className={`flex flex-col items-center justify-center gap-2 bg-linear-to-br from-brand-100 to-stone-200 text-brand-700 ${className}`}
            aria-hidden="true"
        >
            <Icon name="home" className="h-12 w-12" />
            <span className="text-sm font-semibold">Без снимка</span>
        </div>
    );
}
