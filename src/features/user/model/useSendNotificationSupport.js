import { useState } from 'react'

import { useErrorMessage } from '../../../shared/hooks'

import { postSendNotificationSupport } from '../../../entities/user/api'

const useSendNotificationSupport = () => {
	const [isError, setIsError] = useErrorMessage()
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handlePost = async (support, setSupport) => {
		try {
			setIsLoading(true)
			await postSendNotificationSupport(support)
			setIsLoading(false)
			setSupport({ message: '', files: [] })
		} catch (error) {
			const message =
				error.response?.data?.message ||
				error?.message ||
				'Помилка при надсилання повідомлення в підтримку'
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
