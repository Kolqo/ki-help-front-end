import { useState, useEffect } from 'react'

import { useErrorMessage } from '../../../shared/hooks'

import { getTeachers } from '../../../entities/choice-item/api'

const useSelectedTeachers = subjectID => {
	const [selectedTeachers, setSelectedTeachers] = useState([])
	const [errorMessage, setErrorMessage] = useState('')
	const [isError, setIsError] = useErrorMessage()
	const [isLoading, setIsLoading] = useState(false)

	const fetchTeacher = () => {
		setIsLoading(true)
		getTeachers(subjectID)
			.then(data => {
				setSelectedTeachers(data)
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
		fetchTeacher()
	}, [])

	return {
		error: { isError: isError, errorMessage: errorMessage },
		errorMessage,
		isLoading,
		selectedTeachers,
		refetch: fetchTeacher,
	}
}

export default useSelectedTeachers
