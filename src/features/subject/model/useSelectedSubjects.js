import { useState, useEffect, useRef } from 'react'

import { useErrorMessage, useScrollPagination } from '../../../shared/hooks'

import { getSubject } from '../../../entities/subject/api'

const useSelectedSubjects = toggleId => {
	const [selectedSubjects, setSelectedSubjects] = useState([])
	const [errorMessage, setErrorMessage] = useState('')
	const [isError, setIsError] = useErrorMessage()
	const [isLoading, setIsLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(0)
	const [fetching, setFetching] = useState(true)
	const hasMoreRef = useRef(true)

	const fetchSubject = () => {
		setIsLoading(true)
		getSubject(toggleId, currentPage)
			.then(data => {
				const items = data?.content ?? []
				hasMoreRef.current = !data?.last
				setSelectedSubjects(prevState => [...prevState, ...items])
				setCurrentPage(prevState => prevState + 1)
				setIsError(false)
				setIsLoading(false)
			})
			.catch(error => {
				const message =
					error.response?.data?.message ||
					error?.message ||
					'Не вдалося завантажити предмети. Спробуйте пізніше'
				setErrorMessage(message)
				setIsError(true)
				setIsLoading(false)
			})
			.finally(() => setFetching(false))
	}

	const reset = () => {
		setSelectedSubjects([])
		setCurrentPage(0)
		hasMoreRef.current = true
		setFetching(true)
	}

	useEffect(() => {
		if (fetching) {
			fetchSubject()
		}
	}, [fetching])

	useEffect(() => {
		reset()
	}, [toggleId])

	const sentinelRef = useScrollPagination(
		() => setFetching(true),
		hasMoreRef.current
	)

	return {
		error: { isError: isError, errorMessage: errorMessage },
		isLoading,
		selectedSubjects,
		refetch: reset,
		sentinelRef,
	}
}

export default useSelectedSubjects
