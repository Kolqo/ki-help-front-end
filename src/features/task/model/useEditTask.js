import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useErrorMessage } from '../../../shared/hooks'

import { putTask } from '../../../entities/task/api'

const useEditTask = () => {
	const navigate = useNavigate()
	const [isError, setIsError] = useErrorMessage()
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handlePut = async (task, subjectID) => {
		try {
			setIsLoading(true)
			await putTask(task)
			setIsLoading(false)
			navigate(`/list-task/${subjectID}`)
		} catch (error) {
			const message =
				error.response?.data?.message ||
				error?.message ||
				'Помилка при редагування предмета'
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

export default useEditTask
