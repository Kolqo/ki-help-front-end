import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useErrorMessage } from '../../../shared/hooks'

import { postChat } from '../../../entities/rag/api'

const usePatchChat = () => {
	const navigate = useNavigate()
  const [answer, setAnswer] = useState(null)
	const [isError, setIsError] = useErrorMessage()
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handlePost = async (explanationSessionId, question) => {
		try {
			setIsLoading(true)
			await postChat(explanationSessionId, question)
				.then(data => {
          console.log('data:', data)
          console.log('data.answer:', data.answer)
					setAnswer(data.answer)
					setIsError(false)
					setIsLoading(false)
				})
				.catch(error => {
					setIsError(true)
					setErrorMessage(error.response.data.message)
					setIsLoading(false)
				})
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
    answer,
		handlePost,
	}
}

export default usePatchChat
