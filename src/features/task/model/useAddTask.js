import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useErrorMessage } from '../../../shared/hooks'

import { postTask } from '../../../entities/task/api'

const useAddTask = () => {
	const navigate = useNavigate()
	const [isError, setIsError] = useErrorMessage()
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handlePost = async (task, subjectID) => {
		try {
			setIsLoading(true)
			await postTask(task)
			setIsLoading(false)
			navigate(`/list-task/${subjectID}`)
		} catch (error) {
			const message =
				error.response?.data?.message ||
				error?.message ||
				'Помилка при додаванні завдання'
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

export default useAddTask
