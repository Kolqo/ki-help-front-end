import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useErrorMessage } from '../../../shared/hooks'

import { putIdentifier } from '../../../entities/identifier/api'
import { use } from 'react'

const usePutIdentifier = () => {
	const navigate = useNavigate()
	const [isError, setIsError] = useErrorMessage()
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handlePut = async (identifierId) => {
		try {
			setIsLoading(true)
			await putIdentifier(identifierId)
			setIsLoading(false)
			//navigate(`/list-task/${subjectId}/task-form/${action}/choose-identifier`)
		} catch (error) {
			const message =
				error.response?.data?.message ||
				error?.message ||
				'Помилка при додавання ідентифікатора'
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

export default usePutIdentifier
