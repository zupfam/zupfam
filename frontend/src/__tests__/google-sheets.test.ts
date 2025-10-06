import { getGoogleSheetData } from '../src/services/google-sheets';

describe('getGoogleSheetData', () => {
  it('should fetch data from the store sheet', async () => {
    const data = await getGoogleSheetData('store');
    expect(data).toBeDefined();
    expect(data.length).toBeGreaterThan(0);
  });

  it('should fetch data from the dishes sheet', async () => {
    const data = await getGoogleSheetData('dishes');
    expect(data).toBeDefined();
    expect(data.length).toBeGreaterThan(0);
  });

  it('should fetch data from the statuses sheet', async () => {
    const data = await getGoogleSheetData('statuses');
    expect(data).toBeDefined();
    expect(data.length).toBeGreaterThan(0);
  });
});