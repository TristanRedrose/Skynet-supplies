# Skynet Supplies

Skynet Supplies is a online webshop application built using ASP.NET, Angular, and PostgreSQL. This application provides a seamless shopping experience for users and enables administrators and employees to manage products, categories, subcategories, users, and orders.

## Features

### For Users:

- Browse through a wide range of products conveniently categorized for easy navigation.
- Search for specific products using keywords and filters.
- View detailed product information, including images, descriptions, and prices.
- Add products to the shopping cart and proceed to checkout.
- Track order status and history.

### For Admins:

- **Employee Management:**
  - Add new employees to the system.
  - Remove employees from the system.

- **Category and Subcategory Management:**
  - Create, edit, and delete product categories and subcategories.

### For Employees:

- **Product Management:**
  - Add new products to the webshop.
  - Edit product details, including images, descriptions, and prices.
  - Remove products from the webshop.

- **User Management:**
  - View and manage user accounts.
  - Update user information

- **Order Management:**
  - Monitor incoming orders and their statuses.
  - Update order statuses as they are processed.

## Technologies Used

- Frontend: Angular
- Backend: ASP.NET
- Database: PostgreSQL

## Installation and Setup

1. Clone this repository: 'https://github.com/TristanRedrose/Skynet-supplies.git'
2. Navigate to the frontend directory: `cd Skynet-supplies/App`
3. Install frontend dependencies: `npm install`
4. Start the Angular development server: `ng serve`
5. Open a new terminal window.
6. Navigate to the backend directory: `cd ../Api`
7. Restore NuGet packages and build the backend: `dotnet build`
8. Set up your PostgreSQL database and update the connection string in `appsettings.json`.
9. Apply database migrations: `dotnet ef database update`
10. Start the ASP.NET backend server: `dotnet run`

The application will be accessible at `http://localhost:4200`.

## Usage

- As a user, visit the provided URL to explore the webshop, add products to your cart, and place orders.
- As an admin, access the admin interface using the provided URL and use your credentials to log in.
- Inside the admin interface, you can manage employees, product categories, subcategories, products, users, and orders.

