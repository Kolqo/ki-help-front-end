import filterItems from "../../list-task/const/filterItems";

export function useCreatorsActions() {
  const handleDoneClick = (validateSelection, navigate, subjectID, setError) => (e) => {
    e.preventDefault();
    const { isValid, selectedCreator } = validateSelection();
    
    if (!isValid) {
      setError(true); 
      return;
    }

    setError(false);

    filterItems[1].select = selectedCreator.name;
    navigate(`/list-task/${subjectID}`);
  };

  return {
    handleDoneClick
  };
}