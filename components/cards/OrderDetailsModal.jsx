import React from 'react';

export default function OrderDetailsModal({ order, open, onClose }) {
  if (!open || !order) return null;
  const customer = order.customer || {};
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded shadow-lg p-6 w-full max-w-lg relative">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={onClose}>&times;</button>
        <h2 className="font-bold text-lg mb-2 text-black">Order Details</h2>
        <div className="mb-2 text-black">
          <div><span className="font-medium">Order ID:</span> {order.shopifyId || order.id}</div>
          <div><span className="font-medium">Customer:</span> {customer.firstName || ''} {customer.lastName || ''} {customer.email ? `(${customer.email})` : ''}</div>
          <div><span className="font-medium">Order Value:</span> {order.totalPrice?.toLocaleString(undefined, { maximumFractionDigits: 2 })} {order.currency || ''}</div>
          <div><span className="font-medium">Date:</span> {order.createdAt ? new Date(order.createdAt).toLocaleString() : '--'}</div>
        </div>
        <div>
          <h3 className="font-semibold mb-1 text-black">Order Items</h3>
          <table className="min-w-full text-sm mb-2">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-1 text-left text-black">Product</th>
                <th className="px-2 py-1 text-left text-black">Qty</th>
                <th className="px-2 py-1 text-left text-black">Price</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems?.map((item) => (
                <tr key={item.id} className="border-b last:border-b-0">
                  <td className="px-2 py-1 text-black">{item.product?.title || 'Unknown'}</td>
                  <td className="px-2 py-1 text-black">{item.quantity}</td>
                  <td className="px-2 py-1 text-black">{item.price?.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
