// Toast.jsx
import React from 'react';

export default function Toast({ type = 'info', message }) {
  const colors = {
    info: 'bg-blue-100 text-blue-800',
    error: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    success: 'bg-green-100 text-green-800',
  };
  return (
    <div className={`rounded px-4 py-2 mt-2 text-sm ${colors[type]}`}>{message}</div>
  );
}
