// app/signup/page.jsx
'use client';
import SignupForm from '../../components/auth/SignupForm';

export default function SignupPage() {
  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-black">Sign Up</h1>
      <SignupForm />
    </div>
  );
}
