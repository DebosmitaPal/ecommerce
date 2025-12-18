import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ShoppingCart, ExternalLink, Star, IndianRupee, TrendingDown, Package, Award, Sparkles, AlertCircle } from "lucide-react";
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const ProductComparison = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState({ amazon: [], flipkart: [] });
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      fetchProducts();
    }
  }, [searchQuery]);

  // Generate mock products as fallback
  const generateMockProducts = (query) => {
    let min = 500, max = 5000;
    const q = query.toLowerCase();
    
    if (q.includes("phone") || q.includes("iphone") || q.includes("samsung") || q.includes("mobile")) {
      min = 15000; max = 80000;
    } else if (q.includes("laptop") || q.includes("computer") || q.includes("macbook") || q.includes("pavilion")) {
      min = 30000; max = 120000;
    } else if (q.includes("tv") || q.includes("television")) {
      min = 20000; max = 150000;
    } else if (q.includes("headphone") || q.includes("earphone") || q.includes("airpod")) {
      min = 1000; max = 25000;
    } else if (q.includes("watch") || q.includes("smartwatch")) {
      min = 2000; max = 50000;
    } else if (q.includes("toy")) {
      min = 200; max = 3000;
    }

    const amazonProducts = Array.from({ length: 4 }).map((_, i) => ({
      id: `amazon_mock_${i}`,
      name: `${query.charAt(0).toUpperCase() + query.slice(1)} - Amazon Model ${i + 1}`,
      price: Math.floor(Math.random() * (max - min) + min),
      rating: (Math.random() * 2 + 3).toFixed(1),
      reviews: Math.floor(Math.random() * 5000) + 100,
      image: `https://via.placeholder.com/300x300/FF9900/FFFFFF?text=Amazon+Product+${i+1}`,
      platform: "Amazon",
      url: `https://amazon.in/s?k=${encodeURIComponent(query)}`,
      isPrime: i % 2 === 0,
      delivery: i % 2 === 0 ? "Tomorrow" : "Standard Delivery"
    }));

    const flipkartProducts = Array.from({ length: 4 }).map((_, i) => ({
      id: `flipkart_mock_${i}`,
      name: `${query.charAt(0).toUpperCase() + query.slice(1)} - Flipkart Edition ${i + 1}`,
      price: Math.floor(Math.random() * (max - min) + min),
      rating: (Math.random() * 2 + 3).toFixed(1),
      reviews: Math.floor(Math.random() * 4000) + 150,
      image: `https://via.placeholder.com/300x300/2874F0/FFFFFF?text=Flipkart+Product+${i+1}`,
      platform: "Flipkart",
      url: `https://flipkart.com/search?q=${encodeURIComponent(query)}`,
      isAssured: i % 2 === 1,
      delivery: i % 2 === 1 ? "Tomorrow" : "Standard Delivery"
    }));

    const allProducts = [...amazonProducts, ...flipkartProducts];
    const prices = allProducts.map(p => p.price);

    return {
      amazon: amazonProducts,
      flipkart: flipkartProducts,
      summary: {
        totalProducts: allProducts.length,
        amazonCount: amazonProducts.length,
        flipkartCount: flipkartProducts.length,
        lowestPrice: Math.min(...prices),
        highestPrice: Math.max(...prices),
        savings: Math.max(...prices) - Math.min(...prices),
      }
    };
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    setUsingMockData(false);
    
    try {
      const response = await axios.get(`${API_BASE_URL}/search`, {
        params: { q: searchQuery },
        timeout: 30000
      });

      if (response.data.success) {
        // Check if we got real data or need fallback
        const totalProducts = response.data.results.amazon.length + response.data.results.flipkart.length;
        
        if (totalProducts === 0) {
          // Use mock data if scraping returned no results
          console.log('No products found, using mock data');
          const mockData = generateMockProducts(searchQuery);
          setProducts(mockData);
          setSummary(mockData.summary);
          setUsingMockData(true);
        } else {
          // Use scraped data
          setProducts(response.data.results);
          setSummary(response.data.summary);
          setUsingMockData(false);
        }
      } else {
        throw new Error('Failed to fetch products');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      
      // Fallback to mock data on any error
      console.log('Error occurred, falling back to mock data');
      const mockData = generateMockProducts(searchQuery);
      setProducts(mockData);
      setSummary(mockData.summary);
      setUsingMockData(true);
      
      // Set a user-friendly error message
      setError('Unable to fetch live data. Showing sample results instead.');
    } finally {
      setLoading(false);
    }
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
      <div className="relative mb-4">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-56 object-contain rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 p-4"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x300/F3F4F6/9CA3AF?text=No+Image+Available';
          }}
        />
        <span className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
          product.platform === 'Amazon' 
            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white' 
            : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
        }`}>
          {product.platform}
        </span>
        
        {product.isPrime && (
          <span className="absolute top-2 left-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Prime
          </span>
        )}
        
        {product.isAssured && (
          <span className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
            <Award className="w-3 h-3" />
            Assured
          </span>
        )}
      </div>
      
      <h3 className="font-semibold text-gray-800 mb-3 line-clamp-2 min-h-[3rem] text-sm leading-tight">
        {product.name}
      </h3>
      
      {product.rating > 0 && (
        <div className="flex items-center mb-3 gap-2">
          <div className="flex items-center bg-gradient-to-r from-green-500 to-green-600 text-white px-2.5 py-1 rounded-full text-sm shadow">
            <span className="font-bold">{parseFloat(product.rating).toFixed(1)}</span>
            <Star className="w-3 h-3 ml-1 fill-current" />
          </div>
          {product.reviews > 0 && (
            <span className="text-gray-500 text-xs">
              ({Number(product.reviews).toLocaleString()} reviews)
            </span>
          )}
        </div>
      )}
      
      <div className="mb-4 bg-gradient-to-r from-pink-50 to-orange-50 p-3 rounded-lg">
        <div className="flex items-center text-2xl font-bold text-gray-900 mb-2">
          <IndianRupee className="w-6 h-6 text-pink-600" />
          <span className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
            {Number(product.price).toLocaleString('en-IN')}
          </span>
        </div>
        {product.delivery && (
          <div className="flex items-center text-xs text-gray-600 gap-1">
            <Package className="w-3 h-3 text-green-600" />
            <span className="text-green-700 font-medium">{product.delivery}</span>
          </div>
        )}
      </div>
      
      <a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 text-white py-3 rounded-lg hover:from-pink-600 hover:via-rose-600 hover:to-orange-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
      >
        View on {product.platform}
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );

  if (!searchQuery) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-md mx-auto">
          <ShoppingCart className="w-20 h-20 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-600 text-lg font-medium">Please enter a search query to compare products.</p>
          <p className="text-gray-400 text-sm mt-2">Try searching for "laptop", "phone", "headphones", etc.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-lg mx-auto">
          <div className="relative">
            <div className="inline-block animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-pink-500 mb-6"></div>
            <ShoppingCart className="w-8 h-8 text-pink-500 absolute top-6 left-1/2 transform -translate-x-1/2" />
          </div>
          <p className="text-gray-700 text-xl font-semibold mb-2">Searching for "{searchQuery}"...</p>
          <p className="text-gray-500 text-sm mb-1">🔍 Fetching product data from Amazon and Flipkart</p>
          <p className="text-gray-400 text-xs">This may take 10-20 seconds...</p>
          
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
            <p className="text-blue-800 font-medium text-sm mb-2">What's happening:</p>
            <ul className="text-blue-700 text-xs space-y-1 list-disc list-inside">
              <li>Attempting to fetch live product listings</li>
              <li>Extracting prices, ratings & images</li>
              <li>If scraping fails, mock data will be shown</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  const allProducts = [...products.amazon, ...products.flipkart];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Mock Data Warning */}
      {usingMockData && (
        <div className="mb-6 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 flex items-start gap-3 shadow-md">
          <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-yellow-800 font-bold text-sm mb-1">Showing Sample Data</h4>
            <p className="text-yellow-700 text-xs leading-relaxed">
              {error || "We're showing sample product data because live scraping is temporarily unavailable. Prices and details are for demonstration purposes only. Click on products to visit the actual websites for real listings."}
            </p>
          </div>
        </div>
      )}

      {/* Search Results Header */}
      <div className="mb-8 bg-gradient-to-r from-pink-50 via-rose-50 to-orange-50 rounded-xl p-6 border border-pink-100 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Results for <span className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">"{searchQuery}"</span>
        </h2>
        
        {summary && (
          <div className="flex flex-wrap gap-3 items-center">
            {summary.savings > 0 && (
              <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-bold text-sm flex items-center gap-2 shadow-md">
                <TrendingDown className="w-5 h-5" />
                Save up to ₹{summary.savings.toLocaleString('en-IN')}
              </span>
            )}
            <span className="px-4 py-2 bg-white text-gray-700 rounded-full font-medium text-sm shadow">
              🔍 {summary.totalProducts} products found
            </span>
            {summary.amazonCount > 0 && (
              <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full font-medium text-sm">
                🛒 {summary.amazonCount} from Amazon
              </span>
            )}
            {summary.flipkartCount > 0 && (
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium text-sm">
                🛍️ {summary.flipkartCount} from Flipkart
              </span>
            )}
          </div>
        )}
      </div>

      {/* Amazon Products */}
      {products.amazon.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <ShoppingCart className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800">Amazon</h3>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
              {products.amazon.length} products
            </span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.amazon.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      {/* Flipkart Products */}
      {products.flipkart.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <ShoppingCart className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800">Flipkart</h3>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              {products.flipkart.length} products
            </span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.flipkart.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductComparison;