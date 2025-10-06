import { getVendorData, getMenuData } from '@/services/google-sheets';

global.fetch = jest.fn(() =>
  Promise.resolve({
    text: () => Promise.resolve('id,store_name\nvendor1,Test Vendor'),
  })
) as jest.Mock;

describe('google-sheets service', () => {
  it('should fetch vendor data', async () => {
    const vendor = await getVendorData('vendor1');
    expect(vendor).toEqual({ id: 'vendor1', store_name: 'Test Vendor' });
  });

  it('should fetch menu data', async () => {
    const menu = await getMenuData('vendor1');
    expect(menu).toEqual([]); // The mock data is not complete
  });
});
