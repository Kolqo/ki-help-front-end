import { useState, useEffect } from 'react'

import { useErrorMessage } from '../../../shared/hooks'
import { getCurrencyRates } from '../../../entities/transaction/api'

const useGetCurrencyRates = () => {
	const [rates, setRates] = useState(null)
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState()
	const [isError, setIsError] = useErrorMessage()

	const fetchRates = () => {
		setIsLoading(true)
		getCurrencyRates()
			.then(data => {
				setRates(data)
				setIsError(false)
				setIsLoading(false)
			})
			.catch(error => {
				const message =
					error.response?.data?.message ||
					error?.message ||
					'Не вдалося завантажити курси валют. Спробуйте пізніше'
				setErrorMessage(message)
				setIsError(true)
				setIsLoading(false)
			})
			.finally(() => setFetching(false))
	}

	useEffect(() => {
		fetchRates()
	}, [])

	return {
		error: { isError: isError, errorMessage: errorMessage },
		isLoading,
		rates,
		refetch: fetchRates,
	}
}

export default useGetCurrencyRates
