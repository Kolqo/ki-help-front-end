import filterItems from "../../list-task/const/filterItems";

export function useTeachersActions() {
  const handleDoneClick = (validateSelection, navigate, subjectID, setError) => (e) => {
    e.preventDefault();
    const { isValid, selectedTeacher } = validateSelection();

    if (!isValid) {
      setError(true); 
      return;
    }

    setError(false);

    filterItems[0].select = selectedTeacher.name;
    navigate(`/list-task/${subjectID}`);
  };

  return {
    handleDoneClick,
  };
}