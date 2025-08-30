import { useState } from 'react'

import { useErrorMessage } from '../../../shared/hooks'

import { deleteArgument } from '../../../entities/choice-item/api'

const useDeleteArgument = () => {
	const [isError, setIsError] = useErrorMessage()
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handleDelete = async argumentID => {
		try {
			setIsLoading(true)
			await deleteArgument(argumentID)
			setIsLoading(false)
		} catch (error) {
			const message =
				error.response?.data?.message ||
				error?.message ||
				'Помилка при видаленні аргумента'
			setErrorMessage(message)
			setIsError(true)
			setIsLoading(false)
		}
	}

	return {
		error: { isError: isError, errorMessage: errorMessage },
		isLoading: isLoading,
		handleDelete,
	}
}

export default useDeleteArgument
