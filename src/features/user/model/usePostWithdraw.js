import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


import { useErrorMessage } from '../../../shared/hooks'

import { postWithdraw } from '../../../entities/user/api'

const usePostWithdraw = () => {
  const navigate = useNavigate()
	const [isError, setIsError] = useErrorMessage()
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handlePost = async (amount, encodedWalletId) => {
		try {
			setIsLoading(true)
			await postWithdraw(amount, encodedWalletId)
			setIsLoading(false)
      navigate('/wallet')
		} catch (error) {
			const message =
				error.response?.data?.message ||
				error?.message ||
				'Помилка при надсилання запиту на знаття коштів'
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

export default usePostWithdraw
