# WebStore-storage

WebStore-storage is a simple product management system for an e-commerce website. It consists of an admin panel to manage products and a user-facing page to display products using `localStorage`.

## Features

- **Admin Panel:**
  - Add product name, picture, and price.
  - Edit and delete existing products.
  - Store products in `localStorage` for persistence.
  
- **User Page:**
  - Displays products added via the admin panel.
  - Responsive layout with TailwindCSS for styling.

## Technologies Used

- **Frontend:**
  - HTML, CSS (TailwindCSS CDN for styling).
  - JavaScript for dynamic content management.
  - `localStorage` for product persistence.
  
## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/webstore-storage.git

2. Open index.html in your browser to use the Admin Panel and products.html to view the products added.

3. Make sure you have an active internet connection for TailwindCSS CDN to load properly.

## Usage
**Admin Panel:**

    Open index.html and enter the product details in the admin form.
    Click "Save" to add the product.
    You can also edit or delete the products later.

**User Page:**

    Open products.html to view all the products added from the admin panel.
    Products will be displayed dynamically from localStorage


## Future Enhancements

**Implement*a backend system for user authentication and storing products in a database (e.g., PostgreSQL or SQLite).**
**Add a shopping cart and checkout functionality.**
**Implement a search/filter functionality for the products.**