// hooks/useRequireAuth.js
import { useEffect, useState } from 'react';
import { getToken } from '../lib/auth';

export function useRequireAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getToken();
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  return { isLoading, isAuthenticated };
}
