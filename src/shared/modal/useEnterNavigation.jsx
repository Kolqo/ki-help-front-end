import { useCallback } from "react";

const useEnterNavigation = () => {
  const handleEnterKeyPress = useCallback((event, nextInputRef) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (nextInputRef && nextInputRef.current) {
        nextInputRef.current.focus(); 
      } else {
        event.target.blur(); 
      }
    }
  }, []);

  return { handleEnterKeyPress };
};

export default useEnterNavigation;
