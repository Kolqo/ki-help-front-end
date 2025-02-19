import { useNavigate } from 'react-router-dom';

import { useErrorMessage } from '../../../../shared/model';

import filterItems from "../../list-task/const/filterItems.js"

const useSubmitUserCreator = () => {
  const { error, setError } = useErrorMessage();
  const navigate = useNavigate();

  const handleSubmitUserCreator = (objState, subjectID, getCreators) => {
    const values = Object.values(objState);
    const trueValues = values.filter((value) => value === true);

    const id = Object.keys(objState).find(k => k == 1);
    const creator = getCreators.find(creator => creator.id === Number(id));

    if (trueValues.length !== 1) {
      setError(true);
      return;
    } else {
      setError(false);
    }

    filterItems(subjectID)[1].select = creator.name;
    navigate(`/list-task/${subjectID}`);
  };

  return {
    handleSubmitUserCreator,
    error,
  };
};

export default useSubmitUserCreator;