import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import OurCompanies from './pages/OurCompanies';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import Debug from './pages/Debug';

// Admin Pages
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router 
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
        <div className="flex flex-col min-h-screen">
          <Routes>
            {/* Admin routes without navbar/footer */}
            <Route 
              path="/admin/login" 
              element={<AdminLogin />} 
            />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Public routes with navbar/footer */}
            <Route 
              path="/" 
              element={
                <>
                  <Navbar />
                  <main className="flex-grow">
                    <Home />
                  </main>
                  <Footer />
                </>
              } 
            />
            <Route 
              path="/about" 
              element={
                <>
                  <Navbar />
                  <main className="flex-grow">
                    <About />
                  </main>
                  <Footer />
                </>
              } 
            />
            <Route 
              path="/our-companies" 
              element={
                <>
                  <Navbar />
                  <main className="flex-grow">
                    <OurCompanies />
                  </main>
                  <Footer />
                </>
              } 
            />
            <Route 
              path="/products" 
              element={
                <>
                  <Navbar />
                  <main className="flex-grow">
                    <Products />
                  </main>
                  <Footer />
                </>
              } 
            />
            <Route 
              path="/products/:id" 
              element={
                <>
                  <Navbar />
                  <main className="flex-grow">
                    <ProductDetail />
                  </main>
                  <Footer />
                </>
              } 
            />
            <Route 
              path="/contact" 
              element={
                <>
                  <Navbar />
                  <main className="flex-grow">
                    <Contact />
                  </main>
                  <Footer />
                </>
              } 
            />
            <Route 
              path="/debug" 
              element={<Debug />} 
            />
          </Routes>
          
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
