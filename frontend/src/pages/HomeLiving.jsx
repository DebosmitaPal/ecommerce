import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  Menu,
  X,
  Sofa,
  Lamp,
  Utensils,
  ArrowLeft,
  Star
} from "lucide-react";
import { useShop } from "../contexts/ShopContext";

const HomeLivingPage = () => {
  const { cart, wishlist, addToCart, addToWishlist } = useShop();

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);

  /* ===== NAVBAR CATEGORIES ===== */
  const categories = [
    { name: "Electronics", link: "/electronics" },
    { name: "Fashion", link: "/fashion" },
    { name: "Home & Living", link: "/home-living" },
    { name: "Sports & Outdoors", link: "/sports-outdoors" },
    { name: "Books", link: "/books" },
    { name: "Toys & Games", link: "/toys-games" }
  ];

  /* ===== SIDEBAR CATEGORIES ===== */
  const homeCategories = [
    { name: "Furniture", icon: Sofa },
    { name: "Lighting", icon: Lamp },
    { name: "Kitchen", icon: Utensils },
    { name: "All", icon: ShoppingCart }
  ];

  /* ===== PRODUCTS ===== */
  const products = [
    {
      id: 501,
      name: "Luxury Sofa",
      category: "Furniture",
      price: 68000,
      rating: 4.7,
      image: "/images/sofa1.webp",
      description: "Premium luxury sofa with superior comfort and durability."
    },
    {
      id: 502,
      name: "Designer Table Lamp",
      category: "Lighting",
      price: 2199,
      rating: 4.5,
      image: "/images/lamp.webp",
      description: "Modern table lamp with warm ambient lighting."
    },
    {
      id: 503,
      name: "Non-Stick Cookware Set",
      category: "Kitchen",
      price: 5999,
      rating: 4.6,
      image: "/images/nonstick.webp",
      description: "Durable non-stick cookware set for daily cooking."
    },
    {
      id: 504,
      name: "Kid's Bed",
      category: "Furniture",
      price: 60900,
      rating: 4.7,
      image: "/images/Bed.webp",
      description: "Premium kid's bed with superior comfort and durability."
    },
    {
      id: 505,
      name: "Designer Table Lamp",
      category: "Lighting",
      price: 1199,
      rating: 4.5,
      image: "/images/lamp1.jpg",
      description: "Modern ceiling light with proper lighting."
    },
    {
      id: 506,
      name: "Designer Table Lamp",
      category: "Lighting",
      price: 3299,
      rating: 4.5,
      image: "/images/lamp2.webp",
      description: "Modern ceiling light with warm ambient lighting."
    },
    {
      id: 507,
      name: "Dining Table",
      category: "Furniture",
      price: 80000,
      rating: 4.7,
      image: "/images/dining_table.avif",
      description: "Premium 6 seater with superior comfort and durability."
    },
    {
      id: 508,
      name: "Cooktop",
      category: "Kitchen",
      price: 8999,
      rating: 4.6,
      image: "/images/cooktop.webp",
      description: "Durable cooktop with three ovens for fast cooking"
    },
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(p => p.category === selectedCategory);

  const renderStars = (rating) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= NAVBAR ================= */}
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

          <Link to="/" className="flex items-center gap-2">
            <ShoppingCart className="text-orange-500" />
            <span className="text-xl font-bold">ShopHub</span>
          </Link>

          <div className="hidden lg:flex gap-6">
            {categories.map(c => (
              <Link
                key={c.name}
                to={c.link}
                className={`font-medium ${
                  c.name === "Home & Living"
                    ? "text-orange-500"
                    : "text-gray-600 hover:text-orange-400"
                }`}
              >
                {c.name}
              </Link>
            ))}
          </div>

          <div className="flex gap-6 items-center">
            <Link to="/wishlist" className="relative">
              <Heart />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 rounded-full">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative">
              <ShoppingCart />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden"
            >
              {showMobileMenu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* ================= BACK BUTTON ================= */}
      <Link to="/" className="fixed left-4 top-24 z-40">
        <div className="bg-white px-4 py-2 rounded-full shadow flex items-center gap-2">
          <ArrowLeft /> Back
        </div>
      </Link>

      {/* ================= PAGE CONTENT ================= */}
      <div
        className={`max-w-7xl mx-auto px-4 py-8 transition ${
          selectedProduct ? "blur-sm pointer-events-none select-none" : ""
        }`}
      >
        <div className="grid lg:grid-cols-4 gap-8">

          {/* ===== SIDEBAR ===== */}
          <aside className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-bold mb-4">Home & Living</h2>

            {homeCategories.map(c => {
              const Icon = c.icon;
              const isActive = selectedCategory === c.name;

              return (
                <button
                  key={c.name}
                  onClick={() => setSelectedCategory(c.name)}
                  className={`w-full flex gap-3 items-center px-4 py-3 rounded-xl mb-3 transition-all duration-200
                    ${
                      isActive
                        ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                    }
                  `}
                >
                  <Icon
                    size={18}
                    className={isActive ? "text-white" : "text-orange-500"}
                  />
                  <span className="font-medium">{c.name}</span>
                </button>
              );
            })}
          </aside>

          {/* ===== PRODUCTS ===== */}
          <section className="lg:col-span-3 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map(p => (
              <div
                key={p.id}
                onClick={() => setSelectedProduct(p)}
                className="bg-white rounded-xl shadow hover:shadow-xl cursor-pointer"
              >
                <img
                  src={p.image}
                  className="h-56 w-full object-cover rounded-t-xl"
                />

                <div className="p-4">
                  <h3 className="font-bold">{p.name}</h3>
                  {renderStars(p.rating)}
                  <p className="text-orange-500 font-bold mt-1">
                    ₹{p.price.toLocaleString("en-IN")}
                  </p>

                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(p, 1);
                      }}
                      className="flex-1 bg-orange-500 text-white py-2 rounded"
                    >
                      Add to Cart
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToWishlist(p);
                      }}
                      className="p-2 border rounded"
                    >
                      <Heart />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>

      {/* ================= PRODUCT MODAL ================= */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white max-w-4xl w-full p-6 rounded-xl relative">

            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4"
            >
              <X />
            </button>

            <div className="grid md:grid-cols-2 gap-6">
              <img
                src={selectedProduct.image}
                className="w-full h-80 object-cover rounded-lg"
              />

              <div>
                <h2 className="text-2xl font-bold">
                  {selectedProduct.name}
                </h2>

                {renderStars(selectedProduct.rating)}

                <p className="text-orange-500 text-xl font-bold mt-2">
                  ₹{selectedProduct.price.toLocaleString("en-IN")}
                </p>

                <p className="mt-4 text-gray-600">
                  {selectedProduct.description}
                </p>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => addToCart(selectedProduct, 1)}
                    className="flex-1 bg-orange-500 text-white py-3 rounded"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() => addToWishlist(selectedProduct)}
                    className="border px-4 rounded"
                  >
                    <Heart />
                  </button>
                </div>
              </div>
            </div>

            {/* ===== REVIEWS ===== */}
            <div className="mt-8 border-t pt-4">
              <h3 className="font-bold mb-3">Customer Reviews</h3>
              <div className="space-y-3">
                <div className="bg-gray-100 p-3 rounded">
                  ⭐⭐⭐⭐⭐ Excellent quality and comfort
                </div>
                <div className="bg-gray-100 p-3 rounded">
                  ⭐⭐⭐⭐ Stylish and durable
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default HomeLivingPage;
