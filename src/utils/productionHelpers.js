// Production helper utilities
export const isProduction = process.env.NODE_ENV === 'production';

// Safe console logging for production
export const safeLog = (...args) => {
  if (!isProduction) {
    console.log(...args);
  }
};

export const safeError = (...args) => {
  if (!isProduction) {
    console.error(...args);
  }
};

// Safe object property access
export const safeGet = (obj, path, defaultValue = null) => {
  try {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : defaultValue;
    }, obj);
  } catch (error) {
    return defaultValue;
  }
};

// Safe array mapping with error handling
export const safeMap = (array, renderFn, fallback = null) => {
  if (!Array.isArray(array) || array.length === 0) {
    return fallback;
  }
  
  try {
    return array.map(renderFn);
  } catch (error) {
    safeError('Error in safeMap:', error);
    return fallback;
  }
};

// Image error handler
export const handleImageError = (event, fallbackSrc = 'https://via.placeholder.com/300x200') => {
  if (event.target.src !== fallbackSrc) {
    event.target.src = fallbackSrc;
  }
};

// Safe date formatting
export const formatDate = (dateString, fallback = 'N/A') => {
  if (!dateString) return fallback;
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return fallback;
    return date.toLocaleDateString();
  } catch (error) {
    return fallback;
  }
};

// Safe string truncation
export const truncateText = (text, maxLength = 100, suffix = '...') => {
  if (!text || typeof text !== 'string') return '';
  return text.length > maxLength ? text.substring(0, maxLength) + suffix : text;
};
