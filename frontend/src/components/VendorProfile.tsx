import React from 'react';
import { Vendor } from '@/models/vendor';

interface VendorProfileProps {
  vendor: Vendor;
}

const VendorProfile: React.FC<VendorProfileProps> = ({ vendor }) => {
  return (
    <div>
      <h1>{vendor.name}</h1>
      <p>{vendor.description}</p>
    </div>
  );
};

export default VendorProfile;