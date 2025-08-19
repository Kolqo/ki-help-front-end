import { useState, useEffect } from 'react'

const useErrorMessage = () => {
	const [isError, setIsError] = useState(false)

	useEffect(() => {
		if (isError) {
			const timer = setTimeout(() => {
				setIsError(false)
			}, 5000) // 5 секунд

			return () => clearTimeout(timer)
		}
	}, [isError])

	return [isError, setIsError]
}

export default useErrorMessage
