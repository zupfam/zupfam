export interface Dish {
  dish_name: string;
  description?: string;
  price: string | number;
  image_url?: string;
  video_url?: string;
  category?: string;
  is_available?: boolean;
  yumm_count: number;
  calorie_count?: number;
  diet?: string;
}