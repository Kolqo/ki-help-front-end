import { useState, useEffect } from 'react'

import { useErrorMessage } from '../../../shared/hooks'

import { getTransactionsWithdraw } from '../../../entities/transaction/api'

const useGetTransactionsWithdraw = () => {
	const [transactions, setTransactions] = useState([])
	const [errorMessage, setErrorMessage] = useState('')
	const [isError, setIsError] = useErrorMessage()
	const [isLoading, setIsLoading] = useState(false)

	const fetchTransaction = () => {
		setIsLoading(true)
		getTransactionsWithdraw()
			.then(data => {
				setTransactions(data)
				setIsError(false)
				setIsLoading(false)
			})
			.catch(error => {
				setIsError(true)
				setErrorMessage(error.response.data.message)
				setIsLoading(false)
			})
	}

	useEffect(() => {
		fetchTransaction()
	}, [])

	return {
		error: { isError: isError, errorMessage: errorMessage },
		isLoading,
		transactions,
		refetch: fetchTransaction,
	}
}

export default useGetTransactionsWithdraw
