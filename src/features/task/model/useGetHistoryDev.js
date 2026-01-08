import { useState, useEffect, useRef } from 'react'

import { useErrorMessage, useScrollPagination } from '../../../shared/hooks'
import { getHistoryDev } from '../../../entities/task/api'

const useGetHistoryDev = mode => {
	const [tasks, setTasks] = useState([])
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useErrorMessage()
	const [currentPage, setCurrentPage] = useState(0)
	const [fetching, setFetching] = useState(true)
	const isAnyDataRef = useRef(true)

	const reset = () => {
		setTasks([])
		setCurrentPage(0)
		isAnyDataRef.current = true
		setFetching(true)
	}

	useEffect(() => {
		reset()
	}, [mode])

	useEffect(() => {
		if (!fetching) return

		let isMounted = true 

		setIsLoading(true)

		getHistoryDev(currentPage, mode?.autoGenerate)
			.then(data => {
				if (!isMounted) return

				isAnyDataRef.current = !!data?.length

				setTasks(prevState => {
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
					'Не вдалося завантажити історію розробника. Спробуйте пізніше'
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
	}, [fetching, mode])

	const sentinelRef = useScrollPagination(
		() => setFetching(true),
		isAnyDataRef.current
	)

	return {
		error: { isError: isError, errorMessage: errorMessage },
		isLoading,
		tasks,
		refetch: reset,
		sentinelRef,
	}
}

export default useGetHistoryDev
