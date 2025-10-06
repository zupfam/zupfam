"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Item, Vendor } from "../utils/fetchSheets";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Image from "next/image";
import { ReelPlayer } from "./ReelPlayer";
import { SocialBar } from "./SocialBar";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface PostCardProps {
  item: Item;
  vendor: Vendor;
  onCommentClick: () => void;
}

const TRUNCATE_LENGTH = 100;

export function PostCard({ item, vendor, onCommentClick }: PostCardProps) {
  const { i18n, t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  const dishName = i18n.language === 'hi' && item.dish_name_hi ? item.dish_name_hi : item.dish_name_en;
  const description = i18n.language === 'hi' && item.desc_hi ? item.desc_hi : item.desc_en;

  const isTruncated = description.length > TRUNCATE_LENGTH;
  const displayText = isTruncated && !isExpanded ? `${description.substring(0, TRUNCATE_LENGTH)}...` : description;

  const cardVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.5, ease: "easeInOut" }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="p-0">
          {item.video_url ? (
            <ReelPlayer src={item.video_url} poster={item.image_url} />
          ) : (
            <div className="aspect-square sm:aspect-[4/5] relative">
              <Image
                src={item.image_url || "https://i.imgur.com/S6PlAAN.jpg"}
                alt={dishName}
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
          )}
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-bold">{dishName}</h2>
            <Badge variant="default" className="bg-green-600 text-white">
              {item.currency} {item.price}
            </Badge>
          </div>
          <div className="flex gap-2 mt-2">
            {item.tags.split(',').map(tag => (
              <Badge key={tag} variant="secondary">{tag.trim()}</Badge>
            ))}
          </div>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            {displayText}
            {isTruncated && (
              <Button variant="link" className="px-1" onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? t('read_less') : t('read_more')}
              </Button>
            )}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <SocialBar item={item} vendor={vendor} onCommentClick={onCommentClick} />
        </CardFooter>
      </Card>
    </motion.div>
  );
}