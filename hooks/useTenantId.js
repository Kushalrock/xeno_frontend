// hooks/useTenantId.js
import { useState, useEffect } from 'react';

export function useTenantId() {
  const [tenantId, setTenantId] = useState(null);
  useEffect(() => {
    // Example: get from localStorage or context
    const id = localStorage.getItem('tenant_id');
    setTenantId(id);
  }, []);
  return tenantId;
}
