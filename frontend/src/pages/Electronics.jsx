import React, { useState } from "react";
import { Link } from "react-router-dom";
import {ShoppingCart,Heart,Menu,X,Laptop,Smartphone,Headphones,Camera,ArrowLeft,Star,} from "lucide-react";
import { useShop } from "../contexts/ShopContext";

const ElectronicsPage = () => {
  const { cart, wishlist, addToCart, addToWishlist } = useShop();

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Electronics");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity] = useState(1);

  const categories = [
    { name: "Electronics", link: "/electronics" },
    { name: "Fashion", link: "/fashion" },
    { name: "Home & Living", link: "/home-living" },
    { name: "Sports & Outdoors", link: "/sports-outdoors" },
    { name: "Books", link: "/books" },
    { name: "Toys & Games", link: "/toys-games" },
  ];

  const electronicsCategories = [
    { name: "Mobiles", icon: Smartphone },
    { name: "Laptops", icon: Laptop },
    { name: "Audio", icon: Headphones },
    { name: "Cameras", icon: Camera },
    { name: "All Electronics", icon: ShoppingCart },
  ];

  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      category: "Mobiles",
      price: 134900,
      image:
        "/images/iphone15pro.webp",
      rating: 4.8,
      description:
        "Apple iPhone 15 Pro with A17 chip and ProMotion display.",
    },
    {
      id: 2,
      name: "VivoX200",
      category: "Mobiles",
      price: 65990,
      image:
        "/images/vivox200.webp",
      rating: 4.3,
      description:
        "Features the Dimensity 9400, a 6.67 AMOLED display, 50MP main/telephoto cameras, 5800mAh battery, and 5G connectivity",
    },
    {
      id: 3,
      name: "MacBook Air M2",
      category: "Laptops",
      price: 64590,
      image:
        "/images/macbook.jpg",
      rating: 4.9,
      description:
        "Lightweight MacBook Air powered by Apple M2 chip.",
    },
    {
      id: 4,
      name: "Sony WH-1000XM5",
      category: "Audio",
      price: 29999,
      image:
        "/images/sony.jpg",
      rating: 4.7,
      description:
        "Industry-leading noise cancelling headphones.",
    },
    {
      id: 5,
      name: "Canon EOS R10",
      category: "Cameras",
      price: 99590,
      image:
        "/images/canon.jpg",
      rating: 4.5,
      description:
        "Mirrorless camera perfect for creators.",
    },
    {
      id: 6,
      name: "Samsung Galaxy ZFlip3 5G",
      category: "Mobiles",
      price: 50000,
      image:
        "/images/samsung.webp",
      rating: 4.6,
      description:
        "This smartphone comes with a 10.72 cm (4.2) display so that you can not only enjoy immersive visuals on a widescreen but also can conveniently fit it in your pocket.",
    },
    {
      id: 7,
      name: "HP Pavilion Intel Core i5 13th Gen ",
      category: "Laptops",
      price: 75300,
      image:
        "/images/hp.webp",
      rating: 4.8,
      description:
        "The HP Pavilion Laptop is a true testament to the amalgamation of performance and elegance",
    },
    {
      id: 8,
      name: "Airpods pro 3",
      category: "Audio",
      price: 25899,
      image:
        "/images/airpods-pro-3-blue.jpeg",
      rating: 4.7,
      description:
        "The AirPods Pro 3 are ideal for users who want to get the best wireless earbuds that Apple sells. They have 2x better Active Noise Cancellation than the prior-generation AirPods Pro 2, better audio quality",
    },
  ];

  const filteredProducts =
    selectedCategory === "All Electronics"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const renderStars = (rating) => (
    <div className="flex gap-1 mt-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= Math.round(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NAVBAR */}
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <ShoppingCart className="text-orange-500" />
            <span className="text-xl font-bold">ShopHub</span>
          </Link>

          <div className="hidden lg:flex gap-6">
            {categories.map((c) => (
              <Link
                key={c.name}
                to={c.link}
                className={`font-medium ${
                  c.name === "Electronics"
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
                <span className="badge">{wishlist.length}</span>
              )}
            </Link>

            <Link to="/cart" className="relative">
              <ShoppingCart />
              {cart.length > 0 && (
                <span className="badge">{cart.length}</span>
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

      {/* BACK */}
      <Link to="/" className="fixed left-4 top-24 z-40">
        <div className="bg-white px-4 py-2 rounded-full shadow flex items-center gap-2">
          <ArrowLeft /> Back
        </div>
      </Link>

      {/* PAGE CONTENT */}
      <div
        className={`max-w-7xl mx-auto px-4 py-8 transition ${
          selectedProduct ? "blur-sm pointer-events-none" : ""
        }`}
      >
        <div className="grid lg:grid-cols-4 gap-8">
          {/* SIDEBAR */}
          <aside className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-bold mb-4">Electronics</h2>
            {electronicsCategories.map((c) => {
              const Icon = c.icon;
              return (
                <button
                  key={c.name}
                  onClick={() => setSelectedCategory(c.name)}
                  className={`w-full flex gap-3 items-center px-4 py-3 rounded-lg mb-2 ${
                    selectedCategory === c.name
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  <Icon size={18} /> {c.name}
                </button>
              );
            })}
          </aside>

          {/* PRODUCTS */}
          <section className="lg:col-span-3 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((p) => (
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

      {/* PRODUCT MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white max-w-4xl w-full rounded-xl p-6 relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4"
            >
              <X />
            </button>

            <div className="grid md:grid-cols-2 gap-6">
              <img
                src={selectedProduct.image}
                className="w-full h-80 object-cover rounded"
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
                    onClick={() =>
                      addToCart(selectedProduct, quantity)
                    }
                    className="flex-1 bg-orange-500 text-white py-3 rounded"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => addToWishlist(selectedProduct)}
                    className="border px-4 rounded"
                  >
                    ❤️
                  </button>
                </div>
              </div>
            </div>

            {/* REVIEWS */}
            <div className="mt-6 border-t pt-4">
              <h3 className="font-bold text-lg mb-2">
                Customer Reviews
              </h3>
              <div className="space-y-3">
                <div className="bg-gray-100 p-3 rounded">
                  ⭐⭐⭐⭐⭐ Excellent quality, worth the price!
                </div>
                <div className="bg-gray-100 p-3 rounded">
                  ⭐⭐⭐⭐☆ Very good, delivery could be faster.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ElectronicsPage;
