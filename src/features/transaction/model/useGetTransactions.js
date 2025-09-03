import { useState, useEffect, useRef } from 'react'

import { useErrorMessage, useScrollPagination } from '../../../shared/hooks'
import { getTransactions } from '../../../entities/transaction/api'

const useSelectedTasks = (walletId, isMoreTr) => {
	const [transactions, setTransactions] = useState([])
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState()
	const [isError, setIsError] = useErrorMessage()
	const [currentPage, setCurrentPage] = useState(0)
	const [fetching, setFetching] = useState(true)
	const isAnyDataRef = useRef(true)

	const fetchTransaction = () => {
		if (!walletId) return

		setIsLoading(true)
		getTransactions(walletId, currentPage)
			.then(data => {
				isAnyDataRef.current = !!data?.length
				setTransactions(prevState => [...prevState, ...data])
				setCurrentPage(prevState => prevState + 1)
				setIsError(false)
				setIsLoading(false)
			})
			.catch(error => {
				const message =
					error.response?.data?.message ||
					error?.message ||
					'Не вдалося завантажити транзакції. Спробуйте пізніше'
				setErrorMessage(message)
				setIsError(true)
				setIsLoading(false)
			})
			.finally(() => setFetching(false))
	}

	const reset = () => {
		setTransactions([])
		setCurrentPage(0)
		isAnyDataRef.current = true
		setFetching(true)
	}

	useEffect(() => {
		if (fetching && walletId) {
			fetchTransaction()
		}
	}, [fetching, walletId])

	useEffect(() => {
		reset()
	}, [walletId, isMoreTr])

	const sentinelRef = useScrollPagination(
		() => setFetching(true),
		isAnyDataRef.current
	)

	return {
		error: { isError: isError, errorMessage: errorMessage },
		isLoading,
		transactions,
		refetch: reset,
		sentinelRef,
	}
}

export default useSelectedTasks
