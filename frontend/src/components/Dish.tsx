import { Dish } from '@/models/dish';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface DishProps {
  dish: Dish;
}

const DishComponent = ({ dish }: DishProps) => {
  const [imageError, setImageError] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: dish.dish_name,
        text: dish.description,
        url: window.location.href, // This should be the dish-specific URL
      });
    } else {
      navigator.clipboard.writeText(window.location.href); // Fallback for browsers that don't support Web Share API
      alert('Link copied to clipboard!');
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>{dish.dish_name}</h2>
      <p>{dish.description}</p>
      <p>{dish.price}</p>
      {dish.image_url && !imageError && (
        <img src={dish.image_url} alt={dish.dish_name} onError={handleImageError} />
      )}
      {imageError && <div>Image not available</div>} 
      <button onClick={handleShare}>Share</button>
    </motion.div>
  );
};

export default DishComponent;
