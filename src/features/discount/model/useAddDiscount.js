import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useErrorMessage } from '../../../shared/hooks'

import { postDiscount } from '../../../entities/discount/api'
 
const useAddDiscount = () => {
	const navigate = useNavigate()
	const [isError, setIsError] = useErrorMessage()
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handlePost = async discount => {
		try {
			setIsLoading(true)
			await postDiscount(discount)
			setIsLoading(false)
      navigate('/settings/admin-panel/list-discount')
		} catch (error) {
			const message =
				error.response?.data?.message ||
				error?.message ||
				'Помилка при додавання знижки'
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

export default useAddDiscount
