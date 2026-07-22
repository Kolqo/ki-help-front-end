import { useState } from 'react'

import { useErrorMessage } from '../../../shared/hooks'
import { patchMaintenanceStatus } from '../../../entities/maintenance/api'

const usePatchMaintenanceStatus = () => {
	const [isError, setIsError] = useErrorMessage()
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handlePatch = async (enabled, message, onSuccess) => {
		try {
			setIsLoading(true)
			const data = await patchMaintenanceStatus(enabled, message)
			setIsError(false)
			setIsLoading(false)
			if (onSuccess) onSuccess(data)
			return data
		} catch (error) {
			const errMessage =
				error.response?.data?.message ||
				error?.message ||
				'Не вдалося оновити статус технічних робіт'
			setErrorMessage(errMessage)
			setIsError(true)
			setIsLoading(false)
		}
	}

	return {
		error: { isError: isError, errorMessage: errorMessage },
		isLoading,
		handlePatch,
	}
}

export default usePatchMaintenanceStatus
