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
				const message =
					error.response?.data?.message ||
					error?.message ||
					'Не вдалося завантажити аргументи. Спробуйте пізніше'
				setErrorMessage(message)
				setIsError(true)
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
