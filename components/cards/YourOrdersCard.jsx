import React, { useState } from 'react';
import OrderCard from './OrderCard';
import OrderDetailsModal from './OrderDetailsModal';
import SkeletonCard from '../ui/SkeletonCard';
import Toast from '../ui/Toast';

export default function YourOrdersCard({ data, loading, error, total, page, limit, onPageChange }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  return (
    <div className="bg-white rounded shadow p-4 mt-4">
      <h2 className="font-semibold mb-2 text-black">Your Orders</h2>
      {loading ? (
        <SkeletonCard />
      ) : error ? (
        <Toast type="error" message="Failed to load orders." />
      ) : data && data.length > 0 ? (
        <>
          <div className="grid gap-2">
            {data.map((order) => (
              <OrderCard key={order.id} order={order} onClick={() => setSelectedOrder(order)} />
            ))}
          </div>
          {/* Pagination */}
          {total > limit && (
            <div className="flex justify-end mt-2 gap-2">
              <button className="btn btn-xs" onClick={() => onPageChange(page - 1)} disabled={page <= 1}>Prev</button>
              <span className="text-xs text-black">Page {page}</span>
              <button className="btn btn-xs" onClick={() => onPageChange(page + 1)} disabled={page * limit >= total}>Next</button>
            </div>
          )}
          <OrderDetailsModal order={selectedOrder} open={!!selectedOrder} onClose={() => setSelectedOrder(null)} />
        </>
      ) : (
        <div className="text-gray-500">No orders found.</div>
      )}
    </div>
  );
}
