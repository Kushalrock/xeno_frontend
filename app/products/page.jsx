// app/products/page.jsx
'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTenantId } from '../../hooks/useTenantId';
import { fetchLowInventory, fetchTopSellingProducts, fetchProductStats, fetchProducts } from '../../lib/fetchers';
import LowInventoryCard from '../../components/cards/LowInventoryCard';
import TopSellingProductsCard from '../../components/cards/TopSellingProductsCard';
import ProductStatsCard from '../../components/cards/ProductStatsCard';
import YourInventoryCard from '../../components/cards/YourInventoryCard';

export default function ProductsPage() {
  const tenantId = useTenantId();
  const [page, setPage] = React.useState(1);
  const limit = 20;

  // Low inventory
  const { data: lowInventory, isLoading: lowInventoryLoading, error: lowInventoryError } = useQuery({
    queryKey: ['lowInventory', tenantId],
    queryFn: () => fetchLowInventory(tenantId),
    enabled: !!tenantId,
  });

  // Top selling products
  const { data: topSelling, isLoading: topSellingLoading, error: topSellingError } = useQuery({
    queryKey: ['topSellingProducts', tenantId],
    queryFn: () => fetchTopSellingProducts(tenantId),
    enabled: !!tenantId,
  });

  // Product stats
  const { data: productStats, isLoading: productStatsLoading, error: productStatsError } = useQuery({
    queryKey: ['productStats', tenantId],
    queryFn: () => fetchProductStats(tenantId),
    enabled: !!tenantId,
  });

  // All products (inventory)
  const { data: productsData, isLoading: productsLoading, error: productsError } = useQuery({
    queryKey: ['products', tenantId, page, limit],
    queryFn: () => fetchProducts(tenantId, { page, limit }),
    enabled: !!tenantId,
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LowInventoryCard data={lowInventory?.data || []} loading={lowInventoryLoading} error={lowInventoryError} />
        <TopSellingProductsCard data={topSelling?.data || []} loading={topSellingLoading} error={topSellingError} />
      </div>
      <ProductStatsCard data={productStats?.data || null} loading={productStatsLoading} error={productStatsError} />
      <YourInventoryCard
        data={productsData?.data?.products || []}
        loading={productsLoading}
        error={productsError}
        total={productsData?.data?.total || 0}
        page={productsData?.data?.page || page}
        limit={productsData?.data?.limit || limit}
        onPageChange={setPage}
      />
    </div>
  );
}
