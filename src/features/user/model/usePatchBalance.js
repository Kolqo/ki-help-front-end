import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useErrorMessage } from '../../../shared/hooks'

import { patchChangeBalance } from '../../../entities/user/api'

const usePatchBalance = () => {
	const [isError, setIsError] = useErrorMessage()
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handlePatch  = async (walletId, amount, closeSheet, refetch) => {
    
		try {
			setIsLoading(true)
			await patchChangeBalance(walletId, amount)
      closeSheet()
      refetch()
			setIsLoading(false)
		} catch (error) {
			const message =
				error.response?.data?.message ||
				error?.message ||
				'Помилка при зміні ролі'
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

export default usePatchBalance
