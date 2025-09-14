// hooks/useAuth.js
import { useState } from 'react';
import { login as loginApi, signup as signupApi, logout as logoutApi, getToken } from '../lib/auth';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await loginApi(email, password);
      setUser(data.user || null);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email, password, name, tenantId) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await signupApi(email, password, name, tenantId);
      setUser(data.user || null);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    logoutApi();
    setUser(null);
  };

  return { login, signup, logout, isLoading, error, user };
}
