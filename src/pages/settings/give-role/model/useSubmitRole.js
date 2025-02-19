import { useNavigate } from 'react-router-dom';

import { useErrorMessage } from '../../../../shared/model';

const useSubmitUserRole = (objState) => {
  const { error, setError } = useErrorMessage();
  const navigate = useNavigate();

  const handleSubmitUserRole = () => {
    const values = Object.values(objState);
    const trueValues = values.filter((value) => value === true);
    if (trueValues.length !== 1) {
      setError(true);
      return;
    } else {
      setError(false);
    }
    navigate(`/settings/admin-panel/profile`);
  };

  return {
    handleSubmitUserRole,
    error,
  };
};

export default useSubmitUserRole;