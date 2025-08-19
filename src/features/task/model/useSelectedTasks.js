import { useState, useEffect, useRef } from 'react'

import { useErrorMessage, useScrollPagination } from '../../../shared/hooks'
import { getTask } from '../../../entities/task/api'

const useSelectedTasks = teacher => {
	const [selectedTasks, setSelectedTasks] = useState([])
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState()
	const [isError, setIsError] = useErrorMessage()
	const [currentPage, setCurrentPage] = useState(0)
	const [fetching, setFetching] = useState(true)
	const isAnyDataRef = useRef(true)

	const fetchTask = () => {
		if (teacher) {
			setIsLoading(true)
			getTask(teacher.id, currentPage)
				.then(data => {
					isAnyDataRef.current = !!data?.length
					setSelectedTasks(prevState => [...prevState, ...data])
					setCurrentPage(prevState => prevState + 1)
					setIsError(false)
					setIsLoading(false)
				})
				.finally(() => setFetching(false))
				.catch(error => {
					setIsError(true)
					setErrorMessage(error.response.data.message)
					setIsLoading(false)
				})
		}
	}

	const reset = () => {
		setSelectedTasks([])
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
		selectedTasks,
		refetch: reset,
	}
}

export default useSelectedTasks
