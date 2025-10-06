# Dishgram Frontend

This is the frontend for the Dishgram application.

## Prerequisites

- Node.js (v18 or later)
- npm
- A Google account

## Setup

1.  **Create a Google Sheet**

    Create a new Google Sheet with the following columns in the first row:

    `id`, `store_name`, `whatsapp_number`, `location`, `food_category`, `instagram`, `google_my_business`, `facebook`, `offer_status`, `dish_name`, `description`, `price`, `image_url`, `video_url`, `category`, `is_available`, `likes_counter`, `calorie`, `veg_nonveg_marker`

2.  **Share the Google Sheet**

    Share the Google Sheet with "Anyone with the link" can view.

3.  **Get the sheet URL**

    Copy the URL of the Google Sheet. You will need it in the next step.

4.  **Update `vendor-routes.json`**

    Open the `vendor-routes.json` file and add an entry for your vendor. The key should be the vendor ID (e.g., "vendor1"), and the value should be the Google Sheet URL.

    Replace `YOUR_SHEET_URL` with the URL you copied in the previous step.

    ```json
    {
      "vendor1": "YOUR_SHEET_URL"
    }
    ```

## Sample Google Sheet Layout

Here is a sample CSV layout for the Google Sheet. The first row of your sheet should contain these exact column headers.

```csv
id,store_name,whatsapp_number,location,food_category,instagram,google_my_business,facebook,offer_status,dish_name,description,price,image_url,video_url,category,is_available,likes_counter,calorie,veg_nonveg_marker
vendor1,The Pizza Place,1234567890,New York,Pizza,https://www.instagram.com/thepizzaplace,https://g.page/thepizzaplace,https://www.facebook.com/thepizzaplace,"50% off on all pizzas!",Pepperoni Pizza,"Classic pepperoni pizza",12.99,https://example.com/pepperoni.jpg,,Pizza,TRUE,100,500,non-veg
vendori,The Pizza Place,1234567890,New York,Pizza,https://www.instagram.com/thepizzaplace,https://g.page/thepizzaplace,https://www.facebook.com/thepizzaplace,"50% off on all pizzas!",Margherita Pizza,"Fresh tomatoes and mozzarella",10.99,https://example.com/margherita.jpg,,Pizza,TRUE,150,400,veg
```

### Explanation of Columns

*   **id**: The unique ID of the vendor.
*   **store_name**: The name of the vendor's store.
*   **whatsapp_number**: The vendor's WhatsApp number.
*   **location**: The location of the vendor's store.
*   **food_category**: The category of food the vendor sells.
*   **instagram**: The URL of the vendor's Instagram profile.
*   **google_my_business**: The URL of the vendor's Google My Business page.
*   **facebook**: The URL of the vendor's Facebook page.
*   **offer_status**: The vendor's current offer or status.
*   **dish_name**: The name of the dish.
*   **description**: A description of the dish.
*   **price**: The price of the dish.
*   **image_url**: The URL of an image of the dish.
*   **video_url**: The URL of a video of the dish.
*   **category**: The category of the dish (e.g., "Pizza", "Burger", "Dessert").
*   **is_available**: Whether the dish is currently available (`TRUE` or `FALSE`).
*   **likes_counter**: The number of likes the dish has received.
*   **calorie**: The number of calories in the dish.
*   **veg_nonveg_marker**: Whether the dish is vegetarian or non-vegetarian (`veg` or `non-veg`).


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
