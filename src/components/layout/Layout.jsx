import { Outlet } from 'react-router';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

export default function Layout() {

    return (
        <div className="flex min-h-screen flex-col bg-page text-stone-900">
            <Header />

            <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:py-10">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}
