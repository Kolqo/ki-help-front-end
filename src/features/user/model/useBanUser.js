import { useState } from 'react'

import { useErrorMessage } from '../../../shared/hooks'

import { patchBanUser } from '../../../entities/user/api'

const useBanUser = () => {
	const [isError, setIsError] = useErrorMessage()
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handlePatch = async (user) => {
		try {
			setIsLoading(true)
			await patchBanUser(user)
			setIsLoading(false)
		} catch (error) {
			const message =
				error.response?.data?.message ||
				error?.message ||
				'Помилка при зміні стану "Заблоковано"'
			setErrorMessage(message)
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

export default useBanUser
