import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useErrorMessage } from '../../../shared/hooks'

import { putHistoryReprocess } from '../../../entities/task/api'

const usePutHistoryReprocess = () => {
	const navigate = useNavigate()
	const [isError, setIsError] = useErrorMessage()
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handlePatch = async (historyId, closeSheet, historyRefetch) => {
		try {
			setIsLoading(true)
			await putHistoryReprocess(historyId)
			closeSheet()
			historyRefetch()
			setIsLoading(false)
		} catch (error) {
			const message =
				error.response?.data?.message ||
				error?.message ||
				'Помилка при перегенерації завдання'
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

export default usePutHistoryReprocess
