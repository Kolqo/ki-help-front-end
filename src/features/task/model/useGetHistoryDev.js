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

	const fetchTask = () => {
		setIsLoading(true)
		getHistoryDev(currentPage, mode?.autoGenerate)
			.then(data => {
				isAnyDataRef.current = !!data?.length
				setTasks(prevState => [...prevState, ...data])
				setCurrentPage(prevState => prevState + 1)
				setIsError(false)
				setIsLoading(false)
			})
			.catch(error => {
				const message =
					error.response?.data?.message ||
					error?.message ||
					'Не вдалося завантажити історію розробника. Спробуйте пізніше'
				setErrorMessage(message)
				setIsError(true)
				setIsLoading(false)
			})
			.finally(() => setFetching(false))
	}

	const reset = () => {
		setTasks([])
		setCurrentPage(0)
		isAnyDataRef.current = true
		setFetching(true)
	}

	useEffect(() => {
		if (fetching) {
			fetchTask()
		}
	}, [fetching])

  useEffect(() => {
    reset()
  },[mode])

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
