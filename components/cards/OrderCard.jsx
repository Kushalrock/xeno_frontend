import React from 'react';

export default function OrderCard({ order, onClick }) {
  const customer = order.customer || {};
  return (
    <div className="bg-white rounded shadow p-4 mb-2 cursor-pointer hover:bg-gray-50" onClick={onClick}>
      <div className="flex justify-between items-center">
        <div>
          <div className="font-semibold text-black">Order #{order.shopifyId || order.id}</div>
          <div className="text-sm text-gray-600">
            {customer.firstName || ''} {customer.lastName || ''} {customer.email ? `(${customer.email})` : ''}
          </div>
        </div>
        <div className="text-right">
          <div className="font-medium text-black">{order.totalPrice?.toLocaleString(undefined, { maximumFractionDigits: 2 })} {order.currency || ''}</div>
          <div className="text-xs text-gray-500">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '--'}</div>
        </div>
      </div>
    </div>
  );
}
