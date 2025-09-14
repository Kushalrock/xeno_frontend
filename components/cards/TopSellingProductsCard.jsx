import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import SkeletonCard from '../ui/SkeletonCard';
import Toast from '../ui/Toast';

const COLORS = ['#2563eb', '#10b981', '#f59e42', '#ef4444', '#a21caf', '#eab308', '#14b8a6'];

export default function TopSellingProductsCard({ data, loading, error }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="font-semibold mb-2 text-black">Top Selling Products</h2>
      {loading ? (
        <SkeletonCard />
      ) : error ? (
        <Toast type="error" message="Failed to load top selling products." />
      ) : data && data.length > 0 ? (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              dataKey="quantitySold"
              nameKey={item => item.product?.title || 'Unknown'}
              cx="50%"
              cy="50%"
              outerRadius={80}
              
            >
              {data.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name, props) => [`${value}`, 'Units Sold']} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-gray-500">No top selling products.</div>
      )}
    </div>
  );
}
