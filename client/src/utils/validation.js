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
