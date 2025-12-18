import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Context Provider
import ShopProvider from "./contexts/ShopContext";

// Layout Components
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Collection from "./components/Collection";
import About from "./components/About";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import ProductComparison from "./components/ProductComparison";

// Pages
import LoginPage from "./pages/LoginPage";
import ElectronicsPage from "./pages/Electronics";
import FashionPage from "./pages/Fashion";
import HomeLivingPage from "./pages/HomeLiving";
import SportsOutdoorsPage from "./pages/SportsOutdoors";
import BooksPage from "./pages/Books";
import ToysGamesPage from "./pages/ToysGames";
import CartPage from "./pages/Cart";
import WishlistPage from "./pages/Wishlist";

/**
 * App Component
 * Handles Authentication routing and wraps the application in ShopProvider 
 * to ensure MongoDB data persistence for Cart and Wishlist.
 */
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for existing session on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Called by LoginPage after successful API call to MongoDB
  const handleLogin = (userData) => {
    setIsAuthenticated(true);
  };

  // Loading spinner while checking for token
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-500"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      {/* IMPORTANT: ShopProvider must wrap the Routes. 
          This allows the Cart/Wishlist to fetch data from MongoDB 
          the moment the user is authenticated. 
      */}
      <ShopProvider>
        {!isAuthenticated ? (
          <Routes>
            {/* If not logged in, show only Login Page */}
            <Route path="*" element={<LoginPage onLogin={handleLogin} />} />
          </Routes>
        ) : (
          <div className="min-h-screen flex flex-col">
            <main className="flex-grow">
              <Routes>
                {/* 1. HOME PAGE - Standard Layout */}
                <Route path="/" element={
                  <>
                    <Navbar />
                    <HeroSection />
                    <Collection />
                    <About />
                    <Newsletter />
                    <Footer />
                  </>
                } />
                
                {/* 2. PRICE COMPARISON PAGE */}
                <Route path="/compare" element={
                  <>
                    <Navbar />
                    <ProductComparison />
                    <Footer />
                  </>
                } />

                {/* 3. CATEGORY & UTILITY PAGES 
                    Note: These pages usually have their own internal "Back" buttons 
                    or Navbars, so we render them cleanly.
                */}
                <Route path="/electronics" element={<ElectronicsPage />} />
                <Route path="/fashion" element={<FashionPage />} />
                <Route path="/home-living" element={<HomeLivingPage />} />
                <Route path="/sports-outdoors" element={<SportsOutdoorsPage />} />
                <Route path="/books" element={<BooksPage />} />
                <Route path="/toys-games" element={<ToysGamesPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                
                {/* 4. CATCH-ALL REDIRECT */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        )}
      </ShopProvider>
    </BrowserRouter>
  );
}