# Mini E-Commerce Platform

A modern, full-stack e-commerce web application for submitting and browsing products with real-time updates and search functionality.

**Live Demo:** [https://mini-e-commerce-beta.vercel.app/](https://mini-e-commerce-beta.vercel.app/)  
**GitHub:** [https://github.com/avanishpal143/MINI-E-COMMERCE](https://github.com/avanishpal143/MINI-E-COMMERCE)

---

## Features

- **Product Submission:** Add products with name, price, description, and optional image URL.
- **Product Listing:** Browse all submitted products in a clean, responsive card layout.
- **Search:** Instantly search products by name or description.
- **Real-Time Updates:** Newly added products appear immediately.
- **Notifications:** User-friendly success and error notifications.

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **Other:** Axios (API requests), React Hot Toast (notifications)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+)
- [PostgreSQL](https://www.postgresql.org/)

### Database Setup

1. Create a PostgreSQL database named `mini_ecommerce`.
2. Default credentials (see `.env`):
   - User: `postgres`
   - Password: `postgres`
   - Host: `localhost`
   - Port: `5432`
3. Update the `.env` file if your configuration differs.

Example `.env`:
```properties
# Database connection
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/mini_ecommerce
PORT=3001
```

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/avanishpal143/MINI-E-COMMERCE.git
   cd MINI-E-COMMERCE
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Start the backend server:**
   ```sh
   npm run server
   ```
4. **Start the frontend development server (in a new terminal):**
   ```sh
   npm run dev
   ```
5. **Open the app:**  
   Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## API Endpoints

- `GET /products` — Retrieve all products
- `POST /products` — Add a new product
- `GET /products/search?query=keyword` — Search for products

---

## Project Structure

```
MINI-E-COMMERCE/
├── public/             # Static files
├── server/             # Backend (Express)
│   └── index.js
├── src/
│   ├── components/     # React components
│   ├── types/          # TypeScript types
│   ├── App.tsx
│   └── main.tsx
├── .env                # Environment variables
├── package.json
└── README.md
```

---

## License

This project is licensed under the MIT License.

---

**Enjoy using the [Mini E-Commerce Platform](https://mini-e-commerce-beta.vercel.app/)!**
