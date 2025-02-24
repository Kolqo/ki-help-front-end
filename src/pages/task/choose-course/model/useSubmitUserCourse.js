import { useState } from 'react';

import { useErrorMessage } from '../../../../shared/model';

import { patchUserCourse } from '../../../../entities/user/api';

const useSubmitUserCourse = () => {
  const { error, setError } = useErrorMessage();
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmitUserCourse = (objState, getCourses, setUserCourse) => {
    const values = Object.values(objState);
    const trueValues = values.filter((value) => value === true);

    const id = Object.keys(objState).find(key => objState[key] === true);
    const courseNumber = getCourses.find(creator => creator.id === Number(id));

    if (trueValues.length !== 1) {
      setErrorMessage("Будь ласка, оберіть лише один курс.")
      setError(true);
      return;
    } else {
      try {
        patchUserCourse(courseNumber.id)
        setUserCourse(courseNumber.id)
        setError(false);
      } catch (error) {
        setErrorMessage(error.response.data.message)
        setError(true);
      }
    }
  };

  return {
    error,
    errorMessage,
    handleSubmitUserCourse
  };
};

export default useSubmitUserCourse;