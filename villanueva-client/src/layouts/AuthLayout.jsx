import { Outlet } from 'react-router-dom';
import banner from '../assets/IS.webp';

const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-amber-100 text-amber-900">
      
      <div className="grid min-h-screen w-full lg:grid-cols-[1fr_0.95fr]">
        <div className="hidden lg:flex items-center justify-center border-r-2 border-amber-300 ">
          <img
            src={banner}
            alt="IS Logo"
            className="h-full w-full object-cover"
          />
        </div>

        <main className="flex items-center bg-amber-50 px-6 py-10 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthLayout;