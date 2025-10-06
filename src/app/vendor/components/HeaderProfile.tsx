"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { LanguageSelector } from "./LanguageSelector";
import { Vendor } from "../utils/fetchSheets";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

// Dummy data for initial layout
const dummyVendor: Vendor = {
  id: "demo-vendor",
  vendor_name: "Baba Chaat Corner",
  vendor_bio: "Spicy chaat since 1982",
  vendor_avatar: "https://i.imgur.com/rE38Y2x.jpg",
  locale: "en-US",
  social_ig: "#",
  social_fb: "#",
  social_wa: "#",
  social_gmb: "#",
};

export function HeaderProfile({ vendorData }: { vendorData?: Vendor }) {
  const vendor = vendorData || dummyVendor;
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert(t("url_copied"));
      });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 transition-all duration-300 ${
        isScrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Avatar className={`transition-all duration-300 ${isScrolled ? "h-12 w-12" : "h-16 w-16"}`}>
            <AvatarImage src={vendor.vendor_avatar} alt={vendor.vendor_name} />
            <AvatarFallback>{vendor.vendor_name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-lg font-bold">{vendor.vendor_name}</h1>
            <p className={`text-sm text-gray-500 dark:text-gray-400 transition-all duration-300 ${isScrolled ? 'hidden sm:block' : ''}`}>
              {vendor.vendor_bio}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSelector />
          <Button variant="ghost" size="icon" onClick={handleShare}>
            <Share2 className="h-5 w-5" />
            <span className="sr-only">{t("share")}</span>
          </Button>
        </div>
      </div>
    </header>
  );
}