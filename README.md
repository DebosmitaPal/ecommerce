🛍️ ShopHub: Dynamic Price Comparison & E-CommerceShopHub
It is a full-stack e-commerce platform built using the MERN stack. It offers a premium shopping experience across categories like Electronics, Fashion, and Home Living, with a powerful built-in Price Comparison Feature. 
ShopHub automatically fetches and compares prices from giants like Amazon and Flipkart, ensuring users always find the best deal without leaving the site.
🚀 Key Features:
Dynamic Price Comparison: Real-time price tracking from Amazon and Flipkart for identical products.
Multi-Category Store: Browse products in Electronics, Home Living, Toys, Fashion, and Outdoor Games.
Secure Authentication: User registration and login powered by JSON Web Tokens (JWT).
Newsletter Integration: Automated email updates and promotions for subscribed users.
Modern UI/UX: A fast, responsive frontend built with React and Vite.
Global State Management: Uses React Context API for managing carts, user sessions, and comparison data.
📂 Project Structure
ECOMMERCE/
├── backend/                # Node.js & Express Server
│   ├── .env                # Private Environment Variables
│   ├── server.js           # Server entry point & Middleware
│   ├── models/             # Mongoose Schemas (User, Product, etc.)
│   ├── routes/             # API Endpoints
│   └── package.json        # Backend dependencies
├── frontend/               # React + Vite Frontend
│   ├── public/             # Static assets (images, logos)
│   ├── src/
│   │   ├── components/     # Reusable UI elements (Navbar, Footer)
│   │   ├── contexts/       # Global State (Auth, Cart, Comparison)
│   │   ├── pages/          # Page Views (Home, ProductDetails, Cart)
│   │   ├── App.jsx         # Root Component
│   │   └── main.jsx        # Frontend entry point
│   ├── vite.config.js      # Vite configuration
│   └── package.json        # Frontend dependencies
⚙️ Installation & Setup
1. Clone the repository
   git clone https://github.com/DebosmitaPal/ecommerce.git
cd ecommerce
3. Configure Environment Variables
4. Inside the /backend directory, create a .env file and populate it with the following:
   Code snippet# Server Configuration
PORT=5000

# Database
MONGO_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret_key

# Newsletter / Email Details (SMTP)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
3. Install Dependencies & RunFor Backend:Bashcd backend
npm install
npm start
For Frontend:cd frontend
npm install
npm run dev
📊 Comparison LogicShopHub ensures transparency by calculating the minimum price across platforms
If a competitor offers a lower price, a direct link to that platform is provided to the user.
🛠️ Tech Stack
Frontend: 
React.js, Vite, Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB (Mongoose)
Auth: JSON Web Tokens (JWT)
Email: Nodemailer (for Newsletter)
