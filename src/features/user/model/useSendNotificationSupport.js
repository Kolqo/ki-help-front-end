import { useState } from 'react'

import { useErrorMessage } from '../../../shared/hooks'

import { postSendNotificationSupport } from '../../../entities/user/api'

const useSendNotificationSupport = () => {
	const [isError, setIsError] = useErrorMessage()
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handlePost = async (message, files) => {
		try {
			setIsLoading(true)
			await postSendNotificationSupport(message, files)
			setIsLoading(false)
		} catch (error) {
			const message =
				error.response?.data?.message ||
				error?.message ||
				'Помилка при надсилання повідомлення'
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

export default useSendNotificationSupport
