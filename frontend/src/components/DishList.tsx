import { Dish } from '@/models/dish';
import DishComponent from './Dish';
import { CardStack } from './ui/card-stack';

interface DishListProps {
  dishes: Dish[];
  vendorId: string;
}

const DishList = ({ dishes, vendorId }: DishListProps) => {
  const cards = dishes.map((dish, index) => ({
    id: index,
    content: <DishComponent dish={dish} vendorId={vendorId} />,
  }));

  return (
    <div className="flex items-center justify-center w-full">
      <CardStack items={cards} />
    </div>
  );
};

export default DishList;