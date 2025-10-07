import { getGoogleSheetData, updateYummCount } from '../services/google-sheets';
import { GoogleSpreadsheet } from 'google-spreadsheet';

// Mock the google-spreadsheet library
jest.mock('google-spreadsheet', () => {
  const mockRow = {
    toObject: () => ({ dish_name: 'Test Dish', yumm_count: 5 }),
    get: jest.fn(),
    set: jest.fn(),
    save: jest.fn(),
  };

  const mockSheet = {
    getRows: jest.fn().mockResolvedValue([mockRow]),
  };

  const mockDoc = {
    loadInfo: jest.fn(),
    sheetsByTitle: {
      store: mockSheet,
      dishes: {
        getRows: jest.fn().mockResolvedValue([
          {
            get: (key: string) => (key === 'dish_name' ? 'Test Dish' : 5),
            set: jest.fn(),
            save: jest.fn().mockResolvedValue(undefined),
            toObject: () => ({
              dish_name: 'Test Dish',
              yumm_count: 5,
            }),
          },
        ]),
      },
      statuses: mockSheet,
    },
  };

  return {
    GoogleSpreadsheet: jest.fn(() => mockDoc),
  };
});

describe('Google Sheets Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getGoogleSheetData', () => {
    it('should fetch data from a specified sheet', async () => {
      const data = await getGoogleSheetData('dishes', 'vendor1');
      expect(data).toBeDefined();
      expect(data.length).toBeGreaterThan(0);
      expect(data[0].dish_name).toBe('Test Dish');
    });
  });

  describe('updateYummCount', () => {
    it('should update the yumm_count for a specific dish', async () => {
      const docInstance = new (GoogleSpreadsheet as jest.Mock)();
      const sheet = docInstance.sheetsByTitle['dishes'];
      const rows = await sheet.getRows();
      const rowToUpdate = rows[0];

      await updateYummCount('Test Dish', 10, 'vendor1');

      expect(rowToUpdate.set).toHaveBeenCalledWith('yumm_count', 10);
      expect(rowToUpdate.save).toHaveBeenCalled();
    });
  });
});