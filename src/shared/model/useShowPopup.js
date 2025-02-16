import { useState, useEffect, useCallback } from "react";

const useShowPopup = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [touchTimeout, setTouchTimeout] = useState(null);

  const calculatePosition = (x, y) => {
    const menuWidth = 130;
    const menuHeight = 60;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let newX = x + window.pageXOffset;
    let newY = y + window.pageYOffset;

    if (newX + menuWidth > windowWidth + window.pageXOffset) {
      newX -= menuWidth;
    }

    if (newY + menuHeight > windowHeight + window.pageYOffset) {
      newY -= menuHeight;
    }

    newX = Math.max(window.pageXOffset, Math.min(newX, windowWidth + window.pageXOffset - menuWidth));
    newY = Math.max(window.pageYOffset, Math.min(newY, windowHeight + window.pageYOffset - menuHeight));

    return { x: newX, y: newY };
  };

  const handleContextMenu = useCallback((event) => {
    event.preventDefault();
    const { clientX: x, clientY: y } = event;
    const position = calculatePosition(x, y);
    setMenuPosition(position);
    setShowMenu(true);
  }, []);

  const handleTouchStart = useCallback((event) => {
    event.preventDefault();
    const touch = event.touches[0];
    const { clientX: x, clientY: y } = touch;
    
    const timeoutId = setTimeout(() => {
      const position = calculatePosition(x, y);
      setMenuPosition(position);
      setShowMenu(true);
    }, 500);
    
    setTouchTimeout(timeoutId);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchTimeout) {
      clearTimeout(touchTimeout);
      setTouchTimeout(null);
    }
  }, [touchTimeout]);

  const handleTouchMove = useCallback(() => {
    if (touchTimeout) {
      clearTimeout(touchTimeout);
      setTouchTimeout(null);
    }
  }, [touchTimeout]);

  const handleClick = useCallback((event) => {
    if (showMenu && !event.target.closest('.style-admin-popup')) {
      setShowMenu(false);
    }
  }, [showMenu]);

  useEffect(() => {
    document.addEventListener('touchstart', handleClick);
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('touchstart', handleClick);
      document.removeEventListener('click', handleClick);
    };
  }, [handleClick]);

  const menuState = {
    showMenu,
    menuPosition,
    handleContextMenu,
    handleTouchStart,
    handleTouchEnd,
    handleTouchMove,
  };

  return menuState;
};

export default useShowPopup;