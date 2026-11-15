const buttonClass = 'rounded-lg border px-3 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60';
const inactiveClass = 'border-stone-300 bg-white text-stone-700 hover:bg-stone-100 disabled:hover:bg-white';
const activeClass = 'border-brand-600 bg-brand-600 text-white';

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}) {

    if (totalPages <= 1) {
        return null;
    }

    const pages = Array.from({ length: totalPages }, (item, index) => index + 1);

    return (
        <nav aria-label="Страници" className="flex flex-wrap items-center justify-center gap-2">
            <button
                type="button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`${buttonClass} ${inactiveClass}`}
            >
                Назад
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    type="button"
                    onClick={() => onPageChange(page)}
                    aria-current={page === currentPage ? 'page' : undefined}
                    className={`${buttonClass} ${page === currentPage ? activeClass : inactiveClass}`}
                >
                    {page}
                </button>
            ))}

            <button
                type="button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`${buttonClass} ${inactiveClass}`}
            >
                Напред
            </button>
        </nav>
    );
}
