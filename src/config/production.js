// Production configuration
export const PRODUCTION_CONFIG = {
  // Environment
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  
  // API Configuration
  api: {
    baseUrl: process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000',
    timeout: 30000, // 30 seconds
    retryAttempts: 3,
  },
  
  // Image Configuration
  images: {
    fallbackAvatar: 'https://via.placeholder.com/300x300',
    fallbackThumbnail: 'https://via.placeholder.com/600x400',
    fallbackImage: 'https://via.placeholder.com/300x200',
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  },
  
  // Error Handling
  errorHandling: {
    enableErrorBoundary: true,
    logErrors: process.env.NODE_ENV === 'development',
    showErrorDetails: process.env.NODE_ENV === 'development',
  },
  
  // Performance
  performance: {
    enableLazyLoading: true,
    enableImageOptimization: true,
    enableCodeSplitting: true,
  },
  
  // Security
  security: {
    sanitizeInputs: true,
    validateFileTypes: true,
    enableCSP: process.env.NODE_ENV === 'production',
  }
};

// Helper functions
export const getImageUrl = (imagePath, fallback = PRODUCTION_CONFIG.images.fallbackImage) => {
  if (!imagePath) return fallback;
  
  const baseUrl = PRODUCTION_CONFIG.api.baseUrl;
  const cleanPath = imagePath.replace(/\\/g, '/');
  return `${baseUrl}/uploads/${cleanPath}`;
};

export const getApiUrl = (endpoint) => {
  const baseUrl = PRODUCTION_CONFIG.api.baseUrl;
  return `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};

export const isValidImageType = (file) => {
  return PRODUCTION_CONFIG.images.allowedTypes.includes(file.type);
};

export const isValidFileSize = (file) => {
  return file.size <= PRODUCTION_CONFIG.images.maxFileSize;
};
