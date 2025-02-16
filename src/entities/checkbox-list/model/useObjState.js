import React, { useState } from 'react';

const useObjState = (getCourses) => {
  const [checkedState, setCheckedState] = useState(
    getCourses.reduce((acc, course) => {
      acc[course.id] = false;
      return acc;
    }, {})
  );

  return {checkedState, setCheckedState};
};

export default useObjState;