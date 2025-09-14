// GET /api/orders/:tenantId?page=1&limit=20&from=&to=&customerId=
export const fetchOrders = async (tenantId, params = {}) => {
  if (!tenantId) throw new Error('tenantId is required');
  const apiKey = typeof window !== 'undefined' ? localStorage.getItem('api_key') : null;
  const { data } = await api.get(`/api/orders/${tenantId}`, {
    params,
    headers: apiKey ? { 'x-api-key': apiKey } : {},
  });
  return data;
};
// GET /api/metrics/:tenantId/customer-acquisition-trends?months=12
export const fetchCustomerAcquisitionTrends = async (tenantId, { months = 12 } = {}) => {
  if (!tenantId) throw new Error('tenantId is required');
  const apiKey = typeof window !== 'undefined' ? localStorage.getItem('api_key') : null;
  const { data } = await api.get(`/api/metrics/${tenantId}/customer-acquisition-trends`, {
    params: { months },
    headers: apiKey ? { 'x-api-key': apiKey } : {},
  });
  return data;
};
// GET /api/productstats/:tenantId/stats
export const fetchProductStats = async (tenantId) => {
  if (!tenantId) throw new Error('tenantId is required');
  const apiKey = typeof window !== 'undefined' ? localStorage.getItem('api_key') : null;
  const { data } = await api.get(`/api/productstats/${tenantId}/stats`, {
    headers: apiKey ? { 'x-api-key': apiKey } : {},
  });
  return data;
};
// GET /api/metrics/:tenantId/top-selling-products?limit=5
export const fetchTopSellingProducts = async (tenantId, { limit = 5 } = {}) => {
  if (!tenantId) throw new Error('tenantId is required');
  const apiKey = typeof window !== 'undefined' ? localStorage.getItem('api_key') : null;
  const { data } = await api.get(`/api/metrics/${tenantId}/top-selling-products`, {
    params: { limit },
    headers: apiKey ? { 'x-api-key': apiKey } : {},
  });
  return data;
};
// GET /api/inventory/:tenantId/low?threshold=10
export const fetchLowInventory = async (tenantId, { threshold = 10 } = {}) => {
  if (!tenantId) throw new Error('tenantId is required');
  const apiKey = typeof window !== 'undefined' ? localStorage.getItem('api_key') : null;
  const { data } = await api.get(`/api/inventory/${tenantId}/low`, {
    params: { threshold },
    headers: apiKey ? { 'x-api-key': apiKey } : {},
  });
  return data;
};
// GET /api/orderstats/:tenantId/stats
export const fetchOrderStats = async (tenantId) => {
  if (!tenantId) throw new Error('tenantId is required');
  const { data } = await api.get(`/api/orderstats/${tenantId}/stats`);
  return data;
};
// lib/fetchers.js
import api from './api';

// GET /api/metrics/:tenantId/summary
export const fetchMetrics = async (tenantId) => {
  const { data } = await api.get(`/api/metrics/${tenantId}/summary`);
  return data;
};

// GET /api/metrics/:tenantId/orders-by-date?from=YYYY-MM-DD&to=YYYY-MM-DD
export const fetchOrdersByDate = async (tenantId, { from, to }) => {
  if (!tenantId || !from || !to) throw new Error('tenantId, from, and to are required');
  const { data } = await api.get(`/api/metrics/${tenantId}/orders-by-date`, {
    params: { from, to }
  });
  return data;
};

// GET /api/metrics/:tenantId/revenue-trends?months=12
export const fetchRevenueTrends = async (tenantId, { months = 12 } = {}) => {
  const { data } = await api.get(`/api/metrics/${tenantId}/revenue-trends`, { params: { months } });
  return data;
};

// GET /api/metrics/:tenantId/top-customers?limit=5
export const fetchTopCustomers = async (tenantId, { limit = 5 } = {}) => {
  const { data } = await api.get(`/api/metrics/${tenantId}/top-customers`, { params: { limit } });
  return data;
};

// GET /api/products/:tenantId?page=1&limit=20&search=&minPrice=&maxPrice=
export const fetchProducts = async (tenantId, params = {}) => {
  const { data } = await api.get(`/api/products/${tenantId}`, { params });
  return data;
};

// GET /api/customers/:tenantId?page=1&limit=20&search=...
export const fetchCustomers = async (tenantId, params = {}) => {
  const { data } = await api.get(`/api/customers/${tenantId}`, { params });
  return data;
};

// POST /api/ingest/:tenantId/orders
export const syncNow = async (tenantId) => {
  const { data } = await api.post(`/api/ingest/${tenantId}/orders`);
  return data;
};
