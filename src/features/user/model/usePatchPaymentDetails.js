import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useErrorMessage } from '../../../shared/hooks'

import { patchPaymentDetails } from '../../../entities/user/api'

const usePatchPaymentDetails = () => {
	const navigate = useNavigate()
	const [isError, setIsError] = useErrorMessage()
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handlePatch = async (walletId, paymentDetails, paymentDetailsType) => {
		try {
			setIsLoading(true)
			await patchPaymentDetails(walletId, paymentDetails, paymentDetailsType)
			setIsLoading(false)
			navigate(`/wallet/payments`)
		} catch (error) {
			const message =
				error.response?.data?.message ||
				error?.message ||
				'Помилка при надсиланні реквізитів для виплат'
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

export default usePatchPaymentDetails
