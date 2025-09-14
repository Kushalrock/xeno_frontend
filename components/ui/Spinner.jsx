// Spinner.jsx
import React from 'react';

export default function Spinner({ size = 'md' }) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-10 w-10',
  };
  return (
    <span className={`inline-block animate-spin border-2 border-t-transparent border-gray-400 rounded-full ${sizes[size]}`}></span>
  );
}
