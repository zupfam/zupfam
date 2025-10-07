import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DishComponent from '../components/Dish';
import { Dish } from '../models/dish';

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: 'Success' }),
  })
) as jest.Mock;

// Mock sessionStorage
const sessionStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock,
});

describe('DishComponent', () => {
  const mockDish: Dish = {
    dish_name: 'Test Dish',
    description: 'A delicious test dish.',
    price: '$10.00',
    yumm_count: 5,
    image_url: 'http://example.com/image.jpg',
    video_url: '',
    category: 'test',
    is_available: true,
    calorie_count: 100,
    diet: 'none',
  };

  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
    window.sessionStorage.clear();
  });

  it('renders dish information correctly', () => {
    render(<DishComponent dish={mockDish} vendorId="vendor1" />);
    expect(screen.getByText('Test Dish')).toBeInTheDocument();
    expect(screen.getByText('A delicious test dish.')).toBeInTheDocument();
    expect(screen.getByText('$10.00')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('optimistically updates yumm count on click and calls the service', async () => {
    render(<DishComponent dish={mockDish} vendorId="vendor1" />);

    const yummButton = screen.getByTestId('yumm-button');
    fireEvent.click(yummButton);

    // Optimistic update
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(yummButton).toBeDisabled();

    // Verify service was called
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/update-yumm-count', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dishName: 'Test Dish',
          newCount: 6,
          vendorId: 'vendor1',
        }),
      });
    });
  });

  it('reverts yumm count if the service call fails', async () => {
    // Make fetch mock fail
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({ ok: false })
    );

    render(<DishComponent dish={mockDish} vendorId="vendor1" />);

    const yummButton = screen.getByTestId('yumm-button');
    fireEvent.click(yummButton);

    // Optimistic update
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(yummButton).toBeDisabled();

    // Wait for the error handling to revert the state
    await waitFor(() => {
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    // Button should be re-enabled after failure
    expect(yummButton).not.toBeDisabled();
  });

  it('disables the yumm button if the dish has already been voted for in the session', () => {
    window.sessionStorage.setItem('voted_Test Dish', 'true');
    render(<DishComponent dish={mockDish} vendorId="vendor1" />);
    const yummButton = screen.getByTestId('yumm-button');
    expect(yummButton).toBeDisabled();
  });
});