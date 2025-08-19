import { useCallback } from 'react'

const useDeleteHandler = (deleteFn, refetchFn, options = {}) => {
	const { onSuccess, onError } = options

	const handleDelete = useCallback(
		async id => {
			try {
				await deleteFn(id)
				if (refetchFn) refetchFn()
				if (onSuccess) onSuccess()
			} catch (error) {
				if (onError) onError(error)
				throw error
			}
		},
		[deleteFn, refetchFn, onSuccess, onError]
	)

	return handleDelete
}

export default useDeleteHandler