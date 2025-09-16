import React from 'react';

const Loader = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={`animate-spin rounded-full border-4 border-primary-200 border-t-primary-500 ${sizeClasses[size]}`}></div>
      {text && <p className="mt-2 text-sm text-secondary-600">{text}</p>}
    </div>
  );
};

// Full page loader
export const PageLoader = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-500 mx-auto"></div>
        <p className="mt-4 text-lg text-secondary-600">Loading...</p>
      </div>
    </div>
  );
};

// Button loader
export const ButtonLoader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
      <span className="ml-2">Loading...</span>
    </div>
  );
};

// Skeleton loader for cards
export const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-secondary-200 p-6 animate-pulse">
      <div className="w-full h-48 bg-secondary-200 rounded-lg mb-4"></div>
      <div className="h-4 bg-secondary-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-secondary-200 rounded w-1/2 mb-4"></div>
      <div className="h-8 bg-secondary-200 rounded w-1/4"></div>
    </div>
  );
};

// Skeleton loader for table rows
export const SkeletonTableRow = () => {
  return (
    <tr className="animate-pulse">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-secondary-200 rounded w-24"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-secondary-200 rounded w-32"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-secondary-200 rounded w-20"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-secondary-200 rounded w-16"></div>
      </td>
    </tr>
  );
};

export default Loader;
export { Loader };
