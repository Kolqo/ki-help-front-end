import { useCallback } from 'react'

const useDeleteHandler = (deleteFn, refetchFns = [], options = {}) => {
	const { onSuccess, onError } = options

	const handleDelete = useCallback(
		async id => {
			try {
				await deleteFn(id)

				if (Array.isArray(refetchFns)) {
					await Promise.all(refetchFns.map(fn => fn && fn()))
				} else if (refetchFns) {
					await refetchFns()
				}

				if (onSuccess) onSuccess()
			} catch (error) {
				if (onError) onError(error)
				throw error
			}
		},
		[deleteFn, refetchFns, onSuccess, onError]
	)

	return handleDelete
}

export default useDeleteHandler
