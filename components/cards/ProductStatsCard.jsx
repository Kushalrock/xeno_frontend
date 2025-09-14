import React from 'react';
import SkeletonCard from '../ui/SkeletonCard';
import Toast from '../ui/Toast';

export default function ProductStatsCard({ data, loading, error }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="font-semibold mb-2 text-black">Product Statistics</h2>
      {loading ? (
        <SkeletonCard />
      ) : error ? (
        <Toast type="error" message="Failed to load product statistics." />
      ) : data ? (
        <div className="space-y-2">
          <div className="text-black"><span className="font-medium">Total Products:</span> {data.totalProducts ?? '--'}</div>
          <div className="text-black"><span className="font-medium">Average Price:</span> {data.averagePrice?.toLocaleString(undefined, { maximumFractionDigits: 2 }) ?? '--'}</div>
          <div className="text-black"><span className="font-medium">Min Price:</span> {data.minPrice?.toLocaleString(undefined, { maximumFractionDigits: 2 }) ?? '--'}</div>
          <div className="text-black"><span className="font-medium">Max Price:</span> {data.maxPrice?.toLocaleString(undefined, { maximumFractionDigits: 2 }) ?? '--'}</div>
          <div className="text-black"><span className="font-medium">Recent Products (30d):</span> {data.recentProducts ?? '--'}</div>
        </div>
      ) : (
        <div className="text-gray-500">No product statistics available.</div>
      )}
    </div>
  );
}
