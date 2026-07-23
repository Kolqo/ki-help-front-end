import { useState } from 'react'

import { useErrorMessage } from '../../../shared/hooks'

import { patchCancelHistory } from '../../../entities/task/api'

const useCancelHistory = () => {
	const [isError, setIsError] = useErrorMessage()
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handlePatch = async (id, reason, onSuccess) => {
		try {
			setIsLoading(true)
			await patchCancelHistory(id, reason)
			setIsLoading(false)
			onSuccess?.()
		} catch (error) {
			const message =
				error.response?.data?.message ||
				error?.message ||
				'Помилка при скасуванні завдання'
			setErrorMessage(message)
			setIsError(true)
			setIsLoading(false)
		}
	}

	return {
		error: { isError: isError, errorMessage: errorMessage },
		isLoading,
		handlePatch,
	}
}

export default useCancelHistory
