import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Vendor } from '@/models/vendor';
import { Dish } from '@/models/dish';
import { Status } from '@/models/status';
import { getVendorData, getMenuData, getStatusesData } from '@/services/google-sheets';
import DishList from '@/components/DishList';
import Skeleton from '@/components/Skeleton';
import StatusView from '@/components/StatusView';
import VendorProfile from '@/components/VendorProfile';

const VendorPage = () => {
  const router = useRouter();
  const { vendorId } = router.query;
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [menu, setMenu] = useState<Dish[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (vendorId) {
      Promise.all([
        getVendorData(vendorId as string),
        getMenuData(vendorId as string),
        getStatusesData(vendorId as string),
      ]).then(([vendorData, menuData, statusesData]) => {
        setVendor(vendorData);
        setMenu(menuData);
        setStatuses(statusesData);
        setLoading(false);
      });
    }
  }, [vendorId]);

  if (loading) {
    return <Skeleton />;
  }

  if (!vendor) {
    return <div>Vendor not found</div>;
  }

  return (
    <div>
      <VendorProfile vendor={vendor} />
      {statuses.map((status) => (
        <StatusView key={status.id} status={status} />
      ))}
      <DishList dishes={menu} />
    </div>
  );
};

export default VendorPage;
