import { useState, useEffect } from 'react'

import { useErrorMessage } from '../../../shared/hooks'

import { getDiscount } from '../../../entities/discount/api'

const useGetDiscounts = type => {
	const [discounts, setDiscounts] = useState([])
	const [errorMessage, setErrorMessage] = useState('')
	const [isError, setIsError] = useErrorMessage()
	const [isLoading, setIsLoading] = useState(false)

	const fetchDiscount = () => {
		setIsLoading(true)
		getDiscount(type)
			.then(data => {
				setDiscounts(data)
				setIsError(false)
				setIsLoading(false)
			})
			.catch(error => {
				const message =
					error.response?.data?.message ||
					error?.message ||
					'Не вдалося завантажити знижки. Спробуйте пізніше'
				setErrorMessage(message)
				setIsError(true)
				setIsLoading(false)
			})
	}

	useEffect(() => {
		fetchDiscount()
	}, [])

	return {
		error: { isError: isError, errorMessage: errorMessage },
		isLoading,
		discounts,
		refetch: fetchDiscount,
	}
}

export default useGetDiscounts
