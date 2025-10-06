export interface Dish {
  dish_name: string;
  description?: string;
  price: number;
  image_url?: string;
  video_url?: string;
  category?: string;
  is_available?: boolean;
  likes_counter?: number;
  calorie?: number;
  veg_nonveg_marker?: 'veg' | 'non-veg';
}
