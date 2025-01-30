import filterItems from "../../list-task/const/filterItems";

export const usePriceActions = () => {
  const handleDoneClick = (moreOrLess, value, subjectID, navigate) => {
    return () => {
      filterItems[2].select = `${moreOrLess}${value}`;
      navigate(`/list-task/${subjectID}`);
    };
  };

  return { handleDoneClick };
};