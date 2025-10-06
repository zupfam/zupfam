import Papa from 'papaparse';

export interface Vendor {
  id: string;
  vendor_name: string;
  vendor_bio: string;
  vendor_avatar: string;
  locale: string;
  social_ig: string;
  social_fb: string;
  social_wa: string;
  social_gmb: string;
  offer_title?: string;
  offer_image?: string;
  valid_until?: string;
}

export interface Item {
  id: string;
  vendorId: string;
  dish_name_en: string;
  dish_name_hi: string;
  desc_en: string;
  desc_hi: string;
  price: string;
  currency: string;
  tags: string;
  image_url?: string;
  video_url?: string;
  rating: string;
  created_at: string;
}

export interface Review {
  id: string;
  vendorId: string;
  author: string;
  rating: string;
  comment: string;
  language: string;
  created_at: string;
}

async function fetchSheetData<T>(
  remoteUrl: string | undefined,
  fallbackUrl: string
): Promise<T[]> {
  let urlToFetch = remoteUrl && remoteUrl.includes('YOUR_SHEET_ID') === false ? remoteUrl : fallbackUrl;
  // For local development, we need the full base URL
  if (urlToFetch.startsWith('/')) {
      urlToFetch = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}${urlToFetch}`;
  }

  try {
    const response = await fetch(urlToFetch, {
      cache: 'no-store', // Ensures fresh data on every fetch
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch sheet: ${response.statusText}`);
    }

    const text = await response.text();

    return new Promise<T[]>((resolve, reject) => {
      Papa.parse<T>(text, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length) {
            console.error("Parsing errors:", results.errors);
            reject(new Error("Error parsing CSV data."));
          } else {
            resolve(results.data);
          }
        },
        error: (error: Error) => {
          console.error("PapaParse error:", error);
          reject(new Error("Failed to parse CSV."));
        },
      });
    });

  } catch (error) {
    console.error(`Error fetching or parsing sheet from ${urlToFetch}:`, error);
    // Attempt to fetch from fallback if the primary remote fetch failed
    if (urlToFetch !== fallbackUrl) {
      console.log(`Attempting to fetch from fallback URL: ${fallbackUrl}`);
      return fetchSheetData<T>(undefined, fallbackUrl); // Recursive call with only fallback
    }
    throw new Error("Failed to fetch data from both remote and fallback URLs.");
  }
}

export const getVendorData = () =>
  fetchSheetData<Vendor>(
    process.env.NEXT_PUBLIC_VENDOR_SHEET_URL,
    process.env.NEXT_PUBLIC_FALLBACK_VENDOR_URL!
  ).then(data => data[0]); // Vendor data is a single row

export const getItemsData = () =>
  fetchSheetData<Item>(
    process.env.NEXT_PUBLIC_ITEMS_SHEET_URL,
    process.env.NEXT_PUBLIC_FALLBACK_ITEMS_URL!
  ).then(data => data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())); // Sort by most recent

export const getReviewsData = () =>
  fetchSheetData<Review>(
    process.env.NEXT_PUBLIC_REVIEWS_SHEET_URL,
    process.env.NEXT_PUBLIC_FALLBACK_REVIEWS_URL!
  );