import { useState } from 'react'

import { useErrorMessage } from '../../../shared/hooks'

import {deleteTeacher} from '../../../entities/choice-item/api'

const useDeleteTeacher = () => {
	const [isError, setIsError] = useErrorMessage()
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handleDelete = async teacherId => {
		try {
			setIsLoading(true)
			await deleteTeacher(teacherId)
			setIsLoading(false)
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
		error: { isError: isError, errorMessage: errorMessage },
		isLoading,
		handleDelete,
	}
}

export default useDeleteTeacher
