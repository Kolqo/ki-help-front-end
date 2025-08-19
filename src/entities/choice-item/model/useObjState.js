import { useState } from 'react';

const useObjState = (getObj) => {
  const [checkedState, setCheckedState] = useState(
    getObj.reduce((acc, obj) => {
      acc[obj.id] = false;
      return acc;
    }, {})
  );

  return {checkedState, setCheckedState};
};

export default useObjState;