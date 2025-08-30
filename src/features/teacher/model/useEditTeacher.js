import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useErrorMessage } from '../../../shared/hooks'

import { putTeacher } from '../../../entities/choice-item/api'

const useEditTeacher = () => {
	const navigate = useNavigate()
	const [isError, setIsError] = useErrorMessage()
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handlePut = async (teacherData) => {
		try {
			setIsLoading(true)
			await putTeacher(teacherData)
			setIsLoading(false)
			navigate(`/list-task/${teacherData.subject.id}/filtering`)
		} catch (error) {
			const message =
				error.response?.data?.message ||
				error?.message ||
				'Помилка при редагування вчителя'
			setErrorMessage(message)
			setIsError(true)
			setIsLoading(false)
		}
	}

	return {
		error: {isError: isError, errorMessage: errorMessage},
		isLoading,
		handlePut,
	}
}

export default useEditTeacher
