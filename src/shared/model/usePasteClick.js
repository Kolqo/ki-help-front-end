import { useState } from 'react';

const usePasteClick = () =>{
  const [inputValue, setInputValue] = useState("");

  const handlePasteClick = () => {
    document.getElementById('1').addEventListener('click', async () => {
      try {
        const text = await navigator.clipboard.readText();
        console.log(text)
        setInputValue(text);
      } catch (err) {
        console.error('Помилка при зчитуванні тексту з буферу обміну:', err);
      }
    });
  };

  return { inputValue, handlePasteClick, setInputValue }; 
}

export default usePasteClick