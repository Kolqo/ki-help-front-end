import { useState, useEffect } from "react";
import getIsAvailableBonusClaim from "../../../../entities/invited-user/api/getIsAvailableBonusClaim";

export const useIsAvailableBonusClaim = () => {
  const [ isAvailableClaim, setIsAvailableClaim ] = useState(false)

  useEffect(() => {
    getIsAvailableBonusClaim()
    .then((data) => {
      setIsAvailableClaim(data);
    })
    .catch((error) => {
      console.log(error)
    });
  }, []);

  return isAvailableClaim;
};