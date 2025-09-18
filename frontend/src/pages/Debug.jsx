import React from 'react';
import { useLocation } from 'react-router-dom';

const Debug = () => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Debug Page</h1>
        <p className="text-gray-700 mb-4">
          <strong>Current Path:</strong> {location.pathname}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Search:</strong> {location.search}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Hash:</strong> {location.hash}
        </p>
        <div className="mt-6">
          <a href="/" className="text-green-600 hover:underline mr-4">Home</a>
          <a href="/about" className="text-green-600 hover:underline mr-4">About</a>
          <a href="/admin/login" className="text-green-600 hover:underline">Admin</a>
        </div>
      </div>
    </div>
  );
};

export default Debug;
