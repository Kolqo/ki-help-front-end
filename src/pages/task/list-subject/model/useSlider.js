import { useState, useEffect } from 'react';

export const useSlider = (slidesLength) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev === slidesLength - 1 ? 0 : prev + 1));
    }, 10000);
    
    return () => clearInterval(interval);
  }, [slidesLength]);

  const goToSlide = (index) => {
    if (index >= 0 && index < slidesLength) {
      setCurrentSlide(index);
    }
  };

  return { currentSlide, goToSlide };
};