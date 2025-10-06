import { Dish } from '@/models/dish';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { updateYummCount } from '@/services/google-sheets';

const votedDishes = new Set<string>();

interface DishProps {
  dish: Dish;
}

const DishComponent = ({ dish }: DishProps) => {
  const [imageError, setImageError] = useState(false);
  const [yummCount, setYummCount] = useState(dish.yumm_count);
  const [isYummed, setIsYummed] = useState(false);

  useEffect(() => {
    setIsYummed(votedDishes.has(dish.dish_name));
  }, [dish.dish_name]);

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

  const handleYummClick = () => {
    if (!isYummed) {
      votedDishes.add(dish.dish_name);
      setIsYummed(true);
      const newCount = yummCount + 1;
      setYummCount(newCount);
      updateYummCount(dish.dish_name, newCount).catch(() => {
        // Revert on error
        votedDishes.delete(dish.dish_name);
        setYummCount(yummCount);
        setIsYummed(false);
      });
    }
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
      {dish.video_url ? (
        <video src={dish.video_url} autoPlay loop muted playsInline />
      ) : (
        dish.image_url && !imageError && (
          <img src={dish.image_url} alt={dish.dish_name} onError={handleImageError} />
        )
      )}
      {imageError && <div>Image not available</div>}
      <button onClick={handleShare}>Share</button>
      <motion.button
        onClick={handleYummClick}
        whileTap={{ scale: 1.2 }}
        disabled={isYummed}
      >
        Yumm! {yummCount}
      </motion.button>
    </motion.div>
  );
};

export default DishComponent;
