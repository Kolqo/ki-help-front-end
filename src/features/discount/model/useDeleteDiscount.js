import { useState }  from "react";

import { useErrorMessage } from '../../../shared/hooks'

import { deleteDiscount } from '../../../entities/discount/api'

const useDeleteDiscount = () => {
  const [ isError, setIsError ] = useErrorMessage();
  const [errorMessage, setErrorMessage] = useState("")
  const [ isLoading, setIsLoading ] = useState(false);

  const handleDelete = async discountId => {
		try {
			setIsLoading(true)
			await deleteDiscount(discountId)
			setIsLoading(false)
		} catch (error) {
			const message =
				error.response?.data?.message ||
				error?.message ||
				'Помилка при видалення знижки'
			setErrorMessage(message)
			setIsError(true)
			setIsLoading(false)
		}
	}


  return {
		error: { isError: isError, errorMessage: errorMessage },
		isLoading,
		handleDelete,
	}
};

export default useDeleteDiscount;