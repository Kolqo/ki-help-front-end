import { useState } from 'react';

const useToggle = (thisState = false) => {
  const [state, setState] = useState(thisState);

  const toggle = () => {
    setState((prevState) => !prevState);
  };

  return { state, toggle };
}

export default useToggle