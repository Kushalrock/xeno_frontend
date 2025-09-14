// app/customers/page.jsx
'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTenantId } from '../../hooks/useTenantId';
import { fetchTopCustomers, fetchOrderStats, fetchRevenueTrends, fetchCustomerAcquisitionTrends, fetchOrders } from '../../lib/fetchers';
import TopCustomersChart from '../../components/charts/TopCustomersChart';
import RevenueTrendChart from '../../components/charts/RevenueTrendChart';
import CustomerAcquisitionTrendsChart from '../../components/charts/CustomerAcquisitionTrendsChart';
import SkeletonCard from '../../components/ui/SkeletonCard';
import Toast from '../../components/ui/Toast';
import YourOrdersCard from '../../components/cards/YourOrdersCard';
export default function CustomersPage() {
  const tenantId = useTenantId();
  const [page, setPage] = React.useState(1);
  const limit = 20;

  // Top customers
  const { data: topCustomers, isLoading: topCustomersLoading, error: topCustomersError } = useQuery({
    queryKey: ['topCustomers', tenantId],
    queryFn: () => fetchTopCustomers(tenantId),
    enabled: !!tenantId,
  });

  // Order statistics
  const { data: orderStats, isLoading: orderStatsLoading, error: orderStatsError } = useQuery({
    queryKey: ['orderStats', tenantId],
    queryFn: () => fetchOrderStats(tenantId),
    enabled: !!tenantId,
  });

  // Revenue trends
  const { data: revenue, isLoading: revenueLoading, error: revenueError } = useQuery({
    queryKey: ['revenue', tenantId],
    queryFn: () => fetchRevenueTrends(tenantId),
    enabled: !!tenantId,
  });

  // Customer acquisition trends
  const { data: acquisition, isLoading: acquisitionLoading, error: acquisitionError } = useQuery({
    queryKey: ['customerAcquisitionTrends', tenantId],
    queryFn: () => fetchCustomerAcquisitionTrends(tenantId),
    enabled: !!tenantId,
  });

  // All orders
  const { data: ordersData, isLoading: ordersLoading, error: ordersError } = useQuery({
    queryKey: ['orders', tenantId, page, limit],
    queryFn: () => fetchOrders(tenantId, { page, limit }),
    enabled: !!tenantId,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2 text-black">Top Customers</h2>
        <TopCustomersChart data={topCustomers?.data?.customers || []} loading={topCustomersLoading} error={topCustomersError} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded shadow p-4">
          <h2 className="font-semibold mb-2 text-black">Order Statistics</h2>
          {orderStatsLoading ? <SkeletonCard /> : orderStatsError ? (
            <Toast type="error" message="Failed to load order statistics." />
          ) : orderStats?.data ? (
            <div className="space-y-2">
              <div className='text-black'><span className="font-medium text-black">Total Orders:</span> {orderStats.data.totalOrders ?? '--'}</div>
              <div className='text-black'><span className="font-medium text-black">Total Revenue:</span> {orderStats.data.totalRevenue?.toLocaleString(undefined, { maximumFractionDigits: 2 }) ?? '--'}</div>
              <div className='text-black'><span className="font-medium text-black">Average Order Value:</span> {orderStats.data.averageOrderValue?.toLocaleString(undefined, { maximumFractionDigits: 2 }) ?? '--'}</div>
              <div className='text-black'><span className="font-medium text-black">Recent Orders (30d):</span> {orderStats.data.recentOrders ?? '--'}</div>
              <div className='text-black'><span className="font-medium text-black">Recent Revenue (30d):</span> {orderStats.data.recentRevenue?.toLocaleString(undefined, { maximumFractionDigits: 2 }) ?? '--'}</div>
            </div>
          ) : null}
        </div>
        <div className="bg-white rounded shadow p-4">
          <h2 className="font-semibold mb-2 text-black">Revenue Trends</h2>
          <RevenueTrendChart data={revenue?.data?.trends || []} loading={revenueLoading} error={revenueError} />
        </div>
      </div>
      <CustomerAcquisitionTrendsChart data={acquisition?.data?.trends || []} loading={acquisitionLoading} error={acquisitionError} />
      <YourOrdersCard
        data={ordersData?.data?.orders || []}
        loading={ordersLoading}
        error={ordersError}
        total={ordersData?.data?.total || 0}
        page={ordersData?.data?.page || page}
        limit={ordersData?.data?.limit || limit}
        onPageChange={setPage}
      />
    </div>
  );
}
