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
	const isAnyDataRef = useRef(true)

	const fetchFiles = () => {
		setIsLoading(true)
		getFiles(currentPage)
			.then(data => {
				isAnyDataRef.current = !!data?.length
				setSelectedFiles(data)
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

	const reset = () => {
		setSelectedFiles([])
		setCurrentPage(0)
		isAnyDataRef.current = true
		setFetching(true)
	}

	useEffect(() => {
		if (fetching) {
			fetchFiles()
		}
	}, [fetching])

	//useScrollPagination(() => setFetching(true), isAnyDataRef.current)

	return {
		error: { isError: isError, errorMessage: errorMessage },
		isLoading,
		selectedFiles,
		refetch: reset,
	}
}

export default useSelectedFiles
