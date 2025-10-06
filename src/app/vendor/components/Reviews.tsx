"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Review } from "../utils/fetchSheets";
import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";

interface ReviewsProps {
  reviews: Review[];
  isOpen: boolean;
  onClose: () => void;
}

const StarRating = ({ rating }: { rating: number }) => {
  const totalStars = 5;
  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Star
            key={index}
            className={`h-4 w-4 ${
              starValue <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        );
      })}
    </div>
  );
};

export function Reviews({ reviews, isOpen, onClose }: ReviewsProps) {
  const { t } = useTranslation();

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{t("reviews")}</DrawerTitle>
            <DrawerDescription>
              {reviews.length > 0
                ? `What our customers are saying.`
                : t("no_reviews")}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto">
              {reviews.map((review) => (
                <div key={review.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{review.author}</h3>
                    <StarRating rating={Number(review.rating)} />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {review.comment}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                    {t('posted_on')}{' '}
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}