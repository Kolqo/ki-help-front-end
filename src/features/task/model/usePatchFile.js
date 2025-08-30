import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useErrorMessage } from "../../../shared/hooks";

import { patchSaveFile } from "../../../entities/task/api";

const usePatchFile = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useErrorMessage();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePatch = async (historyId, file, closeSheet, historyRefetch) => {
		try {
			setIsLoading(true)
			await patchSaveFile(historyId, file)
			setIsLoading(false)
			closeSheet()
      historyRefetch()
		} catch (error) {
			const message =
				error.response?.data?.message ||
				error?.message ||
				'Помилка при надсилання файла користувачеві'
			setErrorMessage(message)
			setIsError(true)
			setIsLoading(false)
		}
	}

  return {
    error: { isError: isError, errorMessage: errorMessage },
    isLoading,
    handlePatch,
  };
};

export default usePatchFile;
