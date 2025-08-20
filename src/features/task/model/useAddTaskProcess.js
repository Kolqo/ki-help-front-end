import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useErrorMessage } from '../../../shared/hooks'

import { postTaskProcess } from '../../../entities/task/api'

const useAddTaskProcess = () => {
	const navigate = useNavigate()
	const [isError, setIsError] = useErrorMessage()
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handlePost = async (subjectID, taskId, args) => {
		try {
      console.log(taskId, args)
			setIsLoading(true)
			const processTask = await postTaskProcess(taskId, args)
      localStorage.setItem('processTask', JSON.parse(processTask))
			navigate(`/list-task/${subjectID}/buying/buying-result`)
		} catch (error) {
			setIsError(true)
			setErrorMessage(error.response.data.message)
		} finally {
			setIsLoading(false)
		}
	}

	return {
		error: { isError: isError, errorMessage: errorMessage },
		isLoading,
		handlePost,
	}
}

export default useAddTaskProcess
