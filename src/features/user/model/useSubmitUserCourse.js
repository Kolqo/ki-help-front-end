import { useState } from 'react'

import { useErrorMessage } from '../../../shared/hooks'

import { patchUserCourse } from '../../../entities/user/api'

const useSubmitUserCourse = () => {
	const [isError, setIsError] = useErrorMessage()
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handlePatch = async (choseCourse, setUserCourse) => {
		try {
			setIsLoading(true)
			await patchUserCourse(choseCourse)
      setUserCourse(choseCourse)
			setIsLoading(false)
		} catch (error) {
			const message =
				error.response?.data?.message ||
				error?.message ||
				'Помилка при надсилання повідомлення'
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

export default useSubmitUserCourse
