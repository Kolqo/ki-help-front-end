import { useState, useEffect } from 'react'

import { useErrorMessage } from '../../../shared/hooks'
import { getMaintenanceStatus } from '../../../entities/maintenance/api'

const useGetMaintenanceStatus = () => {
	const [enabled, setEnabled] = useState(false)
	const [message, setMessage] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [isError, setIsError] = useErrorMessage()
	const [isLoading, setIsLoading] = useState(true)

	const fetchGet = () => {
		setIsLoading(true)
		getMaintenanceStatus()
			.then(data => {
				setEnabled(!!data?.enabled)
				setMessage(data?.message || '')
				setIsError(false)
				setIsLoading(false)
			})
			.catch(error => {
				const message =
					error.response?.data?.message ||
					error?.message ||
					'Не вдалося завантажити статус технічних робіт. Спробуйте пізніше'
				setErrorMessage(message)
				setIsError(true)
				setIsLoading(false)
			})
	}

	useEffect(() => {
		fetchGet()
	}, [])

	return {
		error: { isError: isError, errorMessage: errorMessage },
		isLoading,
		enabled,
		message,
		refetch: fetchGet,
	}
}

export default useGetMaintenanceStatus
