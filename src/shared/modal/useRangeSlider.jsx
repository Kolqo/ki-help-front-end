import { useState, useRef } from "react";

export const useRangeSlider = (max = 100, step = 1) => {
  const [value, setValue] = useState(0);
  const sliderRef = useRef(null);
  const thumbWidth = 12; // Ширина повзунка

  const getRelativePosition = (clientX) => {
    const slider = sliderRef.current;
    if (!slider) return 0;

    const rect = slider.getBoundingClientRect();
    // Враховуємо відступи для лінії (90% від загальної ширини)
    const lineWidth = rect.width * 0.9;
    const lineLeft = rect.left + (rect.width * 0.05);
    
    // Враховуємо половину ширини повзунка при розрахунку позиції
    const offsetX = clientX - lineLeft;
    const relativePosition = Math.max(0, Math.min(1, offsetX / lineWidth));

    return relativePosition;
  };

  const handleMouseOrTouchDown = (e) => {
    e.preventDefault();
    const isTouchEvent = e.type === "touchstart";
    const moveEvent = isTouchEvent ? "touchmove" : "mousemove";
    const endEvent = isTouchEvent ? "touchend" : "mouseup";

    const onMove = (event) => {
      const clientX = isTouchEvent
        ? event.touches[0].clientX
        : event.clientX;

      const relativePosition = getRelativePosition(clientX);
      const newValue = Math.round(relativePosition * max / step) * step;
      setValue(Math.min(max, Math.max(0, newValue)));
    };

    const onEnd = () => {
      window.removeEventListener(moveEvent, onMove);
      window.removeEventListener(endEvent, onEnd);
    };

    window.addEventListener(moveEvent, onMove);
    window.addEventListener(endEvent, onEnd);
  };

  const handleClickOnLine = (e) => {
    const relativePosition = getRelativePosition(e.clientX);
    const newValue = Math.round(relativePosition * max / step) * step;
    setValue(Math.min(max, Math.max(0, newValue)));
  };

  return {
    value,
    setValue,
    sliderRef,
    handleMouseOrTouchDown,
    handleClickOnLine,
    percentage: (value / max) * 100,
    max,
  };
};