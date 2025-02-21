import { useErrorMessage } from '../../../../shared/model';

import { patchUserCourse } from '../../../../entities/user/api';

const useSubmitUserCourse = () => {
  const { error, setError } = useErrorMessage();

  const handleSubmitUserCourse = (objState, getCourses, setUserCourse) => {
    const values = Object.values(objState);
    const trueValues = values.filter((value) => value === true);

    const id = Object.keys(objState).find(key => objState[key] === true);
    const courseNumber = getCourses.find(creator => creator.id === Number(id));

    if (trueValues.length !== 1) {
      setError(true);
      return;
    } else {
      setError(false);
      patchUserCourse(courseNumber.id)
      setUserCourse(courseNumber.id)
    }
  };

  return {
    error,
    handleSubmitUserCourse
  };
};

export default useSubmitUserCourse;