import React from 'react';
import { render, screen } from '@testing-library/react';
import Dish from '../components/Dish';
import { Dish as DishType } from '../models/dish';

describe('Dish', () => {
  it('should render the dish name and yumm count', () => {
    const dish: DishType = {
      dish_name: 'Pizza',
      description: 'A delicious pizza',
      price: 12.99,
      image_url: '',
      video_url: '',
      category: 'Main',
      is_available: true,
      yumm_count: 100,
      calorie_count: 500,
      diet: 'veg',
    };
    render(<Dish dish={dish} />);
    expect(screen.getByText('Pizza')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });
});