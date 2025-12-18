import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import axios from "axios";
import { useShop } from "../contexts/ShopContext"; // ✅ Import useShop hook

const LoginPage = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { refreshUserData } = useShop(); // ✅ Get the refresh function
  const API_URL = "http://localhost:5000/api/auth";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({});
  };

  const validateForm = () => {
    const err = {};
    if (isSignUp && !formData.name.trim()) err.name = "Name required";
    if (!formData.email.trim()) err.email = "Email required";
    if (!formData.password) err.password = "Password required";
    if (isSignUp && formData.password !== formData.confirmPassword)
      err.confirmPassword = "Passwords do not match";
    if (formData.password && formData.password.length < 6)
      err.password = "Password must be at least 6 characters";
    return err;
  };

  const handleSubmit = async () => {
    const err = validateForm();
    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }

    setLoading(true);

    try {
      if (isSignUp) {
        // Sign Up
        const response = await axios.post(`${API_URL}/signup`, {
          name: formData.name,
          email: formData.email,
          password: formData.password
        });

        // Store token and user data
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("currentUser", JSON.stringify(response.data.user));
        
        // ✅ Fetch user's cart and wishlist from database
        await refreshUserData();
        
        // Call onLogin callback
        onLogin(response.data.user);
      } else {
        // Login
        const response = await axios.post(`${API_URL}/login`, {
          email: formData.email,
          password: formData.password
        });

        // Store token and user data
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("currentUser", JSON.stringify(response.data.user));
        
        // ✅ Fetch user's cart and wishlist from database
        await refreshUserData();
        
        // Call onLogin callback
        onLogin(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors({ general: error.response.data.message });
      } else {
        setErrors({ general: "Network error. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-100 to-orange-100">
      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl p-8">
        <div className="text-center mb-6">
          <ShoppingCart className="mx-auto text-pink-500" size={40} />
          <h2 className="text-3xl font-bold mt-2 bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
            {isSignUp ? "Sign Up" : "Welcome Back"}
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            {isSignUp ? "Create your account" : "Login to your account"}
          </p>
        </div>

        <div className="space-y-4">
          {isSignUp && (
            <div>
              <input
                name="name"
                placeholder="Full Name"
                value={formData.name}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-400 transition"
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
          )}

          <div>
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-400 transition"
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-400 transition"
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {isSignUp && (
            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-400 transition"
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          {errors.general && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {errors.general}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 via-rose-400 to-orange-400 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:via-rose-500 hover:to-orange-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Please wait..." : isSignUp ? "Sign Up" : "Login"}
          </button>
        </div>

        <p className="text-center mt-6 text-gray-600">
          {isSignUp ? "Already have an account?" : "New to ShopHub?"}{" "}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrors({});
              setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
              });
            }}
            className="text-pink-500 font-semibold hover:text-pink-600"
          >
            {isSignUp ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;