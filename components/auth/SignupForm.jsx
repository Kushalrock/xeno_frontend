// SignupForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Spinner from '../ui/Spinner';
import Toast from '../ui/Toast';


export default function SignupForm() {
  const { signup, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [tenantId, setTenantId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password, name, tenantId);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-black">Name</label>
        <input
          id="name"
          type="text"
          required
          className="input input-bordered w-full text-black"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="tenantId" className="block text-sm font-medium text-black">Tenant ID</label>
        <input
          id="tenantId"
          type="text"
          required
          className="input input-bordered w-full text-black"
          value={tenantId}
          onChange={e => setTenantId(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-black">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          className="input input-bordered w-full text-black"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-black">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          required
          className="input input-bordered w-full text-black"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary w-full bg-blue-500 text-white" disabled={isLoading}>
        {isLoading ? <Spinner size="sm" /> : 'Sign Up'}
      </button>
      {error && <Toast type="error" message={error} />}
      <div className="text-center mt-4">
        <span className="text-sm text-gray-600">Already have an account? </span>
        <a href="/login" className="text-blue-600 hover:underline">Login</a>
      </div>
    </form>
  );
}
