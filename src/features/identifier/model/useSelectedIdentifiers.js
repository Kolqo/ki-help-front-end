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
	const hasMoreRef = useRef(true)

	const fetchFiles = () => {
		setIsLoading(true)
		getIdentifiers(currentPage)
			.then(data => {
				const items = data?.content ?? []
				hasMoreRef.current = !data?.last
				setSelectedIdentifiers(prevState => [...prevState, ...items])
				setCurrentPage(prevState => prevState + 1)
				setIsError(false)
				setIsLoading(false)
			})
			.finally(() => setFetching(false))
			.catch(error => {
				const message =
					error.response?.data?.message ||
					error?.message ||
					'Не вдалося завантажити ідентифікатори. Спробуйте пізніше'
				setErrorMessage(message)
				setIsError(true)
				setIsLoading(false)
			})
	}

	const reset = () => {
		setSelectedIdentifiers([])
		setCurrentPage(0)
		hasMoreRef.current = true
		setFetching(true)
	}

	useEffect(() => {
		if (fetching) {
			fetchFiles()
		}
	}, [fetching])

	const sentinelRef = useScrollPagination(
		() => setFetching(true),
		hasMoreRef.current
	)

	return {
		error: { isError: isError, errorMessage: errorMessage },
		isLoading,
		selectedIdentifiers,
		refetch: reset,
		sentinelRef,
	}
}

export default useSelectedIdentifiers
