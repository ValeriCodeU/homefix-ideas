export const categoryOptions = [
    { value: 'Organization', label: 'Организация' },
    { value: 'Furniture', label: 'Мебели' },
    { value: 'Storage', label: 'Съхранение' },
    { value: 'Renovation', label: 'Обновяване' },
    { value: 'Outdoor', label: 'Двор и балкон' },
    { value: 'Decoration', label: 'Декорация' },
];

export const difficultyOptions = [
    { value: 'Easy', label: 'Лесно' },
    { value: 'Medium', label: 'Средно' },
    { value: 'Hard', label: 'Трудно' },
];

export function getOptionLabel(options, value) {
    const option = options.find((item) => item.value === value);

    if (option) {
        return option.label;
    }

    return value;
}
