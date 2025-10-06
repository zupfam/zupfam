# Dishgram Frontend

This is the frontend for the Dishgram application.

## Prerequisites

- Node.js (v18 or later)
- npm
- A Google account

## Setup

1.  **Create a Google Sheet**

    Create a new Google Sheet with three sheets named "store", "dishes", and "statuses".

2.  **Set up the "store" sheet**

    The first row of the "store" sheet should contain the following headers:
    `name,location,number_of_dishes,food_category,whatsapp,instagram,facebook,google_my_business,extra_links`

    You can use the sample data from `frontend/public/data/store.csv` to populate this sheet.

3.  **Set up the "dishes" sheet**

    The first row of the "dishes" sheet should contain the following headers:
    `dish_name,description,price,image_url,video_url,category,is_available,yumm_count,calorie_count,diet`

    You can use the sample data from `frontend/public/data/dishes.csv` to populate this sheet.

4.  **Set up the "statuses" sheet**

    The first row of the "statuses" sheet should contain the following headers:
    `type,content,background_color,created_at`

    You can use the sample data from `frontend/public/data/statuses.csv` to populate this sheet.

5.  **Share the Google Sheet**

    Share the Google Sheet with "Anyone with the link" can view.

6.  **Get the sheet URL**

    Copy the URL of the Google Sheet. You will need it in the next step.

7.  **Update `vendor-routes.json`**

    Open the `vendor-routes.json` file and add an entry for your vendor. The key should be the vendor ID (e.g., "vendor1"), and the value should be the Google Sheet URL.

    Replace `YOUR_SHEET_URL` with the URL you copied in the previous step.

    ```json
    {
      "vendor1": "YOUR_SHEET_URL"
    }
    ```

## Running the project

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000/vendor/vendor1](http://localhost:3000/vendor/vendor1) with your browser to see the result.

## Testing

To run the tests, use the following command:

```bash
npm test
```