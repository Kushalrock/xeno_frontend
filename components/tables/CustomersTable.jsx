// CustomersTable.jsx
import React from 'react';
import Spinner from '../ui/Spinner';

export default function CustomersTable({ data, loading, error }) {
  return (
    <div className="overflow-x-auto">
      {loading ? <Spinner /> : error ? <div className="text-red-500 text-sm">Failed to load customers.</div> : (
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Orders</th>
              <th className="px-4 py-2 text-left">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((c) => (
              <tr key={c.id} className="border-b">
                <td className="px-4 py-2">{c.name}</td>
                <td className="px-4 py-2">{c.email}</td>
                <td className="px-4 py-2">{c.orders ?? '--'}</td>
                <td className="px-4 py-2">${c.revenue?.toFixed(2) ?? '--'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
