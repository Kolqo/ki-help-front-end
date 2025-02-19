import { useNavigate } from "react-router-dom";

import filterItems from "../../list-task/const/filterItems";

export const usePriceActions = () => {
  const navigate = useNavigate()
  const handleDoneClick = (moreOrLess, value, subjectID) => {
    return () => {
      filterItems(subjectID)[2].select = `${moreOrLess}${value}`;
      navigate(`/list-task/${subjectID}`);
    };
  };

  return { handleDoneClick };
};