// LoginForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Spinner from '../ui/Spinner';
import Toast from '../ui/Toast';

export default function LoginForm() {
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-black">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          className="input input-bordered w-full"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-black">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          className="input input-bordered w-full"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary w-full bg-blue-500 text-white" disabled={isLoading}>
        {isLoading ? <Spinner size="sm" /> : 'Login'}
      </button>
      {error && <Toast type="error" message={error} />}
      <div className="text-center mt-4">
        <span className="text-sm text-gray-600">Don't have an account? </span>
        <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
      </div>
    </form>
  );
}
