import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import vendorRoutesData from '../../vendor-routes.json';

interface VendorRoutes {
  [key: string]: string;
}

const vendorRoutes: VendorRoutes = vendorRoutesData;

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

export async function getGoogleSheetData(
  sheetName: 'store' | 'dishes' | 'statuses',
  vendorId: string
) {
  const doc = new GoogleSpreadsheet(
    vendorRoutes[vendorId],
    serviceAccountAuth
  );
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle[sheetName];
  const rows = await sheet.getRows();
  return rows.map((row) => row.toObject());
}

export async function getVendorData(vendorId: string) {
  const data = await getGoogleSheetData('store', vendorId);
  return data[0];
}

export async function getMenuData(vendorId: string) {
  return getGoogleSheetData('dishes', vendorId);
}

export async function getStatusesData(vendorId: string) {
  return getGoogleSheetData('statuses', vendorId);
}

export async function updateYummCount(
  dishName: string,
  newCount: number,
  vendorId: string
) {
  const doc = new GoogleSpreadsheet(
    vendorRoutes[vendorId],
    serviceAccountAuth
  );
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle['dishes'];
  const rows = await sheet.getRows();
  const rowToUpdate = rows.find((row) => row.get('dish_name') === dishName);
  if (rowToUpdate) {
    rowToUpdate.set('yumm_count', newCount);
    await rowToUpdate.save();
  }
}