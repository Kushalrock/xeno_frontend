// Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-4 text-center text-gray-400 text-xs border-t mt-8">
      &copy; {new Date().getFullYear()} Xeno Dashboard. All rights reserved.
    </footer>
  );
}
