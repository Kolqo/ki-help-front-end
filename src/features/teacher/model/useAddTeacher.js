import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useErrorMessage } from '../../../shared/hooks'

import { postTeacher } from '../../../entities/choice-item/api'

const useAddTeacher = () => {
	const navigate = useNavigate()
	const [isError, setIsError] = useErrorMessage()
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handlePost = async (teacherData) => {
    
		try {
			setIsLoading(true)
			await postTeacher(teacherData)
			setIsLoading(false)
			navigate(`/list-task/${teacherData.subjectId}/filtering`)
		} catch (error) {
			const message =
				error.response?.data?.message ||
				error?.message ||
				'Помилка при додаванні предмета'
			setErrorMessage(message)
			setIsError(true)
			setIsLoading(false)
		}
	}

	return {
		error: {isError: isError, errorMessage: errorMessage},
		isLoading,
		handlePost,
	}
}

export default useAddTeacher
