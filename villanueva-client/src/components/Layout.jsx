import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = ( ) => {
    return (
        <div className="min-h-screen-bg-amber-100 text-amber-900">
            <NavBar />
            <main className="pb-16 pt-20">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;