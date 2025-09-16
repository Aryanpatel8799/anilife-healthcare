import { validateEmail, validatePhone } from './helpers';

// Contact form validation
export const validateContactForm = (formData) => {
  const errors = {};

  // Name validation
  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }

  // Email validation
  if (!formData.email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Phone validation
  if (!formData.phone) {
    errors.phone = 'Phone number is required';
  } else if (!validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  // Message validation
  if (!formData.message || formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Admin login validation
export const validateLoginForm = (formData) => {
  const errors = {};

  // Email validation
  if (!formData.email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Password validation
  if (!formData.password) {
    errors.password = 'Password is required';
  } else if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters long';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Admin registration validation
export const validateRegisterForm = (formData) => {
  const errors = {};

  // Username validation
  if (!formData.username || formData.username.trim().length < 3) {
    errors.username = 'Username must be at least 3 characters long';
  }

  // Email validation
  if (!formData.email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Password validation
  if (!formData.password) {
    errors.password = 'Password is required';
  } else if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters long';
  }

  // Confirm password validation
  if (!formData.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Product form validation
export const validateProductForm = (formData) => {
  const errors = {};

  // Name validation
  if (!formData.name || formData.name.trim().length < 3) {
    errors.name = 'Product name must be at least 3 characters long';
  }

  // Description validation
  if (!formData.description || formData.description.trim().length < 10) {
    errors.description = 'Description must be at least 10 characters long';
  }

  // Category validation
  if (!formData.category) {
    errors.category = 'Please select a category';
  }

  // Price validation (optional)
  if (formData.price && (isNaN(formData.price) || parseFloat(formData.price) < 0)) {
    errors.price = 'Price must be a valid positive number';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Profile update validation
export const validateProfileForm = (formData) => {
  const errors = {};

  // Username validation
  if (!formData.username || formData.username.trim().length < 3) {
    errors.username = 'Username must be at least 3 characters long';
  }

  // Email validation
  if (!formData.email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
