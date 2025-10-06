"use client";

import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, Phone } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Item, Vendor } from "../utils/fetchSheets";

interface SocialBarProps {
  item: Item;
  vendor: Vendor;
  onCommentClick: () => void;
}

export function SocialBar({ item, vendor, onCommentClick }: SocialBarProps) {
  const { t, i18n } = useTranslation();
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    // In a real app, you might want to send this to a server
  };

  const handleShare = () => {
    const dishName = i18n.language === 'hi' ? item.dish_name_hi : item.dish_name_en;
    if (navigator.share) {
      navigator.share({
        title: `${vendor.vendor_name} - ${dishName}`,
        text: `Check out ${dishName} from ${vendor.vendor_name}!`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert(t("url_copied"));
      });
    }
  };

  const handleWhatsAppOrder = () => {
    const dishName = i18n.language === 'hi' ? item.dish_name_hi : item.dish_name_en;
    const message = encodeURIComponent(`Hi, I would like to order ${dishName}.`);
    const whatsappUrl = `https://wa.me/${vendor.social_wa}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };


  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={handleLike}>
          <Heart className={`h-6 w-6 ${isLiked ? "text-red-500 fill-red-500" : ""}`} />
          <span className="sr-only">Like</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={onCommentClick}>
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Comment</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={handleShare}>
          <Share2 className="h-6 w-6" />
          <span className="sr-only">{t("share")}</span>
        </Button>
      </div>
      <Button variant="ghost" onClick={handleWhatsAppOrder}>
         <Phone className="h-5 w-5 mr-2" />
         {t("order_on_whatsapp")}
      </Button>
    </div>
  );
}