// OrdersChart.jsx
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Brush } from 'recharts';
import Spinner from '../ui/Spinner';
import DateRangePicker from '../ui/DateRangePicker';

const presets = [
  { label: '7d', range: { from: getNDaysAgo(7), to: today() } },
  { label: '30d', range: { from: getNDaysAgo(30), to: today() } },
  { label: '90d', range: { from: getNDaysAgo(90), to: today() } },
];

function today() {
  return new Date().toISOString().slice(0, 10);
}
function getNDaysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

export default function OrdersChart({ data, loading, error, dateRange, setDateRange, refetch }) {
  const [live, setLive] = useState(false);

  React.useEffect(() => {
    if (!live) return;
    const interval = setInterval(() => refetch(), 15000);
    return () => clearInterval(interval);
  }, [live, refetch]);

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
  <DateRangePicker value={dateRange} onChange={setDateRange} presets={presets} />
        <button className={`btn btn-xs ml-2 text-black ${live ? 'btn-primary' : 'btn-outline'}`} onClick={() => setLive(l => !l)}>{live ? 'Live: On' : 'Live: Off'}</button>
      </div>
      {loading ? <Spinner /> : error ? <div className="text-red-500 text-sm">Failed to load orders.</div> : (
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <XAxis dataKey="date" tick={{ fontSize: 12, color: '#000000' }} />
            <YAxis tick={{ fontSize: 12 }} width={40} />
            <Tooltip />
            <Area type="monotone" dataKey="orders" stroke="#6366f1" fill="#c7d2fe" strokeWidth={2} />
            <Brush dataKey="date" height={18} stroke="#6366f1" />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
