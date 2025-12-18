import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";

// Create Context
const ShopContext = createContext();

// Custom Hook
export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within ShopProvider");
  }
  return context;
};

// Provider Component
const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = "http://localhost:5000/api/user";

  // Fetch user data from MongoDB
  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    
    // If no token is found, ensure the local state is cleared
    if (!token) {
      setCart([]);
      setWishlist([]);
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.get(`${API_URL}/data`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Populate the state with database data
      if (res.data) {
        setCart(res.data.cart || []);
        setWishlist(res.data.wishlist || []);
      }
    } catch (err) {
      console.error("Error fetching user data from DB", err);
      // If token is invalid/expired, clear state
      if (err.response?.status === 401 || err.response?.status === 403) {
        setCart([]);
        setWishlist([]);
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on initial mount
  useEffect(() => {
    fetchUserData();
    
    // Listen for storage changes (helpful if login happens in another tab)
    const handleStorageChange = (e) => {
      if (e.key === "token") {
        fetchUserData();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []); 

  // --- Helper functions to sync state with MongoDB ---

  const syncCartWithDB = async (updatedCart) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      await axios.post(`${API_URL}/cart`, { cart: updatedCart }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error("Failed to sync cart", err);
    }
  };

  const syncWishlistWithDB = async (updatedWishlist) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      await axios.post(`${API_URL}/wishlist`, { wishlist: updatedWishlist }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error("Failed to sync wishlist", err);
    }
  };

  // --- Cart Actions ---

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      let updated;
      if (existing) {
        updated = prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updated = [...prev, { ...product, quantity }];
      }
      syncCartWithDB(updated); 
      return updated;
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => {
      const updated = prev.filter(item => item.id !== productId);
      syncCartWithDB(updated); 
      return updated;
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCart(prev => {
      const updated = prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
      syncCartWithDB(updated); 
      return updated;
    });
  };

  // --- Wishlist Actions ---

  const addToWishlist = (product) => {
    setWishlist(prev => {
      if (prev.find(item => item.id === product.id)) return prev;
      const updated = [...prev, product];
      syncWishlistWithDB(updated); 
      return updated;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prev => {
      const updated = prev.filter(item => item.id !== productId);
      syncWishlistWithDB(updated); 
      return updated;
    });
  };

  const moveToCart = (product) => {
    // These functions already handle their own DB sync
    addToCart(product);
    removeFromWishlist(product.id);
  };

  const clearCart = async () => {
    setCart([]);
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      await axios.post(`${API_URL}/cart`, { cart: [] }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error("Failed to clear cart", err);
    }
  };

  // Clear all data on logout
  const handleLogout = () => {
    setCart([]);
    setWishlist([]);
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
  };

  // --- Computed Values ---

  const cartTotal = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        addToWishlist,
        removeFromWishlist,
        moveToCart,
        clearCart,
        cartTotal,
        cartCount,
        wishlistCount: wishlist.length,
        refreshUserData: fetchUserData, // ✅ Export this function
        handleLogout, // ✅ Export logout handler
        isLoading // ✅ Export loading state
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopProvider;