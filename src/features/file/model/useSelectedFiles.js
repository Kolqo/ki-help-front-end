import { useState, useEffect, useRef } from 'react'

import { useErrorMessage, useScrollPagination } from '../../../shared/hooks'

import { getFiles } from '../../../entities/file/api'

const useSelectedFiles = () => {
	const [selectedFiles, setSelectedFiles] = useState([])
	const [errorMessage, setErrorMessage] = useState('')
	const [isError, setIsError] = useErrorMessage()
	const [isLoading, setIsLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(0)
	const [fetching, setFetching] = useState(true)
	const hasMoreRef = useRef(true)

	const fetchFiles = () => {
		setIsLoading(true)
		getFiles(currentPage)
			.then(data => {
				const items = data?.content ?? []
				hasMoreRef.current = !data?.last
				setSelectedFiles(prevState => [...prevState, ...items])
				setCurrentPage(prevState => prevState + 1)
				setIsError(false)
				setIsLoading(false)
			})
			.finally(() => setFetching(false))
			.catch(error => {
				const message =
					error.response?.data?.message ||
					error?.message ||
					'Не вдалося завантажити файли. Спробуйте пізніше'
				setErrorMessage(message)
				setIsError(true)
				setIsLoading(false)
			})
	}

	const reset = () => {
		setSelectedFiles([])
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
		selectedFiles,
		refetch: reset,
		sentinelRef,
	}
}

export default useSelectedFiles
