import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useErrorMessage } from '../../../shared/hooks'

import { putHistoryFile } from '../../../entities/task/api'

const usePutHistoryFile = (navUrl) => {
	const navigate = useNavigate()
	const [isError, setIsError] = useErrorMessage()
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handlePut = async (file, historyId) => {
		try {
			setIsLoading(true)
			await putHistoryFile(file, historyId)
			setIsLoading(false)
      console.log(navUrl)
			navigate(navUrl)
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
		handlePut,
	}
}

export default usePutHistoryFile
