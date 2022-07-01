import React from 'react';

const BillingsListSkeleton = () => {
  return (
    <div className="space-y-8 w-full">
      <div className="border border-white shadow-sm overflow-hidden sm:rounded-2xl divide-y-8 divide-white">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="flex items-center h-20 bg-gray-200 animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default BillingsListSkeleton;
