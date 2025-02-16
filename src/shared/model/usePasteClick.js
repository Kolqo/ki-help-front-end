import { useState } from 'react';

const usePasteClick = () =>{
  const [inputValue, setInputValue] = useState("");

  const handlePasteClick = () => {
    navigator.clipboard.readText().then((text) => {
      setInputValue(text);
    });
  };

  return { inputValue, handlePasteClick, setInputValue }; 
}

export default usePasteClick