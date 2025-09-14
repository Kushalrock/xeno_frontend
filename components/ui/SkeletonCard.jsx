// SkeletonCard.jsx
import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-gray-100 rounded-lg h-24 w-full flex items-center justify-center">
      <div className="h-6 w-1/2 bg-gray-200 rounded" />
    </div>
  );
}
