import { useState } from 'react'

import { useErrorMessage } from '../../../shared/hooks'

import { postNotification } from '../../../entities/user/api'

const usePostNotification = () => {
	const [isError, setIsError] = useErrorMessage()
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handlePost = async (notification, setNotification) => {
		try {
			setIsLoading(true)
			await postNotification(notification)
			setIsLoading(false)
			setNotification({ message: '', courseNumber: '', files: [] })
		} catch (error) {
			const message =
				error.response?.data?.message ||
				error?.message ||
				'Помилка при надсилання оголошення'
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

export default usePostNotification
