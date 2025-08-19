import { useState } from 'react'

import { useErrorMessage } from '../../../shared/hooks'

import { deleteFile } from '../../../entities/file/api'

const useDeleteFile = () => {
	const [isError, setIsError] = useErrorMessage()
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handleDelete = async documentId => {
		try {
			setIsLoading(true)
			await deleteFile(documentId)
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

export default useDeleteFile
