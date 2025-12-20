# 🛒 E-Commerce Website (MERN Stack)

A full-stack E-Commerce Web Application built using React (Vite) for the frontend and Node.js + Express for the backend.
The project supports product browsing, cart management, user authentication, and scalable backend APIs.It
also has a feature of comparing prices from websites like flipkart and amazon.

📁 Project Structure
```
ecommerce/
│
├── backend/
│   ├── node_modules/
│   ├── .env                # Environment variables
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── server.js           # Express server entry point
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   │   ├── images/          # Static images
│   │   └── vite.svg
│   │
│   ├── src/
│   │   ├── assets/          # Images, icons, static assets
│   │   ├── components/      # Reusable UI components
│   │   ├── contexts/        # Context API (Cart, Auth, etc.)
│   │   ├── pages/           # Page-level components
│   │   ├── App.css
│   │   ├── App.jsx          # Main App component
│   │   ├── index.css
│   │   └── main.jsx         # Vite entry file
│   │
│   ├── .gitignore
│   ├── package.json
│   └── package-lock.json
│
└── README.md               # Project documentation
```
## ✨ Features
Frontend

- ** Product listing and category pages

- ** Add to cart & remove from cart functionality

- ** Context API for global state management

- ** Responsive UI for mobile & desktop

Built with React + Vite
Backend

RESTful APIs using Node.js & Express

Environment variable support using .env

Modular and scalable backend setup

Ready for database integration (MongoDB)

### 🚀 Getting Started
### Prerequisites

Make sure you have the following installed:

- Node.js (v16+ recommended)

npm

MongoDB (local or Atlas)
🔧 Installation & Setup
1️⃣ Clone the Repository
git clone <your-repository-url>
cd ecommerce
2️⃣ Backend Setup
cd backend
npm install
Create a .env file inside backend/:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Run backend server:
npm start
Backend will run on:
http://localhost:5000
3️⃣ Frontend Setup
cd frontend
npm install
npm run dev
Frontend will run on:
http://localhost:5173
🧩 Main Components & Pages

Home Page – Displays featured products

Product Page – Product details

Cart Page – View and manage cart items

Navbar / Footer – Global layout components

Context Providers – Cart & state management
🔐 Environment & Security

.env files are used for sensitive data

.gitignore excludes:

node_modules

.env files

Backend is structured to easily add authentication & authorization
📌 Brief Description

This E-Commerce website allows users to browse products, add them to a cart, and manage their shopping experience through a clean and responsive interface.
The backend is designed to be scalable and can be extended with authentication, payment gateways, and order management features.
🛠 Tech Stack

Frontend: React, Vite, CSS

Backend: Node.js, Express

Database: MongoDB (optional / planned)

Version Control: Git & GitHub
