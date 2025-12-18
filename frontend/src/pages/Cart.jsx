import React from "react";
import { Link } from "react-router-dom";
import { Plus, Minus, Trash2, ArrowLeft, ShoppingBag, Package } from "lucide-react";
import { useShop } from "../contexts/ShopContext";
import Navbar from "../components/Navbar";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, addToWishlist } = useShop();

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="mb-6 inline-block p-8 bg-gradient-to-br from-pink-100 to-orange-100 rounded-full">
              <ShoppingBag className="w-24 h-24 text-pink-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8">Add some products to get started!</p>
            <Link
              to="/"
              className="inline-block px-8 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-orange-600 transition shadow-lg"
            >
              Continue Shopping
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
                Shopping Cart
              </h1>
            </div>
            <div className="text-gray-600 font-medium">
              {cart.length} {cart.length === 1 ? 'Item' : 'Items'}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 border-2 border-transparent hover:border-pink-200"
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full sm:w-32 h-32 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500">{item.category}</p>
                        </div>
                        <p className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                          ₹{item.price.toLocaleString()}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3 bg-gradient-to-r from-pink-50 to-orange-50 rounded-lg p-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-white rounded-lg transition"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-bold text-lg w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-white rounded-lg transition"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              addToWishlist(item);
                              removeFromCart(item.id);
                            }}
                            className="px-4 py-2 border-2 border-pink-200 text-pink-600 rounded-lg hover:bg-pink-50 transition text-sm font-medium"
                          >
                            Save for Later
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="px-4 py-2 border-2 border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition flex items-center space-x-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="text-sm font-medium">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600">
                      {cartTotal > 999 ? 'FREE' : '₹50'}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (18%)</span>
                    <span className="font-semibold">
                      ₹{Math.round(cartTotal * 0.18).toLocaleString()}
                    </span>
                  </div>
                  <div className="border-t-2 border-pink-100 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-800">Total</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                        ₹{(cartTotal + (cartTotal > 999 ? 0 : 50) + Math.round(cartTotal * 0.18)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <button className="w-full py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 text-white rounded-xl font-bold text-lg hover:from-pink-600 hover:via-rose-600 hover:to-orange-600 transition shadow-lg hover:shadow-xl mb-4">
                  Proceed to Checkout
                </button>

                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <Package className="w-4 h-4" />
                  <span>Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;