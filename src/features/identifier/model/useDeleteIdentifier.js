import { useState } from 'react'

import { useErrorMessage } from '../../../shared/hooks'

import { deleteIdentifier } from '../../../entities/identifier/api'

const useDeleteIdentifier = () => {
	const [isError, setIsError] = useErrorMessage()
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handleDelete = async identifierId => {
		try {
			setIsLoading(true)
			await deleteIdentifier(identifierId)
			setIsLoading(false)
		} catch (error) {
			const message =
				error.response?.data?.message ||
				error?.message ||
				'Помилка при видаленні завдання'
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

export default useDeleteIdentifier
