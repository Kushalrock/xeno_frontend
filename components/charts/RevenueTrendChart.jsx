// RevenueTrendChart.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Spinner from '../ui/Spinner';

export default function RevenueTrendChart({ data, loading, error }) {
  return (
    <div>
      {loading ? <Spinner /> : error ? <div className="text-red-500 text-sm">Failed to load revenue trends.</div> : (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} width={40} />
            <Tooltip />
            <Bar dataKey="revenue" fill="#34d399" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
