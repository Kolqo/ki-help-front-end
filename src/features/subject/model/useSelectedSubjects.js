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
	const isAnyDataRef = useRef(true)

	const fetchSubject = () => {
		setIsLoading(true)
		getSubject(toggleId, currentPage)
			.then(data => {
				isAnyDataRef.current = !!data?.length
				setSelectedSubjects(prevState => [...prevState, ...data])
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
		isAnyDataRef.current = true
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


	useScrollPagination(() => setFetching(true), isAnyDataRef.current)

	return {
		error: { isError: isError, errorMessage: errorMessage },
		isLoading,
		selectedSubjects,
		refetch: reset,
	}
}

export default useSelectedSubjects
