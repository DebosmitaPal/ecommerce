import React from "react";
import { Link } from "react-router-dom";
import { Heart, Trash2, ShoppingCart, ArrowLeft, Star } from "lucide-react";
import { useShop } from "../contexts/ShopContext";
import Navbar from "../components/Navbar";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, moveToCart } = useShop();

  if (wishlist.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="mb-6 inline-block p-8 bg-gradient-to-br from-pink-100 to-orange-100 rounded-full">
              <Heart className="w-24 h-24 text-pink-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Wishlist is Empty</h2>
            <p className="text-gray-600 mb-8">Save items you love to buy them later!</p>
            <Link
              to="/"
              className="inline-block px-8 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-orange-600 transition shadow-lg"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link to="/" className="p-2 hover:bg-white rounded-lg transition">
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                My Wishlist
              </h1>
            </div>
            <div className="text-gray-600 font-medium">
              {wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'}
            </div>
          </div>

          {/* Wishlist Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden group border-2 border-transparent hover:border-pink-200"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
                  />
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-red-50 transition shadow-lg"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-pink-500 text-white text-xs font-bold rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    {item.name}
                  </h3>
                  
                  {item.rating && (
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(item.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">{item.rating}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                      ₹{item.price.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => moveToCart(item)}
                    className="w-full py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-orange-600 transition shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Move to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WishlistPage;