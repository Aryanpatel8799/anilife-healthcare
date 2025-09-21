import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import GoogleTranslate from './GoogleTranslate';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Our Companies', href: '/our-companies' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Top bar */}
    

      {/* Main navbar */}
      <nav className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-width section-padding">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="AniLife Healthcare Logo" 
                className="h-20 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-base font-medium transition-colors duration-200 py-2 ${
                    isActive(item.href)
                      ? 'text-primary-600 border-b-2 border-primary-500'
                      : 'text-secondary-700 hover:text-primary-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right (Desktop) */}
            <div className="hidden md:flex items-center space-x-6">
              <GoogleTranslate />
              <Link
                to="/contact"
                className="inline-flex items-center rounded-full bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-primary-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition"
              >
                Get Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-secondary-700 hover:text-primary-600 focus:outline-none"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-secondary-200">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'text-primary-600 bg-primary-50 rounded-md'
                        : 'text-secondary-700 hover:text-primary-600 hover:bg-primary-50 rounded-md'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="border-t border-secondary-200 pt-4 mt-4">
                  <div className="px-3 py-3 mb-4">
                    <GoogleTranslate />
                  </div>
              
                  <Link
                    to="/contact"
                    className="block px-3 py-2 mt-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="inline-flex w-full items-center justify-center rounded-full bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-primary-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition">
                      Get Quote
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
