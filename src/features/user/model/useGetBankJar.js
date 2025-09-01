import { useState, useEffect } from 'react'

import { useErrorMessage } from '../../../shared/hooks'
import { getBankJar } from '../../../entities/user/api'

const useGetBankJar = () => {
	const [errorMessage, setErrorMessage] = useState('')
	const [isError, setIsError] = useErrorMessage()
	const [isLoading, setIsLoading] = useState(false)

	const fetchGet = async amount => {
		setIsLoading(true)
		try {
			const data = await getBankJar(amount)
			return data.link
		} catch (error) {
			const message =
				error.response?.data?.message ||
				error?.message ||
				'Не вдалося завантажити гаманець. Спробуйте пізніше'
			setErrorMessage(message)
			setIsError(true)
			throw error
		} finally {
			setIsLoading(false)
		}
	}

	return {
		error: { isError: isError, errorMessage: errorMessage },
		isLoading,
		fetchGet,
	}
}

export default useGetBankJar
