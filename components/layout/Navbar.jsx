"use client";
// Navbar.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Toast from '../ui/Toast';

export default function Navbar() {
  const { logout } = useAuth();
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      setIsAuthenticated(!!token);
      let name = localStorage.getItem('name');
      if (name) {
        setFirstName(name.split(' ')[0]);
      } else {
        // fallback: try to get email for greeting
        const email = localStorage.getItem('email');
        if (email) {
          setFirstName(email.split('@')[0]);
        } else {
          setFirstName('');
        }
      }
    }
  }, []);

  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
    setShowWarning(true);
  };

  // Handle click on logo/title
  const handleLogoClick = (e) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && localStorage.getItem('auth_token')) {
      window.location.href = '/dashboard';
    } else {
      window.location.href = '/login';
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-background shadow text-foreground">
      <button className="font-bold text-xl tracking-tight bg-transparent border-none p-0 m-0 hover:underline" style={{cursor:'pointer'}} onClick={handleLogoClick} aria-label="Go to dashboard or login">
        Hi, {firstName || 'Guest'}
      </button>
      <div className="flex items-center gap-4">
        {!isAuthenticated ? (
          <>
            <a href="/login" className="btn btn-outline" tabIndex={0}>Login</a>
            <a href="/signup" className="btn btn-primary" tabIndex={0}>Sign Up</a>
          </>
        ) : (
          <>
            <a href="/dashboard" className="btn btn-link">Dashboard</a>
            <a href="/products" className="btn btn-link">Products</a>
            <a href="/customers" className="btn btn-link">Customers</a>
            <button className="btn btn-outline bg-red-500 text-white px-2 py-2" onClick={logout}>Logout</button>
          </>
        )}
      </div>
      {showSettings && (
        <div className="absolute right-6 top-16 bg-white border rounded shadow-lg p-4 z-50 w-80">
          <label className="block text-sm font-medium mb-2">x-api-key (memory only)</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={apiKey}
            onChange={handleApiKeyChange}
            aria-label="x-api-key"
          />
          {showWarning && (
            <Toast type="warning" message="API key is stored in memory only. Do not store sensitive keys in localStorage." />
          )}
        </div>
      )}
    </nav>
  );
}
