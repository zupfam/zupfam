import { FixedSizeList as List } from 'react-window';
import { Dish } from '@/models/dish';
import DishComponent from './Dish';

interface DishListProps {
  dishes: Dish[];
}

const DishList = ({ dishes }: DishListProps) => {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <DishComponent dish={dishes[index]} />
    </div>
  );

  return (
    <List
      height={800}
      itemCount={dishes.length}
      itemSize={250}
      width={'100%'}
    >
      {Row}
    </List>
  );
};

export default DishList;
