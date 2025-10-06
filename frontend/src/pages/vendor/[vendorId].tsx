import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Vendor } from '@/models/vendor';
import { Dish } from '@/models/dish';
import { getVendorData, getMenuData } from '@/services/google-sheets';
import DishList from '@/components/DishList';
import Skeleton from '@/components/Skeleton';

const VendorPage = () => {
  const router = useRouter();
  const { vendorId } = router.query;
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [menu, setMenu] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (vendorId) {
      Promise.all([
        getVendorData(vendorId as string),
        getMenuData(vendorId as string),
      ]).then(([vendorData, menuData]) => {
        setVendor(vendorData);
        setMenu(menuData);
        setLoading(false);
      });
    }
  }, [vendorId]);

  const handleContact = () => {
    if (vendor) {
      window.open(`https://wa.me/${vendor.whatsapp_number}`);
    }
  };

  if (loading) {
    return <Skeleton />;
  }

  if (!vendor) {
    return <div>Vendor not found</div>;
  }

  return (
    <div>
      <h1>{vendor.store_name}</h1>
      <p>{vendor.location}</p>
      <p>{vendor.food_category}</p>
      <p>{vendor.offer_status}</p>
      <button onClick={handleContact}>Contact Vendor</button>
      <DishList dishes={menu} />
    </div>
  );
};

export default VendorPage;
