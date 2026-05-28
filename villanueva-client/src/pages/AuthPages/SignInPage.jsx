import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses =
  'mt-2 w-full rounded-xl border border-amber-300 bg-amber-100 px-4 py-3 text-sm text-amber-900 outline-none transition placeholder:text-amber-400 focus:border-amber-900 focus:bg-amber-50';

const actionButtonClassName = 'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const SignInPage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight !text-amber-900 sm:text-4xl">Log In</h1>
      <p className="mt-3 text-sm leading-6 text-amber-600">
        Access your account to view RJ's website IkoSite and its contents.
      </p>

      <form className="mt-8 space-y-5">
        <div>
          <label htmlFor="signin-email" className="text-sm font-medium text-amber-700">
            Email Address
          </label>
          <input
            id="signin-email"
            type="email"
            placeholder="student@email.com"
            autoComplete="email"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="signin-password" className="text-sm font-medium text-amber-700">
            Password
          </label>
          <input
            id="signin-password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            className={inputClasses}
          />
          <p className="mt-2 text-xs leading-5 text-amber-500">
            It must be a combination of minimum 8 letters, numbers, and symbols.
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-2 text-amber-600">
            <input type="checkbox" className="h-4 w-4 rounded border-amber-300 accent-amber-900" />
            <span>Remember me</span>
          </label>
          <button type="button" className="font-medium text-amber-700 transition hover:text-amber-900">
            Forgot Password?
          </button>
        </div>

        <Button type="submit" variant="primary" className={actionButtonClassName}>
          Log In
        </Button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button type="button" variant="secondary" className={actionButtonClassName}>
            Log In with Google
          </Button>
          <Button type="button" variant="secondary" className={actionButtonClassName}>
            Log In with Apple
          </Button>
        </div>
      </form>

      <div className="mt-8 border-t border-amber-200 pt-6 text-sm text-amber-600">
        No account yet?{' '}
        <Link
          to="/auth/signup"
          className="font-semibold text-amber-900 transition hover:text-amber-600"
          aria-label="Navigate to sign up page"
        >
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default SignInPage;