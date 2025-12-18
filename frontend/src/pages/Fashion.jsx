import React, { useState } from "react";
import { Link } from "react-router-dom";
import {ShoppingCart,Heart,Menu,X,Shirt,Watch,Footprints,Crown,ArrowLeft,Star,} from "lucide-react";
import { useShop } from "../contexts/ShopContext";

const FashionPage = () => {
  const { cart, wishlist, addToCart, addToWishlist } = useShop();

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Fashion");
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

  const fashionCategories = [
    { name: "Men", icon: Shirt },
    { name: "Women", icon: Crown },
    { name: "Footwear", icon: Footprints },
    { name: "Accessories", icon: Watch },
    { name: "All Fashion", icon: ShoppingCart },
  ];

  const products = [
    {
      id: 101,
      name: "Men's Casual Shirt",
      category: "Men",
      price: 1999,
      image:
        "/images/shirt.webp",
      rating: 4.4,
      description: "Comfortable cotton casual shirt for daily wear.",
    },
    {
      id: 102,
      name: "Women's Summer Dress",
      category: "Women",
      price: 1499,
      image:
        "/images/dress2.avif",
      rating: 4.6,
      description: "Elegant summer dress with breathable fabric.",
    },
    {
      id: 103,
      name: "Running Shoes",
      category: "Footwear",
      price: 1499,
      image:
        "/images/footwear.jpg",
      rating: 4.7,
      description: "Lightweight running shoes with extra cushioning.",
    },
    {
      id: 104,
      name: "Luxury Wrist Watch",
      category: "Accessories",
      price: 5999,
      image:
        "/images/watch1.jpg",
      rating: 4.5,
      description: "Stylish analog watch with premium finish.",
    },
    {
      id: 105,
      name: "Women's Handbag",
      category: "Accessories",
      price: 2799,
      image:
        "/images/bag1.avif",
      rating: 4.3,
      description: "Spacious and elegant handbag for daily use.",
    },
    {
      id: 106,
      name: "Men's TShirt",
      category: "Men",
      price: 1299,
      image:
        "/images/tshirt.webp",
      rating: 4.4,
      description: "Comfortable cotton tshirt for daily wear.",
    },
    {
      id: 107,
      name: "Women's Winter Coat",
      category: "Women",
      price:3499,
      image:
        "/images/coat.webp",
      rating: 4.6,
      description: "Elegant winter coat with elegant look",
    },
    {
      id: 108,
      name:"Sandal",
      category: "Footwear",
      price: 799,
      image:
        "/images/sandal.avif",
      rating: 4.7,
      description: "Lightweight walking with daily wear.",
    },
    {
      id: 109,
      name: "Diamond Necklace",
      category: "Accessories",
      price: 87999,
      image:
        "/images/jewellery1.webp",
      rating: 4.3,
      description: "Elegant jewellery for party wear.",
    },
  ];

  const filteredProducts =
    selectedCategory === "All Fashion"
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
                  c.name === "Fashion"
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
            <h2 className="font-bold mb-4">Fashion</h2>
            {fashionCategories.map((c) => {
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
                    onClick={() => addToCart(selectedProduct, quantity)}
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
                  ⭐⭐⭐⭐⭐ Excellent fabric quality!
                </div>
                <div className="bg-gray-100 p-3 rounded">
                  ⭐⭐⭐⭐☆ Stylish and comfortable.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FashionPage;
