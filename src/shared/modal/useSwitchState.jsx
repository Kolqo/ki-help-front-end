import { useState } from 'react';

/**
 * Логіка для перемикання стану.
 * @returns {object} isEdit (стан) і функція toggleState для зміни.
 */
export default function useSwitchState() {
  const [isSwitch, setIsSwitch] = useState(true);

  const toggleSwitchState = () => {
    setIsSwitch((prevState) => !prevState); 
  };

  return { isSwitch, toggleSwitchState }; 
}