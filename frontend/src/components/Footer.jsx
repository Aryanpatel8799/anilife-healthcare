import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-800 text-white">
      <div className="max-width section-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">Anilife</span>
                <span className="text-xs text-primary-400 -mt-1">Healthcare</span>
              </div>
            </Link>
            <p className="text-secondary-300 mb-4 max-w-md">
              Leading provider of premium cattle healthcare solutions and feed supplements. 
              We are committed to improving livestock health and productivity through innovative, 
              high-quality products.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-secondary-300 hover:text-primary-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-0.5" />
                <span className="text-secondary-300">
                  27-Sadguru estate,<br />
                  Depan road, Visnagar,<br />
                  Gujarat 384315
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400" />
                <span className="text-secondary-300">+91 93273 20094</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400" />
                <span className="text-secondary-300">Anilifehelthcare@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Product Categories */}
        <div className="border-t border-secondary-700 mt-8 pt-8">
          <h3 className="text-lg font-semibold mb-4 text-white">Product Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-secondary-300 hover:text-primary-400 transition-colors cursor-pointer">
              Feed Supplements
            </div>
            <div className="text-secondary-300 hover:text-primary-400 transition-colors cursor-pointer">
              Health Supplements
            </div>
            <div className="text-secondary-300 hover:text-primary-400 transition-colors cursor-pointer">
              Vitamins & Minerals
            </div>
            <div className="text-secondary-300 hover:text-primary-400 transition-colors cursor-pointer">
              Digestive Health
            </div>
            <div className="text-secondary-300 hover:text-primary-400 transition-colors cursor-pointer">
              Immunity Boosters
            </div>
            <div className="text-secondary-300 hover:text-primary-400 transition-colors cursor-pointer">
              Growth Promoters
            </div>
            <div className="text-secondary-300 hover:text-primary-400 transition-colors cursor-pointer">
              Reproductive Health
            </div>
            <div className="text-secondary-300 hover:text-primary-400 transition-colors cursor-pointer">
              Specialized Care
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-secondary-400 text-sm">
            © {currentYear} Anilife Healthcare. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-secondary-400 hover:text-primary-400 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-secondary-400 hover:text-primary-400 text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-secondary-400 hover:text-primary-400 text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
