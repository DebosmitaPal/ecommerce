# 🛒 E-Commerce Website (MERN Stack)

A full‑stack E‑Commerce web application built with React (Vite) for the frontend and Node.js + Express for the backend. It supports product browsing, cart management, user authentication, and price comparisons (Amazon / Flipkart scraping).

---

## ✨ Features

- Product listing, category pages, and product details
- Add to cart, remove from cart, and persistent cart/wishlist for authenticated users
- Global state managed via React Context API
- Responsive UI (mobile & desktop)
- Backend RESTful APIs (Node.js + Express)
- Price comparison via web scraping (Amazon & Flipkart)
- Newsletter subscription (email integration)

---

## 📁 Project Structure

```
ecommerce/
├─ backend/        # Express API, MongoDB models, auth, scraping logic
├─ frontend/       # Vite + React app (components, pages, assets)
└─ README.md       # Project documentation
```

---

## 🛠 Tech Stack

- Frontend: React, Vite
- Backend: Node.js, Express
- Database: MongoDB (planned)
- Other: Axios, Cheerio (scraping), JWT, Nodemailer

---

## ✅ Prerequisites

- Node.js v16+ and npm
- MongoDB (local or Atlas)

---

## 🚀 Installation & Run

Clone the repository:

```bash
git clone <https://github.com/DebosmitaPal/ecommerce.git>
cd ecommerce
```

### Backend

```bash
cd backend
npm install
# start the server (npm start will run `node server.js` by default)
npm start
```

The backend defaults to http://localhost:5000 (configurable via `PORT`).

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend uses Vite and typically runs on http://localhost:5173.

> Tip: open backend and frontend terminals in parallel to run both locally.

---

## 🔐 Environment Variables

Create a `.env` file in `backend/` with at least the following values:

```
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=you@example.com
EMAIL_PASS=your_email_password
```

> Keep `.env` out of version control (it's already included in `.gitignore`).

---

## 🧩 Main Components & Pages

- Home — featured products
- Product — details and compare prices
- Cart — manage cart items
- Wishlist — saved items
- Auth — signup & login
- Navbar & Footer — site layout
- Context Providers — cart & auth state persistence

---
