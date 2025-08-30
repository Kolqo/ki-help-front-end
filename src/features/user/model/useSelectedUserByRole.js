import { useState, useEffect } from 'react'

import { useErrorMessage } from '../../../shared/hooks'
import { getUserByRole } from '../../../entities/user/api'

const useSelectedUserByRole = userRole => {
	const [selectedUserByRole, setSelectedUserByRole] = useState([])
	const [errorMessage, setErrorMessage] = useState('')
	const [isError, setIsError] = useErrorMessage()
	const [isLoading, setIsLoading] = useState(false)

	const fetchUserByRole = () => {
		setIsLoading(true)
		getUserByRole(userRole)
			.then(data => {
				setSelectedUserByRole(data)
				setIsLoading(false)
			})
			.catch(error => {
				const message =
					error.response?.data?.message ||
					error?.message ||
					'Не вдалося завантажити користувачів. Спробуйте пізніше'
				setErrorMessage(message)
				setIsError(true)
				setIsLoading(false)
			})
	}

	useEffect(() => {
		fetchUserByRole()
	}, [])

	return {
		error: { isError: isError, errorMessage: errorMessage },
		isLoading,
		selectedUserByRole,
	}
}

export default useSelectedUserByRole
