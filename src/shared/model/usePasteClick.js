import { useState } from 'react';

export default function usePasteClick() {
  const [inputValue, setInputValue] = useState("");

  const handlePasteClick = () => {
    navigator.clipboard.readText().then((text) => {
      setInputValue(text);
    });
  };

  return { inputValue, handlePasteClick, setInputValue }; 
}