// app/login/page.jsx
'use client';
import LoginForm from '../../components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-black">Login</h1>
      <LoginForm />
    </div>
  );
}
