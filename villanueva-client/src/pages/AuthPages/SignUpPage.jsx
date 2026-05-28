import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses =
  'mt-2 w-full rounded-xl border border-amber-300 bg-amber-100 px-4 py-3 text-sm text-amber-900 outline-none transition placeholder:text-amber-400 focus:border-amber-900 focus:bg-amber-50';

const actionButtonClassName = 'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const SignUpPage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight !text-amber-900 sm:text-4xl">Sign Up</h1>
      <p className="mt-3 text-sm leading-6 text-amber-600">
        Create an account to access RJ's website IkoSite and its contents.
      </p>

      <form className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="text-sm font-medium text-amber-700">
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              placeholder="First name"
              autoComplete="given-name"
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="last-name" className="text-sm font-medium text-amber-700">
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              placeholder="Last name"
              autoComplete="family-name"
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label htmlFor="signup-email" className="text-sm font-medium text-amber-700">
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            placeholder="student@email.com"
            autoComplete="email"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="signup-password" className="text-sm font-medium text-amber-700">
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            className={inputClasses}
          />
          <p className="mt-2 text-xs leading-5 text-amber-500">
            Use a secure password with letters, numbers, and symbols.
          </p>
        </div>

        <Button type="submit" variant="primary" className={actionButtonClassName}>
          Create Account
        </Button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button type="button" variant="secondary" className={actionButtonClassName}>
            Sign Up with Google
          </Button>
          <Button type="button" variant="secondary" className={actionButtonClassName}>
            Sign Up with Apple
          </Button>
        </div>
      </form>

      <div className="mt-8 border-t border-amber-200 pt-6 text-sm text-amber-600">
        Already have an account?{' '}
        <Link
          to="/auth/signin"
          className="font-semibold text-amber-900 transition hover:text-amber-600"
          aria-label="Navigate to sign in page"
        >
          Log In
        </Link>
      </div>
    </>
  );
};

export default SignUpPage;