# Xeno Dashboard (Next.js 13)

A production-grade, highly interactive dashboard built with Next.js 13 (App Router, JavaScript), TailwindCSS, React Query, Axios, and Recharts. Connects to a Node/Express backend via `NEXT_PUBLIC_API_URL`.

---


## 🚀 Features

- **Authentication**: Signup, login, logout, JWT in localStorage, tenant and API key support
- **Dashboard**: Metric cards, order statistics, revenue trends, top customers, low inventory, top selling products, all with real-time polling and skeleton loading
- **Products Page**: Low inventory, top selling products (pie chart), product stats, full inventory table with pagination
- **Customers Page**: Top customers, order statistics, revenue trends, customer acquisition trends (bar chart), and paginated order cards with details modal
- **Orders**: Paginated order cards, click for full order details and items in modal
- **Sync Now**: Optimistic UI for data sync
- **Responsive, accessible, clean UI**: TailwindCSS, keyboard navigation, color contrast
- **Loading skeletons, polling, tooltips, sorting, date-range filters**
- **Navbar**: User greeting, navigation, memory-only x-api-key settings
- **Strict API contract adherence**: All fetchers match backend route/headers/response specs

---

## 🛠️ Setup

1. **Clone & Install**
	```sh
	git clone <repo-url>
	cd xeno_frontend
	npm install
	```
2. **Configure Environment**
	- Create `.env.local`:
	  ```env
	  NEXT_PUBLIC_API_URL=http://localhost:3001
	  ```
3. **Run**
	```sh
	npm run dev
	```

---

## 🔑 Environment Variables

- `NEXT_PUBLIC_API_URL` — Base URL of your backend API

---

## 📡 Example Backend Endpoints

Replace `<API_URL>` with your backend base URL.

### Signup
```sh
curl -X POST <API_URL>/api/user/signup -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"pass123"}'
```

### Login
```sh
curl -X POST <API_URL>/api/user/login -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"pass123"}'
```

### Metrics Summary
```sh
curl <API_URL>/api/metrics/summary?tenantId=TENANT_ID -H "Authorization: Bearer <token>"
```

### Orders by Date
```sh
curl <API_URL>/api/orders/by-date?tenantId=TENANT_ID&start=2023-01-01&end=2023-01-31 -H "Authorization: Bearer <token>"
```

### Top Customers
```sh
curl <API_URL>/api/customers/top?tenantId=TENANT_ID -H "Authorization: Bearer <token>"
```

### Sync Now
```sh
curl -X POST <API_URL>/api/tenants/TENANT_ID/sync -H "Authorization: Bearer <token>"
```

---


## 📂 Structure

- `app/` — Next.js App Router pages (dashboard, products, customers, login, signup, etc.)
- `components/`
	- `cards/` — MetricCard, LowInventoryCard, TopSellingProductsCard, ProductStatsCard, YourInventoryCard, OrderCard, OrderDetailsModal, YourOrdersCard
	- `charts/` — RevenueTrendChart, TopCustomersChart, CustomerAcquisitionTrendsChart
	- `tables/` — ProductsTable, CustomersTable
	- `auth/`, `layout/`, `ui/` — Forms, Navbar, Toast, Spinner, etc.
- `lib/` — API, fetchers (all backend endpoints), auth helpers
- `hooks/` — Custom React hooks (auth, tenant, etc.)

---


## 📝 Notes

- JWT is stored in `localStorage` as `auth_token`, tenantId as `tenant_id`, API key as `api_key`, and user name as `name`
- API key in Navbar is memory-only (not persisted)
- All API calls use correct headers and match backend contracts
- For production, review security, error handling, and environment variables

---

## 🖥️ Run

```sh
npm run dev
```

---

## 📧 Contact

For questions, open an issue or contact the maintainer.
