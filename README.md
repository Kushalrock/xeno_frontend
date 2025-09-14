# Xeno Dashboard (Next.js 13)

A production-grade, highly interactive dashboard built with Next.js 13 (App Router, JavaScript), TailwindCSS, React Query, Axios, and Recharts. Connects to a Node/Express backend via `NEXT_PUBLIC_API_URL`.

---

## 🚀 Features

- Auth (signup/login/logout, JWT in localStorage)
- Dashboard: metric cards, charts, tables
- Tenant, Products, Customers pages
- "Sync Now" action (optimistic UI)
- Responsive, accessible, clean UI
- Loading skeletons, polling, brush/zoom, date-range filters, tooltips, sorting
- Navbar settings for `x-api-key` (memory only)

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

- `app/` — Next.js App Router pages
- `components/` — UI, charts, tables, auth, layout
- `lib/` — API, fetchers, auth helpers
- `hooks/` — Custom React hooks

---

## 📝 Notes

- JWT is stored in `localStorage` as `auth_token` (easy to switch to HttpOnly cookies later)
- API key in Navbar is memory-only (not persisted)
- For production, review security and error handling

---

## 🖥️ Run

```sh
npm run dev
```

---

## 📧 Contact

For questions, open an issue or contact the maintainer.
