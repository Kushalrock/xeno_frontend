// TopCustomersChart.jsx
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Spinner from '../ui/Spinner';

export default function TopCustomersChart({ data, loading, error }) {
  const [sortBy, setSortBy] = useState('totalSpent');
  // Defensive: map to chart shape
  const customers = (data || []).map(c => ({
    ...c,
    name: `${c.firstName || ''} ${c.lastName || ''}`.trim(),
    totalSpent: c.totalSpent ?? 0,
    orderCount: c.orderCount ?? 0,
  }));
  const sorted = [...customers].sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <button className={`btn btn-xs ${sortBy === 'totalSpent' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setSortBy('totalSpent')}>By Revenue</button>
        <button className={`btn btn-xs ${sortBy === 'orderCount' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setSortBy('orderCount')}>By Orders</button>
      </div>
      {loading ? <Spinner /> : error ? <div className="text-red-500 text-sm">Failed to load customers.</div> : (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={sorted.slice(0, 10)} layout="vertical" margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <XAxis type="number" tick={{ fontSize: 12 }} />
            <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={100} />
            <Tooltip />
            <Bar dataKey={sortBy} fill="#f59e42" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
