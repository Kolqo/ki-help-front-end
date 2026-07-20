import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useErrorMessage } from '../../../shared/hooks'

import { postDeposit } from '../../../entities/user/api'

const usePostDeposite = () => {
	const [isError, setIsError] = useErrorMessage()
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handlePost = (
		amount,
		provider,
		closeSheet,
		refetch,
	) => {
		setIsLoading(true)
		return postDeposit(amount, provider)
			.then(data => {
				closeSheet()
				refetch()
				return data
			})
			.catch(error => {
				const message =
					error.response?.data?.message ||
					error?.message ||
					'Помилка при зміні ролі'
				setErrorMessage(message)
				setIsError(true)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	return {
		error: { isError: isError, errorMessage: errorMessage },
		isLoading,
		handlePost,
	}
}

export default usePostDeposite
