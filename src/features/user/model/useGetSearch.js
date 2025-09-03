import { useState, useEffect, useRef } from 'react'

import {
	useErrorMessage,
	useScrollPagination,
} from '../../../shared/hooks/index.js'

import { getSearch } from '../../../entities/user/api/index.js'

const useGetSearch = username => {
	const [users, setUsers] = useState([])
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState()
	const [isError, setIsError] = useErrorMessage()
	const [currentPage, setCurrentPage] = useState(0)
	const [fetching, setFetching] = useState(true)
	const isAnyDataRef = useRef(true)

	const fetchUser = () => {
		setIsLoading(true)
		getSearch(username, currentPage, 2)
			.then(data => {
				isAnyDataRef.current = !!data?.length
				setUsers(prevState => [...prevState, ...data])
				setCurrentPage(prevState => prevState + 1)
				setIsError(false)
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
			.finally(() => setFetching(false))
	}

	const reset = () => {
		setUsers([])
		setCurrentPage(0)
		isAnyDataRef.current = true
		setFetching(true)
	}

	useEffect(() => {
		if (fetching) {
			fetchUser()
		}
	}, [fetching])

	useEffect(() => {
		reset()
	}, [username])

	const sentinelRef = useScrollPagination(
		() => setFetching(true),
		isAnyDataRef.current,
	)

	return {
		error: { isError: isError, errorMessage: errorMessage },
		isLoading,
		users,
		refetch: reset,
		sentinelRef,
	}
}

export default useGetSearch
