import { useState, useEffect, useRef } from 'react'

import { useErrorMessage, useScrollPagination } from '../../../shared/hooks'
import { getHistoryDev } from '../../../entities/task/api'

const useGetHistoryDev = () => {
	const [tasks, setTasks] = useState([])
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useErrorMessage()
	const [currentPage, setCurrentPage] = useState(0)
	const [fetching, setFetching] = useState(true)
	const isAnyDataRef = useRef(true)

	const fetchTask = () => {
		setIsLoading(true)
		getHistoryDev(currentPage)
			.then(data => {
				isAnyDataRef.current = !!data?.length
				setTasks(prevState => [...prevState, ...data])
				setCurrentPage(prevState => prevState + 1)
				setIsError(false)
				setIsLoading(false)
			})
			.catch(error => {
				setIsError(true)
				setErrorMessage(error.response.data.message)
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

	useScrollPagination(() => setFetching(true), isAnyDataRef.current)

	return {
		error: { isError: isError, errorMessage: errorMessage },
		isLoading,
		tasks,
		refetch: reset,
	}
}

export default useGetHistoryDev
