import { useState, useEffect } from 'react'

import { useErrorMessage } from '../../../shared/hooks'

import { getArguments } from '../../../entities/choice-item/api'

const useSelectedArguments = () => {
	const [selectedArguments, setSelectedArguments] = useState([])
	const [errorMessage, setErrorMessage] = useState('')
	const [isError, setIsError] = useErrorMessage()
	const [isLoading, setIsLoading] = useState(false)

	const fetchArgument = () => {
		setIsLoading(true)
		getArguments()
			.then(data => {
				setSelectedArguments(data)
				setIsError(false)
				setIsLoading(false)
			})
			.catch(error => {
				setIsError(true)
				setErrorMessage(error.response.data.message)
				setIsLoading(false)
			})
	}

	useEffect(() => {
		fetchArgument()
	}, [])

	return {
		error: { isError: isError, errorMessage: errorMessage },
		isLoading,
		selectedArguments,
		refetch: fetchArgument,
	}
}

export default useSelectedArguments
