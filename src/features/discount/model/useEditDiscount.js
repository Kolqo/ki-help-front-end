import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useErrorMessage } from '../../../shared/hooks'

import { putDiscount } from '../../../entities/discount/api'

const useEditDiscount = () => {
	const navigate = useNavigate()
	const [isError, setIsError] = useErrorMessage()
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handlePatch = async discount => {
		try {
			setIsLoading(true)
			await putDiscount(discount)
			setIsLoading(false)
			navigate('/settings/admin-panel/list-discount')
		} catch (error) {
			const message =
				error.response?.data?.message ||
				error?.message ||
				'Помилка при редагування снижки'
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

export default useEditDiscount
