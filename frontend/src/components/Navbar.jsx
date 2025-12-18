import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Heart, Search, Menu, X, Truck, Phone, Mail, LogOut, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navigate = useNavigate();

  const categories = [
    { name: "Electronics", link: "/electronics" },
    { name: "Fashion", link: "/fashion" },
    { name: "Home & Living", link: "/home-living" },
    { name: "Sports & Outdoors", link: "/sports-outdoors" },
    { name: "Books", link: "/books" },
    { name: "Toys & Games", link: "/toys-games" }
  ];

  useEffect(() => {
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    navigate(`/compare?q=${encodeURIComponent(searchInput.trim())}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    window.location.href = "/"; // Force refresh to reset auth state
  };

  return (
    <div className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-pink-800 via-rose-400 to-pink-800 text-white py-2 text-xs sm:text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Truck className="w-4 h-4" />
            <span>Free Shipping Over Rs 999!</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hidden sm:inline">Mobile: 1234567890</span>
            <a href="mailto:support@shophub.com" className="flex items-center space-x-1 hover:underline">
               <Mail className="w-3 h-3" />
               <span className="hidden sm:inline">support@shophub.com</span>
            </a>
          </div>
        </div>
      </div>

      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <ShoppingCart className="w-8 h-8 text-pink-500" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                ShopHub
              </h1>
            </Link>

            {/* Search - Desktop */}
            <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
                <button type="submit" className="absolute right-0 top-0 h-full px-4 bg-pink-500 text-white rounded-r-lg">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Icons */}
            <div className="flex items-center space-x-5">
              {/* User Dropdown */}
              {currentUser && (
                <div className="relative">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 group"
                  >
                    <img src={currentUser.avatar} className="w-8 h-8 rounded-full border border-pink-500" alt="avatar" />
                    <div className="hidden md:block text-left leading-tight">
                      <p className="text-[10px] text-gray-500">Account</p>
                      <p className="text-sm font-bold text-gray-800">{currentUser.name.split(' ')[0]}</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-pink-500" />
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden">
                      <div className="p-4 bg-pink-50">
                        <p className="text-sm font-bold text-gray-800">{currentUser.name}</p>
                        <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 p-4 text-red-600 hover:bg-red-50 transition"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-medium">Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              <Link to="/wishlist" className="hover:text-pink-500 transition">
                <Heart className="w-6 h-6" />
              </Link>

              <Link to="/cart" className="hover:text-pink-500 transition">
                <ShoppingCart className="w-6 h-6" />
              </Link>

              <button className="lg:hidden" onClick={() => setShowMobileMenu(!showMobileMenu)}>
                {showMobileMenu ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="hidden lg:block border-t border-gray-50 bg-gray-50">
          <div className="container mx-auto px-4 flex space-x-8 py-3">
            {categories.map((cat, i) => (
              <Link key={i} to={cat.link} className="text-sm font-medium text-gray-600 hover:text-pink-600">
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;