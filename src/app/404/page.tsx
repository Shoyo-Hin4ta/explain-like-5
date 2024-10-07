"use client";

import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full text-center">
      <h1 className="text-4xl font-bold text-indigo-600 mb-4">404 - Page Not Found</h1>
      <p className="text-xl text-gray-600 mb-8">Sorry, the page you are looking for does not exist.</p>
      <Link 
        href="/" 
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition duration-300 ease-in-out"
      >
        Go back to home
      </Link>
    </div>
  );
}