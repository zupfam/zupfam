# Dishgram - Instagram-Style Vendor Profile

This project is a Next.js application that creates a beautiful, mobile-first, Instagram-style profile page for a single local food vendor. All data is fetched fresh on every page load from a public Google Sheet, allowing the vendor to update their menu, offers, and details without touching any code.

## Features

*   **Instagram-like UI**: A modern, mobile-first design inspired by Instagram, featuring a main feed of posts, a sticky profile header, and a horizontal "stories-style" carousel for special offers.
*   **Dynamic Data from Google Sheets**: The entire site is powered by data from three public Google Sheets (`vendor`, `items`, `reviews`). Changes in the sheet are reflected on the site on the next page load.
*   **No-Cache Data Fetching**: All sheet data is fetched with a `no-store` cache policy, ensuring prices, availability, and offers are always up-to-date.
*   **Image & Video Support**: The feed supports both image posts and video "Reels." Videos autoplay muted when they scroll into view.
*   **Internationalization (i18n)**: Built-in support for multiple languages (English, Hindi, Spanish). The app dynamically uses translated text from the Google Sheet.
*   **Interactive UI**: Smooth animations, a "like" button, a comment section drawer, a native share button, and a "Order on WhatsApp" button with a pre-filled message.
*   **Built with Modern Tech**: Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Aceternity UI, and TanStack Query.

## How to Use

### 1. Set Up Your Google Sheet

This project requires three separate sheets (tabs) within a single Google Sheets document: `vendor`, `items`, and `reviews`.

**A. Create Your Google Sheet**

1.  Create a new Google Sheet.
2.  Create three tabs at the bottom and name them exactly: `vendor`, `items`, `reviews`.
3.  **Copy the headers** from the sample CSV files located in the `/public/samples` directory of this repository into your sheets.
    *   [public/samples/vendor.csv](public/samples/vendor.csv)
    *   [public/samples/items.csv](public/samples/items.csv)
    *   [public/samples/reviews.csv](public/samples/reviews.csv)
4.  Fill in your own data under the headers.

**B. Publish Your Sheets to the Web**

You must publish each of the three sheets individually.

1.  In your Google Sheet, go to the menu: `File` -> `Share` -> `Publish to web`.
2.  In the dialog box:
    *   Under **Link**, select the `vendor` sheet from the dropdown.
    *   Under **Embed**, select **Comma-separated values (.csv)**.
    *   Click the **Publish** button.
    *   Copy the generated URL. This is your `VENDOR_SHEET_URL`.
3.  **Repeat the process** for the `items` and `reviews` sheets, generating a unique URL for each one.

### 2. Local Development Setup

**A. Clone the Repository**

```bash
git clone https://github.com/your-username/local-vendor-instagram.git
cd local-vendor-instagram
```

**B. Install Dependencies**

```bash
npm install
```

**C. Create Environment File**

1.  Create a new file named `.env.local` in the root of the project.
2.  Copy the contents from `.env.local.example` into it.
3.  Replace the placeholder URLs with the actual published Google Sheet URLs you generated in the previous step.

```
# .env.local

NEXT_PUBLIC_VENDOR_SHEET_URL="YOUR_PUBLISHED_VENDOR_CSV_URL"
NEXT_PUBLIC_ITEMS_SHEET_URL="YOUR_PUBLISHED_ITEMS_CSV_URL"
NEXT_PUBLIC_REVIEWS_SHEET_URL="YOUR_PUBLISHED_REVIEWS_CSV_URL"

# These fallbacks are used if the above URLs are not set,
# allowing the app to run with local sample data.
NEXT_PUBLIC_FALLBACK_VENDOR_URL="/samples/vendor.csv"
NEXT_PUBLIC_FALLBACK_ITEMS_URL="/samples/items.csv"
NEXT_PUBLIC_FALLBACK_REVIEWS_URL="/samples/reviews.csv"
```

**D. Run the Development Server**

```bash
npm run dev
```

The site will be available at `http://localhost:3000`.

### 3. Deployment to Vercel

Deploying this project is straightforward with Vercel.

1.  **Push to GitHub**: Push your cloned and configured repository to your own GitHub account.
2.  **Import Project in Vercel**:
    *   Log in to your Vercel account.
    *   Click "Add New..." -> "Project".
    *   Import the GitHub repository you just pushed.
3.  **Configure Environment Variables**:
    *   In the Vercel project settings, navigate to the "Environment Variables" section.
    *   Add the three `NEXT_PUBLIC_*_SHEET_URL` variables with the URLs of your published Google Sheets.
    ```
    NEXT_PUBLIC_VENDOR_SHEET_URL  -> your_vendor_url
    NEXT_PUBLIC_ITEMS_SHEET_URL   -> your_items_url
    NEXT_PUBLIC_REVIEWS_SHEET_URL -> your_reviews_url
    ```
4.  **Deploy**: Click the "Deploy" button. Vercel will automatically build and deploy your site.

## Customization

### Changing Colors & Theme

The site uses Tailwind CSS. You can customize the color palette, fonts, and other design tokens in `tailwind.config.ts`. The primary accent color and dark mode settings can be easily adjusted here.

### Dark Mode

The site includes a dark mode theme. While a toggle is not implemented in the base UI to keep it minimal, you can enable it by default by changing the `darkMode` setting in `tailwind.config.ts` or by adding a theme provider (like `next-themes`).

### Updating Content

To update the menu, offers, or reviews, simply edit the content in your Google Sheet. The changes will automatically appear on the website the next time a user loads the page. There is no need to redeploy the application for content changes.