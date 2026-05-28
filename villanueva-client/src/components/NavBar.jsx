import { NavLink } from 'react-router-dom';
import logo from "../assets/IS.webp";

const links = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Articles', to: '/articles' },
];

const authLinks = [
  { label: 'Sign In', to: '/auth/signin' },
  { label: 'Sign Up', to: '/auth/signup' },
];

const dashboardLinks = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Reports', to: '/dashboard/reports' },
  { label: 'Users', to: '/dashboard/users' },
];

const navLinkClassName = ({ isActive }) =>
[
    'rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition',
    isActive
    ? 'border-amber-900 bg-amber-900 text-amber-50'
    : 'border-transparent text-amber-500 hover:border-amber-900 hover:bg-amber-100 hover:text-amber-900 hover:scale-105 transition transform',
].join(' ');

const NavBar = ( ) => {
    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-amber-900 bg-amber-100 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                <NavLink to="/" className="flex items-center gap-3">
                    <div className="space-y-0.5">
                        <img src={logo} alt="Logo" className="w-15 h-15 object-contain" />
                    </div>
                </NavLink>
                <nav className="hidden items-center gap-2 md:flex">
                    {links.map((link) => (
                        <NavLink key={link.to} to={link.to} end={link.to === '/'} className={navLinkClassName}>
                            {link.label}
                        </NavLink>
                    ))}
                    {authLinks.map((link) => (
                        <NavLink key={link.to} to={link.to} className={navLinkClassName} aria-label={`Navigate to ${link.label}`}>
                            {link.label}
                        </NavLink>
                    ))}
                    {dashboardLinks.map((link) => (
                        <NavLink key={link.to} to={link.to} className={navLinkClassName} aria-label={`Navigate to ${link.label}`}>
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default NavBar;	