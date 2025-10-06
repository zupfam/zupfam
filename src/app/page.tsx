"use client";

import "@/i18n/i18n"; // Import to initialize
import { useTranslation } from 'react-i18next';
import { useQuery } from "@tanstack/react-query";
import { getVendorData, getItemsData, getReviewsData } from "./vendor/utils/fetchSheets";
import { HeaderProfile } from "./vendor/components/HeaderProfile";
import { OffersCarousel } from "./vendor/components/OffersCarousel";
import { Feed } from "./vendor/components/Feed";
import { Skeleton } from "@/components/ui/skeleton";

// Loading skeleton component
const AppSkeleton = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="sticky top-0 z-50 flex items-center justify-between py-4">
       <div className="flex items-center gap-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
    <div className="mt-4">
      <Skeleton className="h-24 w-full" />
    </div>
    <div className="grid gap-8 max-w-2xl mx-auto mt-8">
      <Skeleton className="h-96 w-full rounded-lg" />
      <Skeleton className="h-96 w-full rounded-lg" />
    </div>
  </div>
);


export default function Home() {
  const { t } = useTranslation();

  const { data: vendor, isLoading: isLoadingVendor, error: errorVendor } = useQuery({
    queryKey: ['vendor'],
    queryFn: getVendorData,
  });

  const { data: items, isLoading: isLoadingItems, error: errorItems } = useQuery({
    queryKey: ['items'],
    queryFn: getItemsData,
  });

  const { data: reviews, isLoading: isLoadingReviews, error: errorReviews } = useQuery({
    queryKey: ['reviews'],
    queryFn: getReviewsData,
  });

  const isLoading = isLoadingVendor || isLoadingItems || isLoadingReviews;
  const error = errorVendor || errorItems || errorReviews;

  if (isLoading) {
    return <AppSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center text-red-500">
        <div>
          <h1 className="text-2xl font-bold">{t('error_fetching_data')}</h1>
          <p>{t('sheet_not_public')}</p>
        </div>
      </div>
    );
  }

  // Ensure we have data before rendering
  if (!vendor || !items || !reviews) {
     return <AppSkeleton />;
  }

  return (
    <div className="bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100">
      <HeaderProfile vendorData={vendor} />
      <OffersCarousel vendorData={vendor} />
      <Feed items={items} vendor={vendor} reviews={reviews} />
    </div>
  );
}