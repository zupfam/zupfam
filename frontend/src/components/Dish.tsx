import Image from 'next/image';
import { Dish } from '@/models/dish';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Heart, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DishProps {
  dish: Dish;
  vendorId: string;
}

const DishComponent = ({ dish, vendorId }: DishProps) => {
  const [imageError, setImageError] = useState(false);
  const [yummCount, setYummCount] = useState(dish.yumm_count);
  const [isYummed, setIsYummed] = useState(false);

  useEffect(() => {
    const voted = sessionStorage.getItem(`voted_${dish.dish_name}`);
    setIsYummed(!!voted);
  }, [dish.dish_name]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: dish.dish_name,
        text: dish.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleYummClick = async () => {
    if (!isYummed) {
      sessionStorage.setItem(`voted_${dish.dish_name}`, 'true');
      setIsYummed(true);
      const newCount = yummCount + 1;
      setYummCount(newCount);

      try {
        const response = await fetch('/api/update-yumm-count', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            dishName: dish.dish_name,
            newCount,
            vendorId,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update yumm count');
        }
      } catch {
        sessionStorage.removeItem(`voted_${dish.dish_name}`);
        setYummCount(yummCount);
        setIsYummed(false);
      }
    }
  };

  return (
    <div className="flex flex-col h-full rounded-xl overflow-hidden">
      <div className="relative w-full aspect-square">
        {dish.video_url ? (
          <video
            src={dish.video_url}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : dish.image_url && !imageError ? (
          <Image
            src={dish.image_url}
            alt={dish.dish_name}
            onError={handleImageError}
            className="w-full h-full object-cover"
            fill
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Image not available</span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-bold">{dish.dish_name}</h2>
          <p className="text-lg font-semibold">{dish.price}</p>
        </div>
        <p className="text-sm text-gray-600 mt-1 flex-grow">{dish.description}</p>
        <div className="flex justify-between items-center mt-4">
          <motion.button
            onClick={handleYummClick}
            whileTap={{ scale: 1.2 }}
            className={cn(
              'flex items-center gap-2 text-red-500 disabled:text-gray-400',
              isYummed && 'text-red-500'
            )}
            disabled={isYummed}
            data-testid="yumm-button"
          >
            <Heart fill={isYummed ? 'currentColor' : 'none'} />
            <span>{yummCount}</span>
          </motion.button>
          <button onClick={handleShare} className="text-gray-500">
            <Share2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DishComponent;