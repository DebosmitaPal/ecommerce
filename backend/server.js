import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import axios from "axios";
import * as cheerio from "cheerio";

dotenv.config();

// ===================== APP SETUP =====================
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ===================== MONGODB CONNECTION =====================
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err.message));

// ===================== USER SCHEMA (UPDATED) =====================
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: String,
  // Added for persistence
  cart: { type: Array, default: [] },
  wishlist: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// ===================== JWT CONFIG =====================
const JWT_SECRET = process.env.JWT_SECRET || "change-this-secret";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access token required" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token" });
    req.user = user;
    next();
  });
};

// ===================== AUTH ROUTES =====================

// Signup
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "All fields required" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=ec4899&color=fff`;

    const user = await User.create({ name, email, password: hashedPassword, avatar });
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      message: "Signup successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar },
    });
  } catch (error) {
    res.status(500).json({ message: "Signup failed" });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});

// ===================== USER DATA PERSISTENCE (NEW) =====================

// Get User's Cart and Wishlist
app.get("/api/user/data", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ cart: user.cart, wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data" });
  }
});

// Update Cart
app.post("/api/user/cart", authenticateToken, async (req, res) => {
  try {
    const { cart } = req.body;
    await User.findByIdAndUpdate(req.user.id, { cart });
    res.json({ message: "Cart updated" });
  } catch (error) {
    res.status(500).json({ message: "Cart sync failed" });
  }
});

// Update Wishlist
app.post("/api/user/wishlist", authenticateToken, async (req, res) => {
  try {
    const { wishlist } = req.body;
    await User.findByIdAndUpdate(req.user.id, { wishlist });
    res.json({ message: "Wishlist updated" });
  } catch (error) {
    res.status(500).json({ message: "Wishlist sync failed" });
  }
});

// ===================== WEB SCRAPING FUNCTIONS =====================

// Scrape Amazon
async function scrapeAmazon(query, maxResults = 6) {
  try {
    const searchUrl = `https://www.amazon.in/s?k=${encodeURIComponent(query)}`;
    
    const response = await axios.get(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      },
      timeout: 15000
    });

    const $ = cheerio.load(response.data);
    const products = [];

    $('[data-component-type="s-search-result"]').each((i, element) => {
      if (products.length >= maxResults) return false;

      const $element = $(element);
      const asin = $element.attr('data-asin');
      
      // Extract product name
      const name = $element.find('h2 a span').first().text().trim();
      
      // Extract price
      let price = 0;
      const priceWhole = $element.find('.a-price-whole').first().text().replace(/[^0-9]/g, '');
      if (priceWhole) {
        price = parseInt(priceWhole);
      }
      
      // Extract rating
      let rating = 0;
      const ratingText = $element.find('.a-icon-alt').first().text();
      const ratingMatch = ratingText.match(/(\d+\.?\d*)/);
      if (ratingMatch) {
        rating = parseFloat(ratingMatch[1]);
      }
      
      // Extract reviews count
      let reviews = 0;
      const reviewsText = $element.find('span[aria-label*="stars"]').parent().parent().find('span').last().text();
      const reviewsMatch = reviewsText.replace(/,/g, '').match(/(\d+)/);
      if (reviewsMatch) {
        reviews = parseInt(reviewsMatch[1]);
      }
      
      // Extract image
      let image = $element.find('.s-image').attr('src') || '';
      
      // Extract product URL
      const urlPath = $element.find('h2 a').attr('href');
      const url = urlPath ? `https://www.amazon.in${urlPath}` : '';
      
      // Check if Prime
      const isPrime = $element.find('i[aria-label="Amazon Prime"]').length > 0;
      
      // Extract delivery info
      let delivery = 'Standard Delivery';
      const deliveryText = $element.find('.a-color-base.a-text-bold').text();
      if (deliveryText.includes('Tomorrow') || deliveryText.includes('today')) {
        delivery = deliveryText;
      }

      if (name && price > 0) {
        products.push({
          id: `amazon_${asin || i}`,
          name: name.substring(0, 150),
          price,
          rating: rating || 0,
          reviews: reviews || 0,
          image: image || 'https://via.placeholder.com/300',
          platform: 'Amazon',
          url,
          isPrime,
          delivery,
          asin
        });
      }
    });

    return products;
  } catch (error) {
    console.error('Amazon scraping error:', error.message);
    return [];
  }
}

// Scrape Flipkart
async function scrapeFlipkart(query, maxResults = 6) {
  try {
    const searchUrl = `https://www.flipkart.com/search?q=${encodeURIComponent(query)}`;
    
    const response = await axios.get(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      },
      timeout: 15000
    });

    const $ = cheerio.load(response.data);
    const products = [];

    $('div[data-id], a[data-id]').each((i, element) => {
      if (products.length >= maxResults) return false;

      const $parent = $(element).closest('div').parent();
      
      // Extract product name
      const name = $parent.find('div.KzDlHZ, a.wjcEIp, a.WKTcLC, div._2WkVRV').first().text().trim() ||
                   $parent.find('a[title]').attr('title') ||
                   $parent.find('a.IRpwTa').text().trim();
      
      // Extract price
      let price = 0;
      const priceText = $parent.find('div.Nx9bqj, div._30jeq3').first().text();
      const priceMatch = priceText.replace(/[^0-9]/g, '');
      if (priceMatch) {
        price = parseInt(priceMatch);
      }
      
      // Extract rating
      let rating = 0;
      const ratingText = $parent.find('div.XQDdHH, span.XQDdHH').first().text();
      const ratingMatch = ratingText.match(/(\d+\.?\d*)/);
      if (ratingMatch) {
        rating = parseFloat(ratingMatch[1]);
      }
      
      // Extract reviews
      let reviews = 0;
      const reviewsText = $parent.find('span.Wphh3N').text();
      const reviewsMatch = reviewsText.replace(/,/g, '').match(/(\d+)/);
      if (reviewsMatch) {
        reviews = parseInt(reviewsMatch[1]);
      }
      
      // Extract image
      let image = $parent.find('img').attr('src') || '';
      
      // Extract URL
      const urlPath = $parent.find('a.CGtC98, a.wjcEIp, a.WKTcLC').attr('href') ||
                     $parent.find('a[href*="/p/"]').attr('href');
      const url = urlPath ? `https://www.flipkart.com${urlPath}` : '';
      
      // Check if Flipkart Assured
      const isAssured = $parent.find('img[src*="assured"]').length > 0;
      
      // Delivery info
      let delivery = 'Standard Delivery';
      const deliveryText = $parent.find('div._2Tpdn3, div.OZQXZW').text();
      if (deliveryText) {
        delivery = deliveryText.includes('tomorrow') || deliveryText.includes('Tomorrow') ? 
                  'Tomorrow' : 'Standard Delivery';
      }

      const productId = $(element).attr('data-id');

      if (name && price > 0) {
        products.push({
          id: `flipkart_${productId || i}`,
          name: name.substring(0, 150),
          price,
          rating: rating || 0,
          reviews: reviews || 0,
          image: image || 'https://via.placeholder.com/300',
          platform: 'Flipkart',
          url,
          isAssured,
          delivery,
          productId
        });
      }
    });

    return products;
  } catch (error) {
    console.error('Flipkart scraping error:', error.message);
    return [];
  }
}

// ===================== PRODUCT SEARCH WITH WEB SCRAPING =====================
app.get("/api/search", async (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({ message: "Search query required" });
  }

  try {
    console.log(`🔍 Searching for: ${q}`);
    
    // Scrape both platforms in parallel
    const [amazonProducts, flipkartProducts] = await Promise.all([
      scrapeAmazon(q, 6),
      scrapeFlipkart(q, 6)
    ]);

    const allProducts = [...amazonProducts, ...flipkartProducts];
    const prices = allProducts.map(p => p.price).filter(p => p > 0);
    
    const summary = {
      totalProducts: allProducts.length,
      amazonCount: amazonProducts.length,
      flipkartCount: flipkartProducts.length,
      lowestPrice: prices.length > 0 ? Math.min(...prices) : 0,
      highestPrice: prices.length > 0 ? Math.max(...prices) : 0,
      savings: prices.length > 0 ? Math.max(...prices) - Math.min(...prices) : 0,
    };

    console.log(`✅ Found ${summary.totalProducts} products (Amazon: ${summary.amazonCount}, Flipkart: ${summary.flipkartCount})`);

    res.json({
      success: true,
      query: q,
      results: {
        amazon: amazonProducts,
        flipkart: flipkartProducts
      },
      summary,
      meta: {
        scrapedAt: new Date().toISOString(),
        source: 'live_scraping'
      }
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message
    });
  }
});

// ===================== NEWSLETTER =====================
app.post("/api/subscribe", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });

  try {
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    // });
    const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


    await transporter.sendMail({
      from: `"ShopHub" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🎉 Welcome to ShopHub",
      html: `<h2>Thanks for subscribing!</h2><p>Enjoy exclusive deals on ShopHub.</p>`,
    });

    res.json({ success: true, message: "Subscription successful" });
  } catch (error) {
    res.status(500).json({ message: "Email sending failed" });
  }
});

// ===================== START SERVER =====================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});