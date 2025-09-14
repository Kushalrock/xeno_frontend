"use client";
// app/layout.jsx
import './globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import React from 'react';

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
          <Footer />
        </QueryClientProvider>
      </body>
    </html>
  );
}
