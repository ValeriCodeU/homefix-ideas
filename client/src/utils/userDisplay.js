export function getDisplayName(email) {
    if (!email) {
        return 'Потребител';
    }

    return email.split('@')[0];
}
