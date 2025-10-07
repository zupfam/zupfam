import { GetServerSideProps } from 'next';
import { Vendor } from '@/models/vendor';
import { Dish } from '@/models/dish';
import { Status } from '@/models/status';
import { getVendorData, getMenuData, getStatusesData } from '@/services/google-sheets';
import DishList from '@/components/DishList';
import StatusView from '@/components/StatusView';
import VendorProfile from '@/components/VendorProfile';

interface VendorPageProps {
  vendor: Vendor | null;
  menu: Dish[];
  statuses: Status[];
  vendorId: string;
}

const VendorPage = ({ vendor, menu, statuses, vendorId }: VendorPageProps) => {
  if (!vendor) {
    return <div>Vendor not found</div>;
  }

  return (
    <div>
      <VendorProfile vendor={vendor} />
      {statuses.map((status) => (
        <StatusView key={status.id} status={status} />
      ))}
      <DishList dishes={menu} vendorId={vendorId} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const vendorId = context.params?.vendorId as string;

  if (!vendorId) {
    return { notFound: true };
  }

  try {
    const [vendorData, menuData, statusesData] = await Promise.all([
      getVendorData(vendorId),
      getMenuData(vendorId),
      getStatusesData(vendorId),
    ]);

    return {
      props: {
        vendor: vendorData || null,
        menu: menuData || [],
        statuses: statusesData || [],
        vendorId: vendorId,
      },
    };
  } catch (error) {
    console.error(`Failed to fetch data for vendor ${vendorId}:`, error);
    return { notFound: true };
  }
};

export default VendorPage;