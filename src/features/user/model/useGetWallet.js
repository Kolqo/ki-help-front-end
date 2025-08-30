import { useState, useEffect } from 'react'

import { useErrorMessage } from '../../../shared/hooks'
import { getWallet } from '../../../entities/user/api'

const useSelectedUserByRole = telegramId => {
	const [wallet, setWallet] = useState([])
	const [errorMessage, setErrorMessage] = useState('')
	const [isError, setIsError] = useErrorMessage()
	const [isLoading, setIsLoading] = useState(false)

	const fetchGet = () => {
		setIsLoading(true)
		getWallet(telegramId)
			.then(data => {
				setWallet(data)
				setIsLoading(false)
			})
			.catch(error => {
				const message =
					error.response?.data?.message ||
					error?.message ||
					'Не вдалося завантажити гаманець. Спробуйте пізніше'
				setErrorMessage(message)
				setIsError(true)
				setIsLoading(false)
			})
	}

	useEffect(() => {
		fetchGet()
	}, [])

	return {
		error: { isError: isError, errorMessage: errorMessage },
		isLoading,
		wallet,
	}
}

export default useSelectedUserByRole
