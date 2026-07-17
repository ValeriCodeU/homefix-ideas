function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto w-full max-w-5xl space-y-1 px-4 py-6 text-sm text-slate-600">
                <p>HomeFix Ideas - практични идеи за дома и ремонти по свой вкус.</p>
                <p>&copy; {currentYear} HomeFix Ideas. Курсов проект за SoftUni.</p>
            </div>
        </footer>
    )
}

export default Footer
