import { useState } from 'react';

/**
 * Логіка для перемикання стану.
 * @returns {object} isEdit (стан) і функція toggleState для зміни.
 */
export default function useToggle() {
  const [state, setState] = useState(false);

  const toggle = () => {
    setState((prevState) => !prevState);
  };

  return { state, toggle };
}