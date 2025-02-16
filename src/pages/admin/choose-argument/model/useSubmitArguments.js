import { useNavigate } from 'react-router-dom';

import { useErrorMessage } from '../../../../shared/model';

const useSubmitUserCourse = (objState) => {
  const { error, setError } = useErrorMessage();
  const navigate = useNavigate();

  const handleSubmitUserCourse = () => {
    const values = Object.values(objState);
    const trueValues = values.filter((value) => value === true);
    if (trueValues.length < 1) {
      setError(true);
      return;
    } else {
      setError(false);
    }
    navigate(`/add-task`);
  };

  return {
    handleSubmitUserCourse,
    error,
  };
};

export default useSubmitUserCourse;