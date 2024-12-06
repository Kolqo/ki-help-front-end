import { useState } from 'react';

export default function useCheckBoxState() {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckboxState = () => {
    setIsChecked((prevState) => !prevState);
  };

  return { isChecked, toggleCheckboxState }; 
}