// Дата и час, например "22.07.2026 г., 14:30" (коментарите)
export function formatDate(timestamp) {

    return new Date(timestamp).toLocaleString('bg-BG', {
        dateStyle: 'medium',
        timeStyle: 'short',
    });
}

// Само датата с изписан месец, например "22 юли 2026 г." (страницата с детайли)
export function formatLongDate(timestamp) {

    return new Date(timestamp).toLocaleDateString('bg-BG', {
        dateStyle: 'long',
    });
}
