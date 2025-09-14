import React, { useState } from 'react';
import SkeletonCard from '../ui/SkeletonCard';
import Toast from '../ui/Toast';

export default function YourInventoryCard({ data, loading, error, total, page, limit, onPageChange }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="font-semibold mb-2 text-black">Your Inventory</h2>
      {loading ? (
        <SkeletonCard />
      ) : error ? (
        <Toast type="error" message="Failed to load products." />
      ) : data && data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-1 text-left text-black">Title</th>
                <th className="px-2 py-1 text-left text-black">Price</th>
                <th className="px-2 py-1 text-left text-black">Inventory</th>
                <th className="px-2 py-1 text-left text-black">Updated</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="border-b last:border-b-0">
                  <td className="px-2 py-1 text-black">{item.title}</td>
                  <td className="px-2 py-1 text-black">{item.price?.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                  <td className="px-2 py-1 text-black">{item.inventory}</td>
                  <td className="px-2 py-1 text-black">{item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : '--'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          {total > limit && (
            <div className="flex justify-end mt-2 gap-2">
              <button className="btn btn-xs" onClick={() => onPageChange(page - 1)} disabled={page <= 1}>Prev</button>
              <span className="text-xs text-black">Page {page}</span>
              <button className="btn btn-xs" onClick={() => onPageChange(page + 1)} disabled={page * limit >= total}>Next</button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-gray-500">No products found.</div>
      )}
    </div>
  );
}
