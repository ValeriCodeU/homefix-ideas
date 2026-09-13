const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const emailRules = {
    required: 'Имейлът е задължителен.',
    pattern: {
        value: EMAIL_PATTERN,
        message: 'Въведете валиден имейл адрес.',
    },
};

export const loginPasswordRules = {
    required: 'Паролата е задължителна.',
};

export const registerPasswordRules = {
    required: 'Паролата е задължителна.',
    minLength: {
        value: 6,
        message: 'Паролата трябва да е поне 6 символа.',
    },
};

export const confirmPasswordRules = {
    required: 'Моля, повторете паролата.',
    validate: (value, formValues) => {
        if (value === formValues.password) {
            return true;
        }
        return 'Паролите не съвпадат.';
    },
};

const URL_PATTERN = /^https?:\/\/.+/;

export const ideaRules = {
    title: {
        required: 'Заглавието е задължително.',
        minLength: {
            value: 5,
            message: 'Заглавието трябва да е поне 5 символа.',
        },
        maxLength: {
            value: 100,
            message: 'Заглавието може да е най-много 100 символа.',
        },
    },
    category: {
        required: 'Изберете категория.',
    },
    difficulty: {
        required: 'Изберете трудност.',
    },
    estimatedCost: {
        required: 'Въведете ориентировъчна цена.',
        min: {
            value: 0,
            message: 'Цената не може да е отрицателна.',
        },
        valueAsNumber: true,
    },
    imageUrl: {
        pattern: {
            value: URL_PATTERN,
            message: 'Връзката трябва да започва с http:// или https://.',
        },
    },
    materials: {
        required: 'Избройте необходимите материали.',
        minLength: {
            value: 3,
            message: 'Материалите трябва да са поне 3 символа.',
        },
        maxLength: {
            value: 500,
            message: 'Материалите може да са най-много 500 символа.',
        },
    },
    description: {
        // required: 'Описанието е задължително.',
        minLength: {
            value: 3,
            message: 'Описанието трябва да е поне 3 символа.',
        },
        maxLength: {
            value: 1000,
            message: 'Описанието може да е най-много 1000 символа.',
        },
    },
};
