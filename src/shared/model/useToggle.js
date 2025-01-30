import { useState } from 'react';

export default function useToggle(thisState = false) {
  const [state, setState] = useState(thisState);

  const toggle = () => {
    setState((prevState) => !prevState);
  };

  return { state, toggle };
}