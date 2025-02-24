import { useNavigate } from 'react-router-dom';

import { useErrorMessage } from '../../../../shared/model';

const useSubmitUserCreator = () => {
  const { error, setError } = useErrorMessage();
  const navigate = useNavigate();

  const handleSubmitUserCreator = (objState, subjectID, getCreators) => {
    const values = Object.values(objState);
    const trueValues = values.filter((value) => value === true);

    const id = Object.keys(objState).find(key => objState[key] === true);
    const creator = getCreators.find(creator => creator.telegramId === id);
    console.log(creator);
    if (trueValues.length > 1) {
      setError(true);
      return;
    } else {
      setError(false);
    }

    navigate(`/list-task/${subjectID}`, {
      state: { filter: 'creator', value: creator },
    });
  };

  return {
    handleSubmitUserCreator,
    error,
  };
};

export default useSubmitUserCreator;