import { useState, useEffect, useRef } from 'react'

import { useErrorMessage, useScrollPagination } from '../../../shared/hooks'

import { getIdentifiers } from '../../../entities/identifier/api'

const useSelectedIdentifiers = () => {
	const [selectedIdentifiers, setSelectedIdentifiers] = useState([])
	const [errorMessage, setErrorMessage] = useState('')
	const [isError, setIsError] = useErrorMessage()
	const [isLoading, setIsLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(0)
	const [fetching, setFetching] = useState(true)
	const isAnyDataRef = useRef(true)

	const fetchFiles = () => {
		setIsLoading(true)
		getIdentifiers(currentPage)
			.then(data => {
				isAnyDataRef.current = !!data?.length
				setSelectedIdentifiers(prevState => [...prevState, ...data])
				setCurrentPage(prevState => prevState + 1)
				setIsError(false)
				setIsLoading(false)
			})
			.finally(() => setFetching(false))
			.catch(error => {
				console.log(error)
				setIsError(true)
				setErrorMessage(error.response.data.message)
				setIsLoading(false)
			})
	}

	const reset = () => {
		setSelectedIdentifiers([])
		setCurrentPage(0)
		isAnyDataRef.current = true
		setFetching(true)
	}

	useEffect(() => {
		if (fetching) {
			fetchFiles()
		}
	}, [fetching])

	useScrollPagination(() => setFetching(true), isAnyDataRef.current)

	return {
		error: { isError: isError, errorMessage: errorMessage },
		isLoading,
		selectedIdentifiers,
		refetch: reset,
	}
}

export default useSelectedIdentifiers
