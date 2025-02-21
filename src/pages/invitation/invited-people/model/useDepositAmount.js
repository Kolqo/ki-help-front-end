import getIsAvailableBonusClaim from "../../../../entities/invited-user/api/putDepositAmount.js";

export const useDepositAmount = () => {
  const handleBonusClaim = async () => {
    console.log("ВІДБУСЯ useDepositAmount")
    try {
      await getIsAvailableBonusClaim();
    } catch (error) {
      setErrorMessage(error.request.response)
    } 
  };
  return handleBonusClaim;
};