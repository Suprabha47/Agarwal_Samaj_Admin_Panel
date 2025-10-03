// Safe error handling utilities
export const safeError = (error) => {
  if (!error) return 'Unknown error';
  
  // If it's already a string, return it
  if (typeof error === 'string') return error;
  
  // If it's an Error object, return the message
  if (error instanceof Error) return error.message;
  
  // If it's an Axios error, extract the message
  if (error.response?.data?.error) return error.response.data.error;
  if (error.response?.data?.message) return error.response.data.message;
  if (error.message) return error.message;
  
  // If it's an object with a message property
  if (error.message) return error.message;
  
  // If it's an object, try to stringify safely
  try {
    return JSON.stringify(error);
  } catch (e) {
    return 'An error occurred';
  }
};

// Safe error object for Redux state
export const createSafeError = (error) => {
  return {
    message: safeError(error),
    timestamp: new Date().toISOString(),
    type: 'error'
  };
};

// Safe error rendering in JSX
export const SafeErrorDisplay = ({ error, fallback = 'Something went wrong' }) => {
  if (!error) return null;
  
  const errorMessage = safeError(error);
  
  return (
    <div className="text-red-500 text-sm">
      {errorMessage || fallback}
    </div>
  );
};
