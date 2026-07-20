import { useState, useEffect, useRef } from 'react'

import { useErrorMessage, useScrollPagination } from '../../../shared/hooks'
import { getUserHistoryTask } from '../../../entities/task/api'

const useSelectedUserHistoryTasks = (telegramId, mode) => {
	const [selectedUserHistoryTasks, setSelectedUserHistoryTasks] = useState([])
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState()
	const [isError, setIsError] = useErrorMessage()
	const [currentPage, setCurrentPage] = useState(0)
	const [fetching, setFetching] = useState(true)
	const hasMoreRef = useRef(true)

	const fetchTask = () => {
		setIsLoading(true)
		getUserHistoryTask(telegramId, currentPage, mode.type)
			.then(data => {
				const items = data?.content ?? []
				hasMoreRef.current = !data?.last
				setSelectedUserHistoryTasks(prevState => [...prevState, ...items])
				setCurrentPage(prevState => prevState + 1)
				setIsError(false)
				setIsLoading(false)
			})
			.catch(error => {
				const message =
					error.response?.data?.message ||
					error?.message ||
					'Не вдалося завантажити історія купівель. Спробуйте пізніше'
				setErrorMessage(message)
				setIsError(true)
				setIsLoading(false)
			})
			.finally(() => setFetching(false))
	}

	const reset = () => {
		setSelectedUserHistoryTasks([])
		setCurrentPage(0)
		hasMoreRef.current = true
		setFetching(true)
	}

	useEffect(() => {
		if (fetching) {
			fetchTask()
		}
	}, [fetching])

	const sentinelRef = useScrollPagination(
		() => setFetching(true),
		hasMoreRef.current
	)

	return {
		error: { isError: isError, errorMessage: errorMessage },
		isLoading,
		selectedUserHistoryTasks,
		refetch: reset,
		sentinelRef,
	}
}

export default useSelectedUserHistoryTasks
