import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GoogleTranslate from './GoogleTranslate';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Top bar */}
      <motion.div 
        className="bg-primary-600 text-white py-2 px-4 text-sm"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-width flex flex-col sm:flex-row justify-between items-center">
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <motion.div 
              className="flex items-center space-x-2 professional-hover"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Phone className="w-4 h-4" />
              <span>+91 98765 43210</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-2 professional-hover"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Mail className="w-4 h-4" />
              <span>info@anilife.com</span>
            </motion.div>
          </motion.div>
          <motion.div 
            className="flex items-center space-x-4 mt-2 sm:mt-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <GoogleTranslate />
            <motion.div 
              className="text-xs flex items-center space-x-1 professional-hover"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Heart className="w-3 h-3 text-red-300" />
              <span>Caring for your livestock</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main navbar */}
      <motion.nav 
        className="bg-white shadow-lg sticky top-0 z-40"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="max-width section-padding">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/" className="flex items-center space-x-2">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <Heart className="w-8 h-8 text-primary-500" />
                </motion.div>
                <motion.div 
                  className="flex flex-col"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <span className="text-xl font-bold text-primary-600">Anilife</span>
                  <span className="text-xs text-secondary-600 -mt-1">Healthcare</span>
                </motion.div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div 
              className="hidden md:flex items-center space-x-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.4 + index * 0.05 }}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={item.href}
                    className={`text-sm font-medium transition-all duration-200 relative professional-hover ${
                      isActive(item.href)
                        ? 'text-primary-600'
                        : 'text-secondary-700 hover:text-primary-600'
                    }`}
                  >
                    {item.name}
                    {isActive(item.href) && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-500"
                        layoutId="navbar-indicator"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Admin Link (Desktop) */}
            <motion.div 
              className="hidden md:flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <motion.div
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/admin/login"
                  className="text-sm font-medium text-secondary-700 hover:text-primary-600 transition-colors duration-200 professional-hover"
                >
                  Admin
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/contact"
                  className="btn-primary text-sm btn-professional"
                >
                  Get Quote
                </Link>
              </motion.div>
            </motion.div>

            {/* Mobile menu button */}
            <motion.div 
              className="md:hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-secondary-700 hover:text-primary-600 focus:outline-none transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -45, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 45, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                                        >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 45, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -45, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                className="md:hidden"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
              >
                <motion.div 
                  className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-secondary-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, delay: 0.05 }}
                >
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.15, delay: index * 0.03 }}
                    >
                      <Link
                        to={item.href}
                        className={`block px-3 py-2 text-base font-medium transition-colors duration-200 professional-hover ${
                          isActive(item.href)
                            ? 'text-primary-600 bg-primary-50 rounded-md'
                            : 'text-secondary-700 hover:text-primary-600 hover:bg-primary-50 rounded-md'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div 
                    className="border-t border-secondary-200 pt-3 mt-3"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15, delay: 0.15 }}
                  >
                    <motion.div
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to="/admin/login"
                        className="block px-3 py-2 text-base font-medium text-secondary-700 hover:text-primary-600 hover:bg-primary-50 rounded-md professional-hover"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Admin Login
                      </Link>
                    </motion.div>
                    <motion.div
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to="/contact"
                        className="block px-3 py-2 mt-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="btn-primary text-sm w-full text-center block btn-professional">
                          Get Quote
                        </span>
                      </Link>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
