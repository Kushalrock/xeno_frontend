import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import SkeletonCard from '../ui/SkeletonCard';
import Toast from '../ui/Toast';

export default function CustomerAcquisitionTrendsChart({ data, loading, error }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="font-semibold mb-2 text-black">Customer Acquisition Trends</h2>
      {loading ? (
        <SkeletonCard />
      ) : error ? (
        <Toast type="error" message="Failed to load customer acquisition trends." />
      ) : data && data.length > 0 ? (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip formatter={(value) => [value, 'New Customers']} />
            <Bar dataKey="newCustomers" fill="#2563eb" name="New Customers" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-gray-500">No customer acquisition data.</div>
      )}
    </div>
  );
}
