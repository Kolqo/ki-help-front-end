import { useState, useEffect, useRef } from 'react'

import { useErrorMessage, useScrollPagination } from '../../../shared/hooks'

import { getDiscount } from '../../../entities/discount/api'

const useGetDiscounts = type => {
	const [discounts, setDiscounts] = useState([])
	const [errorMessage, setErrorMessage] = useState('')
	const [isError, setIsError] = useErrorMessage()
	const [isLoading, setIsLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(0)
	const [fetching, setFetching] = useState(true)
	const hasMoreRef = useRef(true)

	const fetchDiscount = () => {
		setIsLoading(true)
		getDiscount(type, currentPage)
			.then(data => {
				const items = data?.content ?? []
				hasMoreRef.current = !data?.last
				setDiscounts(prevState => [...prevState, ...items])
				setCurrentPage(prevState => prevState + 1)
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
			.finally(() => setFetching(false))
	}

	const reset = () => {
		setDiscounts([])
		setCurrentPage(0)
		hasMoreRef.current = true
		setFetching(true)
	}

	useEffect(() => {
		if (fetching) {
			fetchDiscount()
		}
	}, [fetching])

	const sentinelRef = useScrollPagination(
		() => setFetching(true),
		hasMoreRef.current
	)

	return {
		error: { isError: isError, errorMessage: errorMessage },
		isLoading,
		discounts,
		refetch: reset,
		sentinelRef,
	}
}

export default useGetDiscounts
