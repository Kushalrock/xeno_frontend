// app/dashboard/page.jsx
'use client';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMetrics, fetchRevenueTrends, fetchTopCustomers, syncNow, fetchOrderStats, fetchLowInventory, fetchTopSellingProducts } from '../../lib/fetchers';
import { useTenantId } from '../../hooks/useTenantId';
import MetricCard from '../../components/cards/MetricCard';
import RevenueTrendChart from '../../components/charts/RevenueTrendChart';
import TopCustomersChart from '../../components/charts/TopCustomersChart';
import SkeletonCard from '../../components/ui/SkeletonCard';
import Toast from '../../components/ui/Toast';
import LowInventoryCard from '../../components/cards/LowInventoryCard';
import TopSellingProductsCard from '../../components/cards/TopSellingProductsCard';
  

export default function DashboardPage() {
  const tenantId = useTenantId();
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [showToast, setShowToast] = useState(null);
  const { data: topSelling, isLoading: topSellingLoading, error: topSellingError } = useQuery({
    queryKey: ['topSellingProducts', tenantId],
    queryFn: () => fetchTopSellingProducts(tenantId),
    enabled: !!tenantId,
  });
  // Low inventory products
  const { data: lowInventory, isLoading: lowInventoryLoading, error: lowInventoryError } = useQuery({
    queryKey: ['lowInventory', tenantId],
    queryFn: () => fetchLowInventory(tenantId),
    enabled: !!tenantId,
  });

  // Metrics polling every 60s
  const { data: metrics, isLoading: metricsLoading, error: metricsError, refetch: refetchMetrics } = useQuery({
    queryKey: ['metrics', tenantId],
    queryFn: () => fetchMetrics(tenantId),
    enabled: !!tenantId,
    refetchInterval: 60000,
  });


  // Order statistics card
  const { data: orderStats, isLoading: orderStatsLoading, error: orderStatsError, refetch: refetchOrderStats } = useQuery({
    queryKey: ['orderStats', tenantId],
    queryFn: () => fetchOrderStats(tenantId),
    enabled: !!tenantId,
    refetchInterval: 60000,
  });

  // Revenue trends
  const { data: revenue, isLoading: revenueLoading, error: revenueError } = useQuery({
    queryKey: ['revenue', tenantId],
    queryFn: () => fetchRevenueTrends(tenantId),
    enabled: !!tenantId,
  });

  // Top customers
  const { data: topCustomers, isLoading: topCustomersLoading, error: topCustomersError } = useQuery({
    queryKey: ['topCustomers', tenantId],
    queryFn: () => fetchTopCustomers(tenantId),
    enabled: !!tenantId,
  });

  const [syncing, setSyncing] = useState(false);

  const handleSyncNow = async () => {
    if (!tenantId) return;
    setSyncing(true);
    setShowToast(null);
    try {
      await syncNow(tenantId);
      setShowToast({ type: 'success', message: 'Sync started successfully!' });
  // Optimistically refetch metrics and order stats
  refetchMetrics();
  refetchOrderStats();
    } catch (err) {
      setShowToast({ type: 'error', message: err?.response?.data?.message || 'Sync failed.' });
    } finally {
      setSyncing(false);
      setTimeout(() => setShowToast(null), 4000);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Sync Now Button */}
      <div className="flex justify-end mb-2">
        <button className="btn btn-primary" onClick={handleSyncNow} disabled={syncing || !tenantId} aria-label="Sync Now">
          {syncing ? 'Syncing...' : 'Sync Now'}
        </button>
      </div>
      {showToast && <Toast type={showToast.type} message={showToast.message} />}

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricsLoading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        ) : metricsError ? (
          <Toast type="error" message="Failed to load metrics." />
        ) : (
          metrics?.cards?.map((card, i) => <MetricCard key={i} {...card} />)
        )}
      </div>


      {/* Order Statistics Card and Revenue Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded shadow p-4">
          <h2 className="font-semibold mb-2 text-black">Order Statistics</h2>
          {orderStatsLoading ? <SkeletonCard /> : orderStatsError ? (
            <Toast type="error" message="Failed to load order statistics." />
          ) : orderStats?.data ? (
            <div className="space-y-2">
              <div className='text-black'><span className="font-medium text-black">Total Orders:</span> {orderStats.data.totalOrders ?? '--'}</div>
              <div className='text-black'><span className="font-medium text-black">Total Revenue:</span> {orderStats.data.totalRevenue?.toLocaleString(undefined, { maximumFractionDigits: 2 }) ?? '--'} INR</div>
              <div className='text-black'><span className="font-medium text-black">Average Order Value:</span> {orderStats.data.averageOrderValue?.toLocaleString(undefined, { maximumFractionDigits: 2 }) ?? '--'} INR</div>
              <div className='text-black'><span className="font-medium text-black">Recent Orders (30d):</span> {orderStats.data.recentOrders ?? '--'}</div>
              <div className='text-black'><span className="font-medium text-black">Recent Revenue (30d):</span> {orderStats.data.recentRevenue?.toLocaleString(undefined, { maximumFractionDigits: 2 }) ?? '--'} INR</div>
            </div>
          ) : null}
        </div>
        <div className="bg-white rounded shadow p-4">
          <h2 className="font-semibold mb-2 text-black">Revenue Trends</h2>
          <RevenueTrendChart data={revenue?.data?.trends || []} loading={revenueLoading} error={revenueError} />
        </div>
      </div>

      {/* Top Customers Table */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2 text-black">Top Customers</h2>
        <TopCustomersChart data={topCustomers?.data?.customers || []} loading={topCustomersLoading} error={topCustomersError} />
      </div>

      {/* Low Inventory and Top Selling Products Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LowInventoryCard data={lowInventory?.data || []} loading={lowInventoryLoading} error={lowInventoryError} />
        <TopSellingProductsCard data={topSelling?.data || []} loading={topSellingLoading} error={topSellingError} />
      </div>
    </div>
  );
}
