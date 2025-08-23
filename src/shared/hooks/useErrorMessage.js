import { useState, useEffect } from 'react'

const useErrorMessage = () => {
	const [isError, setIsError] = useState(false)

	useEffect(() => {
		if (isError) {
			const timer = setTimeout(() => {
				setIsError(false)
			}, 10000) // 10 секунд

			return () => clearTimeout(timer)
		}
	}, [isError])

	return [isError, setIsError]
}

export default useErrorMessage
