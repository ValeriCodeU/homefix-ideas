export function formatDate(timestamp) {

    return new Date(timestamp).toLocaleString('bg-BG', {
        dateStyle: 'medium',
        timeStyle: 'short',
    });
}
