import { Outlet } from 'react-router'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

export default function Layout() {

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
            <Header />

            <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
                <Outlet />
            </main>

            <Footer />
        </div>
    )
}
