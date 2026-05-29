import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { loginUser } from '../../services/UserService';

const inputClasses =
  'mt-2 w-full rounded-xl border border-amber-300 bg-amber-100 px-4 py-3 text-sm text-amber-900 outline-none transition placeholder:text-amber-400 focus:border-amber-900 focus:bg-amber-50';

const actionButtonClassName = 'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

export function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await loginUser({ email, password });
      const { token, type, firstName } = response.data;

      if (type === 'viewer') {
        setError('Access denied: Viewers are restricted from logging into the dashboard system.');
        setLoading(false);
        return;
      }

      localStorage.setItem('token', token);
      localStorage.setItem('userRole', type);
      localStorage.setItem('firstName', firstName);

      if (type === 'admin' || type === 'editor') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email credentials or server failure.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight !text-amber-900 sm:text-4xl">Account Sign In</h1>
      <p className="mt-3 text-sm leading-6 text-amber-600">
        Enter your email address and password to sign in.
      </p>

      {error && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="signin-email" className="text-sm font-medium text-amber-700">
            Email Address
          </label>
          <input
            id="signin-email"
            type="email"
            placeholder="Email address"
            autoComplete="email"
            className={inputClasses}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button type="submit" variant="primary" className={actionButtonClassName}>
          {loading ? 'Signing In...' : 'Sign In'}
        </Button>

        <div className="mt-4 text-sm text-amber-600">
          Don&apos;t have an account?{' '}
          <Link to="/auth/signup" className="font-semibold text-amber-900 transition hover:text-amber-600">
            Create one
          </Link>
        </div>
      </form>
    </div>
  );
}
