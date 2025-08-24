import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useErrorMessage } from '../../../shared/hooks'

import { patchCardNumber } from '../../../entities/user/api'

const usePatchCardNumber = () => {
	const navigate = useNavigate()
	const [isError, setIsError] = useErrorMessage()
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handlePatch = async (walletId, cardNumber) => {
		try {
			setIsLoading(true)
			await patchCardNumber(walletId, cardNumber)
			setIsLoading(false)
			navigate(`/wallet/payments`)
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
		handlePatch,
	}
}

export default usePatchCardNumber
