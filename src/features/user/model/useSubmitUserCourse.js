import { useState } from 'react'

import { useErrorMessage } from '../../../shared/hooks'

import { patchUserCourse } from '../../../entities/user/api'

const useSubmitUserCourse = () => {
	const [isError, setIsError] = useErrorMessage()
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handlePatch = (choseCourse, setUserCourse) => {
		try {
			setIsLoading(true)
			patchUserCourse(choseCourse)
      setUserCourse(choseCourse)
			setIsLoading(false)
		} catch (error) {
			setErrorMessage(error.response.data.message)
			setIsError(true)
		}
	}

	return {
		error: { isError: isError, errorMessage: errorMessage },
		isLoading,
		handlePatch,
	}
}

export default useSubmitUserCourse
