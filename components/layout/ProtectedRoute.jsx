// ProtectedRoute.jsx
import React from 'react';
import { useRequireAuth } from '../../hooks/useRequireAuth';
import Spinner from '../ui/Spinner';

export default function ProtectedRoute({ children }) {
  const { isLoading, isAuthenticated } = useRequireAuth();
  if (isLoading) return <Spinner />;
  if (!isAuthenticated) return null;
  return children;
}
