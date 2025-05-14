# Mini E-Commerce Platform

A simple e-commerce web application with two main tabs — one for submitting products, and one for viewing submitted products, with a search feature.

## Features

- **Product Submission**: Add products with name, price, description, and optional image URL
- **Products Display**: View all submitted products in a clean card layout
- **Search Functionality**: Search for products by name or description
- **Real-time Updates**: Newly added products appear immediately

## Tech Stack

- **Frontend**: React with TypeScript and Tailwind CSS
- **Backend**: Node.js with Express
- **Database**: PostgreSQL
- **Other**: Axios for API requests, React Hot Toast for notifications

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- PostgreSQL

### Database Setup

1. Create a PostgreSQL database named `mini_ecommerce`
2. Default credentials in the `.env` file are:
   - User: postgres
   - Password: postgres
   - Host: localhost
   - Port: 5432
3. Update the `.env` file if your database configuration differs

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the backend server:
   ```
   npm run server
   ```
4. In a new terminal, start the frontend development server:
   ```
   npm run dev
   ```
5. Access the application at http://localhost:5173

## API Endpoints

- `GET /api/products` - Get all products
- `POST /api/products` - Add a new product
- `GET /api/products/search?query=keyword` - Search for products

## Project Structure

```
mini-ecommerce/
├── public/             # Static files
├── server/             # Backend server code
│   └── index.js        # Express server
├── src/
│   ├── components/     # React components
│   ├── types/          # TypeScript types
│   ├── App.tsx         # Main App component
│   └── main.tsx        # Entry point
├── .env                # Environment variables
├── package.json        # Dependencies and scripts
└── README.md           # Documentation
```