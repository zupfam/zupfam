"use client";

import { Item, Vendor, Review } from "../utils/fetchSheets";
import { PostCard } from "./PostCard";
import { Reviews } from "./Reviews";
import { useState } from "react";

interface FeedProps {
  items: Item[];
  vendor: Vendor;
  reviews: Review[];
}

export function Feed({ items, vendor, reviews }: FeedProps) {
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);

  const handleCommentClick = () => {
    setIsReviewsOpen(true);
  };

  const handleCloseReviews = () => {
    setIsReviewsOpen(false);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid gap-8 max-w-2xl mx-auto">
        {items.map((item) => (
          <PostCard
            key={item.id}
            item={item}
            vendor={vendor}
            onCommentClick={handleCommentClick}
          />
        ))}
      </div>
      <Reviews
        reviews={reviews}
        isOpen={isReviewsOpen}
        onClose={handleCloseReviews}
      />
    </main>
  );
}