// Safe environment variable access
export const getBackendUrl = () => {
  const url = process.env.REACT_APP_BACKEND_URL;
  if (!url) {
    console.error('REACT_APP_BACKEND_URL is not defined');
    return 'http://localhost:3000'; // fallback URL
  }
  return url;
};

export const getApiUrl = (endpoint) => {
  const baseUrl = getBackendUrl();
  return `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};

// Safe image URL construction
export const getImageUrl = (imagePath) => {
  if (!imagePath) return 'https://via.placeholder.com/300x200';
  
  const baseUrl = getBackendUrl();
  const cleanPath = imagePath.replace(/\\/g, '/');
  return `${baseUrl}/uploads/${cleanPath}`;
};
