import React from 'react';
import { Vendor } from '@/models/vendor';

interface VendorProfileProps {
  vendor: Vendor;
}

const VendorProfile: React.FC<VendorProfileProps> = ({ vendor }) => {
  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{vendor.store_name}</h1>
      <p className="text-gray-600 dark:text-gray-300 mt-2">{vendor.food_category || 'No category available'}</p>
      <div className="mt-4">
        <a
          href={`https://wa.me/${vendor.whatsapp_number}`}
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact on WhatsApp
        </a>
      </div>
    </div>
  );
};

export default VendorProfile;