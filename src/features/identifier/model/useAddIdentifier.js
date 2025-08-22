import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useErrorMessage } from '../../../shared/hooks'

import { postIdentifier } from '../../../entities/identifier/api'
 
const useAddIdentifier = () => {
	const navigate = useNavigate()
	const [isError, setIsError] = useErrorMessage()
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handlePost = async (identifier, subjectId, action) => {
		try {
			setIsLoading(true)
			await postIdentifier(identifier)
			setIsLoading(false)
			navigate(`/list-task/${subjectId}/task-form/${action}/choose-identifier`)
		} catch (error) {
			const message =
				error.response?.data?.message ||
				error?.message ||
				'Помилка при додаванні файла'
			setErrorMessage(message)
			setIsError(true)
			setIsLoading(false)
		}
	}

	return {
		error: { isError: isError, errorMessage: errorMessage },
		isLoading,
		handlePost,
	}
}

export default useAddIdentifier
