//SoftUni Practise Server връща 403 ако не си автор или при грешна пароола, изтекла сесия я разпознаваме по съобщението
export function isInvalidTokenError(err) {
    if (err.code === 403 && err.message === 'Invalid access token') {
        return true;
    }

    return false;
}
