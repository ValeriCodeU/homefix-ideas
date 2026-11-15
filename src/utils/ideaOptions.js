// icon е име на икона от src/components/icon/Icon.jsx
export const categoryOptions = [
    { value: 'Organization', label: 'Организация', icon: 'organization' },
    { value: 'Furniture', label: 'Мебели', icon: 'furniture' },
    { value: 'Storage', label: 'Съхранение', icon: 'storage' },
    { value: 'Renovation', label: 'Обновяване', icon: 'renovation' },
    { value: 'Outdoor', label: 'Двор и балкон', icon: 'outdoor' },
    { value: 'Decoration', label: 'Декорация', icon: 'decoration' },
];

export const difficultyOptions = [
    { value: 'Easy', label: 'Лесно' },
    { value: 'Medium', label: 'Средно' },
    { value: 'Hard', label: 'Трудно' },
];

export const sortOptions = [
    { value: 'newest', label: 'Най-нови' },
    { value: 'likes', label: 'Най-харесвани' },
];

export const favoriteSortOptions = [
    { value: 'recentlyLiked', label: 'Последно харесани' },
    ...sortOptions,
];

export function getOptionLabel(options, value) {
    const option = options.find((item) => item.value === value);

    if (option) {
        return option.label;
    }

    return value;
}
