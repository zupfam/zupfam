export interface Vendor {
  store_name: string;
  whatsapp_number: string;
  location?: string;
  food_category?: string;
  social_links?: {
    instagram?: string;
    google_my_business?: string;
    facebook?: string;
  };
  offer_status?: string;
}
