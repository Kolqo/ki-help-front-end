import { useState, useEffect, useRef } from 'react'
import { useErrorMessage, useScrollPagination } from '../../../shared/hooks'
import { getTransactions } from '../../../entities/transaction/api'

const useSelectedTasks = (walletId, isMoreTr) => {
	const [transactions, setTransactions] = useState([])
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useErrorMessage()
	const [currentPage, setCurrentPage] = useState(0)
	const [fetching, setFetching] = useState(true)
	const isAnyDataRef = useRef(true)


	const reset = () => {
		setTransactions([])
		setCurrentPage(0)
		isAnyDataRef.current = true
		setFetching(true)
	}

	useEffect(() => {
		reset()
	}, [walletId, isMoreTr])

	useEffect(() => {
		if (!fetching || !walletId) return

		let isMounted = true 

		setIsLoading(true)

		getTransactions(walletId, currentPage)
			.then(data => {
				if (!isMounted) return

				isAnyDataRef.current = !!data?.length

				setTransactions(prevState => {
					return currentPage === 0 ? data : [...prevState, ...data]
				})

				setCurrentPage(prevState => prevState + 1)
				setIsError(false)
			})
			.catch(error => {
				if (!isMounted) return

				const message =
					error.response?.data?.message ||
					error?.message ||
					'Не вдалося завантажити транзакції. Спробуйте пізніше'
				setErrorMessage(message)
				setIsError(true)
			})
			.finally(() => {
				if (isMounted) {
					setIsLoading(false)
					setFetching(false)
				}
			})

		return () => {
			isMounted = false
		}
	}, [fetching, walletId])

	const sentinelRef = useScrollPagination(
		() => setFetching(true),
		isMoreTr && isAnyDataRef.current
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
