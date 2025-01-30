import { useState, useEffect } from 'react';

export const useErrorMessage = () => {
  const [error, setError] = useState(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(false);
      }, 5000); // 5 секунд

      return () => clearTimeout(timer); 
    }
  }, [error]); 

  return {
    error,
    setError,
  };
};