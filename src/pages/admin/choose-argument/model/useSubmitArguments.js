import { useNavigate } from 'react-router-dom';

const useSubmitArguments= () => {
  const navigate = useNavigate();

  const handleSubmitArguments = (objState, subjectID) => {
    const args = Object.keys(objState).filter(key => objState[key] === true);
  
    sessionStorage.setItem("selectedArgs", JSON.stringify(args));
    navigate(`/list-task/add-task/${subjectID}`)
  };

  return handleSubmitArguments
};

export default useSubmitArguments;