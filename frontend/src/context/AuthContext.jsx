import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on app load
    const token = authService.getToken();
    const adminData = authService.getCurrentAdmin();
    
    if (token && adminData) {
      setAdmin(adminData);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const result = await authService.login(credentials);
      if (result.success) {
        setAdmin(result.data.admin);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, message: result.message };
    } catch (error) {
      return { success: false, message: 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      const result = await authService.register(userData);
      if (result.success) {
        setAdmin(result.data.admin);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, message: result.message };
    } catch (error) {
      return { success: false, message: 'Registration failed' };
    }
  };

  const logout = () => {
    authService.logout();
    setAdmin(null);
    setIsAuthenticated(false);
  };

  const updateProfile = async (profileData) => {
    try {
      const result = await authService.updateProfile(profileData);
      if (result.success) {
        setAdmin(result.data.admin);
        return { success: true };
      }
      return { success: false, message: result.message };
    } catch (error) {
      return { success: false, message: 'Profile update failed' };
    }
  };

  const value = {
    admin,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
