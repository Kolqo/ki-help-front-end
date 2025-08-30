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
				const message =
					error.response?.data?.message ||
					error?.message ||
					'Не вдалося завантажити вчителей. Спробуйте пізніше'
				setErrorMessage(message)
				setIsError(true)
				setIsLoading(false)
			})
	}

	useEffect(() => {
		fetchTeacher()
	}, [])

	return {
		error: { isError: isError, errorMessage: errorMessage },
		isLoading,
		selectedTeachers,
		refetch: fetchTeacher,
	}
}

export default useSelectedTeachers
