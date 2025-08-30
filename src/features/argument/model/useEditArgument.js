import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useErrorMessage } from '../../../shared/hooks'

import { putArgument } from '../../../entities/choice-item/api'

const useEditArgument = () => {
	const navigate = useNavigate()
	const [isError, setIsError] = useErrorMessage()
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handlePatch = async (argumentData, subjectId, action) => {
		try {
			setIsLoading(true)
			await putArgument(argumentData)
			setIsLoading(false)
			navigate(`/list-task/${subjectId}/task-form/${action}/choose-arguments`)
		} catch (error) {
			const message =
				error.response?.data?.message ||
				error?.message ||
				'Помилка при редагування аргумента'
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

export default useEditArgument
