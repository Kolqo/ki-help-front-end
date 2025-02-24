import { useNavigate } from "react-router-dom";

export const usePriceActions = () => {
  const navigate = useNavigate()
  const handleDoneClick = (moreOrLess, value, subjectID) => {
    const newValue = value === 0 ? null : `${moreOrLess}${value}`
    return () => {
      navigate(`/list-task/${subjectID}`, {
        state: { filter: 'price', value: newValue},
      });
    };
  };

  return { handleDoneClick };
};