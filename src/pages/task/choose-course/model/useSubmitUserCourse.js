import { useNavigate } from 'react-router-dom';

const useSubmitUserCourse = (objState, setError) => {
  const navigate = useNavigate();

  const handleSubmitUserCourse = () => {
    const values = Object.values(objState);
    const trueValues = values.filter((value) => value === true);
    if (trueValues.length !== 1) {
      setError(true);
      return;
    } else {
      setError(false);
    }
    navigate(`/`);
  };

  return handleSubmitUserCourse;
};

export default useSubmitUserCourse;