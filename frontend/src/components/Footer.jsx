import React from 'react';
import {  Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, ChevronRight } from 'lucide-react';

const ShopHubFooter = () => {
  return (
    <div>
      {/* Footer */}
      <footer className="w-full bg-gradient-to-br from-orange-200 via-gray-100 to-orange-200 border-t-3 border-t-orange-300">
        <div className="container mx-auto px-4 py-12">
          {/* Top Section */}
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-lg flex items-center justify-center shadow-md">
                  <span className=" font-bold text-xl">🛒</span>
                </div>
                <span className="text-2xl font-bold text-yellow-900">ShopHub</span>
              </div>
              <p className="text-orange-800 text-sm mb-4 leading-relaxed">
                Your trusted companion for smart shopping and best deals across the web.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-gradient-to-br from-yellow-200 rounded-full flex items-center justify-center hover:from-yellow-400 hover:to-amber-500 transition-all shadow-sm">
                  <Facebook className="w-5 h-5 text-yellow-900" />
                </a>
                <a href="#" className="w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center hover:bg-yellow-300 transition-all shadow-sm">
                  <Twitter className="w-5 h-5 text-yellow-900" />
                </a>
                <a href="#" className="w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center hover:bg-yellow-300 transition-all shadow-sm">
                  <Instagram className="w-5 h-5 text-yellow-900" />
                </a>
                <a href="#" className="w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center hover:bg-yellow-300 transition-all shadow-sm">
                  <Youtube className="w-5 h-5 text-yellow-900" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-yellow-900">Quick Links</h3>
              <ul className="space-y-2">
                {['About Us', 'How It Works', 'Blog'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-yellow-800 hover:text-yellow-900 transition-colors flex items-center gap-2 group text-sm">
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-yellow-900">Categories</h3>
              <ul className="space-y-2">
                {['Electronics', 'Fashion', 'Home & Living', 'Sports', 'Toys & Games'].map((category) => (
                  <li key={category}>
                    <a href="#" className="text-yellow-800 hover:text-yellow-900 transition-colors flex items-center gap-2 group text-sm">
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-yellow-900">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-yellow-800">
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-yellow-700" />
                  <span className="text-sm">123 Shopping Lane, Commerce City, CC 12345</span>
                </li>
                <li className="flex items-center gap-3 text-yellow-800 hover:text-yellow-900 transition-colors">
                  <Phone className="w-5 h-5 flex-shrink-0 text-yellow-700" />
                  <a href="tel:+1234567890" className="text-sm">+1 (234) 567-890</a>
                </li>
                <li className="flex items-center gap-3 text-yellow-800 hover:text-yellow-900 transition-colors">
                  <Mail className="w-5 h-5 flex-shrink-0 text-yellow-700" />
                  <a href="mailto:support@shophub.com" className="text-sm">support@shophub.com</a>
                </li>
              </ul>
            </div>
          </div>
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-yellow-800">
            <p>© 2025 ShopHub. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-yellow-900 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-yellow-900 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-yellow-900 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ShopHubFooter;