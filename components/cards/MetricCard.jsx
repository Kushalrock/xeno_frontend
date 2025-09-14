// MetricCard.jsx
import React from 'react';
import Spinner from '../ui/Spinner';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

export default function MetricCard({ title, value, trend, loading, sparkline }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 min-h-[6rem]">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">{title}</div>
        {loading && <Spinner size="sm" />}
      </div>
      <div className="text-2xl font-bold">{value ?? '--'}</div>
      <div className="flex items-center gap-2">
        <span className={`text-xs ${trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-400'}`}>{trend > 0 ? '+' : ''}{trend}%</span>
        {sparkline && (
          <div className="w-20 h-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparkline} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                <Area type="monotone" dataKey="value" stroke="#60a5fa" fill="#dbeafe" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
