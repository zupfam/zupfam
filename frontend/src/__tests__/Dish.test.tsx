import { render, screen } from '@testing-library/react';
import DishComponent from '@/components/Dish';
import { Dish } from '@/models/dish';

const mockDish: Dish = {
  dish_name: 'Test Dish',
  description: 'Test Description',
  price: 10,
};

describe('DishComponent', () => {
  it('renders dish details', () => {
    render(<DishComponent dish={mockDish} />);
    expect(screen.getByText('Test Dish')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });
});
