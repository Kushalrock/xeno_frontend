// ProductsTable.jsx
import React from 'react';
import Spinner from '../ui/Spinner';

export default function ProductsTable({ data, loading, error }) {
  return (
    <div className="overflow-x-auto">
      {loading ? <Spinner /> : error ? <div className="text-red-500 text-sm">Failed to load products.</div> : (
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">SKU</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Stock</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">{p.sku}</td>
                <td className="px-4 py-2">{p.price?.toFixed(2) ?? '--'}</td>
                <td className="px-4 py-2">{p.stock ?? '--'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
