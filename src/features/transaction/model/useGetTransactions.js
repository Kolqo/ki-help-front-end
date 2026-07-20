import { useState, useEffect, useRef } from 'react'
import { useErrorMessage, useScrollPagination } from '../../../shared/hooks'
import { getTransactions } from '../../../entities/transaction/api'

const useSelectedTasks = (walletId, isMoreTr) => {
	const [transactions, setTransactions] = useState([])
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(true)
	const [isError, setIsError] = useErrorMessage()
	const [currentPage, setCurrentPage] = useState(0)
	const [fetching, setFetching] = useState(true)
	const hasMoreRef = useRef(true)


	const reset = () => {
		setTransactions([])
		setCurrentPage(0)
		hasMoreRef.current = true
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

				const items = data?.content ?? []
				hasMoreRef.current = !data?.last

				setTransactions(prevState => {
					return currentPage === 0 ? items : [...prevState, ...items]
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
		isMoreTr && hasMoreRef.current
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
