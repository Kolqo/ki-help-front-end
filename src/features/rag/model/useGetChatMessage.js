import { useState, useEffect } from 'react'

import { useErrorMessage } from '../../../shared/hooks'

import { getChatMessage } from '../../../entities/rag/api'

const useGetDiscounts = explanation_session_id => {
	const [chat, setChat] = useState([])
	const [errorMessage, setErrorMessage] = useState('')
	const [isError, setIsError] = useErrorMessage()
	const [isLoading, setIsLoading] = useState(false)

	const fetchChatMessage = () => {
		setIsLoading(true)
		getChatMessage(explanation_session_id)
			.then(data => {
				setChat(data)
				setIsError(false)
				setIsLoading(false)
			})
			.catch(error => {
				const message =
					error.response?.data?.message ||
					error?.message ||
					'Не вдалося завантажити аргументи. Спробуйте пізніше'
				setErrorMessage(message)
				setIsError(true)
				setIsLoading(false)
			})
	}

	useEffect(() => {
		fetchChatMessage()
	}, [])

	return {
		error: { isError: isError, errorMessage: errorMessage },
		isLoading,
		chat,
		refetch: fetchChatMessage,
	}
}

export default useGetDiscounts
