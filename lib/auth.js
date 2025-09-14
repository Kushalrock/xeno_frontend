// lib/auth.js
import api from './api';


export async function login(email, password) {
  const { data } = await api.post('/api/user/login', { email, password });
  if (!data?.token) throw new Error('No token returned');
  localStorage.setItem('auth_token', data.token);
  if (data.tenantId) localStorage.setItem('tenant_id', data.tenantId);
  if (data.apiKey) localStorage.setItem('api_key', data.apiKey);
  if (data.name) localStorage.setItem('name', data.name);
  return data;
}


export async function signup(email, password, name, tenantId) {
  const { data } = await api.post('/api/user/signup', { email, password, name, tenantId });
  if (!data?.token) throw new Error('No token returned');
  localStorage.setItem('auth_token', data.token);
  if (data.tenantId) localStorage.setItem('tenant_id', data.tenantId);
  if (data.apiKey) localStorage.setItem('api_key', data.apiKey);
  if (data.name) localStorage.setItem('name', data.name);
  return data;
}

export function logout() {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('name');
  window.location.href = '/login';
}

export function getToken() {
  return localStorage.getItem('auth_token');
}
