"use client";

import { Vendor } from "../utils/fetchSheets";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const dummyOffers = [
    { title: "FLAT 20% OFF", image: "https://i.imgur.com/L2ND53y.jpg" },
    { title: "Free Drink", image: "https://i.imgur.com/oT3dYt2.jpg" },
    { title: "Combo Deal", image: "https://i.imgur.com/4J5tJ9b.jpg" },
    { title: "Special Thali", image: "https://i.imgur.com/S6PlAAN.jpg" },
]

export function OffersCarousel({ vendorData }: { vendorData?: Vendor }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const offers = vendorData?.offer_title
    ? [{ title: vendorData.offer_title, image: vendorData.offer_image || '' }]
    : dummyOffers;

  if (!offers || offers.length === 0 || !offers[0].title) return null;

  const duplicatedOffers = isDesktop ? [...offers, ...offers] : offers;

  const marqueeVariants = {
    animate: {
      x: [0, -103 * offers.length], // Adjust this based on card width + gap
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30 * offers.length, // Adjust duration based on number of items
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="relative overflow-hidden">
        <motion.div
          className="flex space-x-4"
          variants={isDesktop ? marqueeVariants : undefined}
          animate={isDesktop ? "animate" : undefined}
        >
          {duplicatedOffers.map((offer, index) => (
            <div key={index} className="flex-shrink-0">
              <CardContainer className="inter-var">
                <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-40 h-auto rounded-xl p-2 border">
                  <CardItem
                    translateZ="50"
                    className="text-md font-bold text-neutral-600 dark:text-white truncate"
                  >
                    {offer.title}
                  </CardItem>
                  <CardItem translateZ="100" className="w-full mt-2">
                    <Image
                      src={offer.image || "https://i.imgur.com/S6PlAAN.jpg"}
                      height="1000"
                      width="1000"
                      className="h-24 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt={offer.title || "Offer image"}
                    />
                  </CardItem>
                </CardBody>
              </CardContainer>
            </div>
          ))}
        </motion.div>
         {!isDesktop && (
          <div className="absolute inset-0 flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {offers.map((offer, index) => (
              <div key={index} className="flex-shrink-0">
                <CardContainer className="inter-var">
                  <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-40 h-auto rounded-xl p-2 border">
                    <CardItem
                      translateZ="50"
                      className="text-md font-bold text-neutral-600 dark:text-white truncate"
                    >
                      {offer.title}
                    </CardItem>
                    <CardItem translateZ="100" className="w-full mt-2">
                      <Image
                        src={offer.image || "https://i.imgur.com/S6PlAAN.jpg"}
                        height="1000"
                        width="1000"
                        className="h-24 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                        alt={offer.title || "Offer image"}
                      />
                    </CardItem>
                  </CardBody>
                </CardContainer>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}