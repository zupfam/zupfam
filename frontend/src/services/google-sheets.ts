import Papa from 'papaparse';
import { Dish } from '@/models/dish';
import { Vendor } from '@/models/vendor';
import vendorRoutes from '@/../vendor-routes.json';

const getSheetUrl = (vendorId: string): string | null => {
  const vendorMap = vendorRoutes as Record<string, string>;
  return vendorMap[vendorId] || null;
}

export async function getVendorData(vendorId: string): Promise<Vendor | null> {
  const sheetUrl = getSheetUrl(vendorId);
  if (!sheetUrl) {
    return null;
  }
  const response = await fetch(sheetUrl);
  const csv = await response.text();
  const parsed = Papa.parse(csv, { header: true });
  const vendorData = parsed.data[0]; // Assuming vendor data is the first row
  if (!vendorData) {
    return null;
  }
  return vendorData as Vendor;
}

export async function getMenuData(vendorId: string): Promise<Dish[]> {
  const sheetUrl = getSheetUrl(vendorId);
  if (!sheetUrl) {
    return [];
  }
  const response = await fetch(sheetUrl);
  const csv = await response.text();
  const parsed = Papa.parse(csv, { header: true });
  // Assuming menu data starts from the second row
  return parsed.data.slice(1) as Dish[];
}
