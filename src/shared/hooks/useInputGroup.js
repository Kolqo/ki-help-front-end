import { useCallback } from 'react'

const useInputGroup = (inputRefs, fieldsLength) => {
	const handleKeyDown = useCallback(
		(event, currentIndex) => {
			if (event.key === 'Enter') {
				event.preventDefault()

				const nextIndex = currentIndex + 1
				if (nextIndex < fieldsLength && inputRefs.current[nextIndex]) {
					inputRefs.current[nextIndex].focus()
				} else {
					event.target.blur()
				}
			}
		},
		[fieldsLength, inputRefs]
	)

	const getAllValues = useCallback(() => {
		return inputRefs.current.map(input => input?.value || '')
	}, [inputRefs])

	const setAllValues = useCallback(
		values => {
			inputRefs.current.forEach((input, index) => {
				if (input && values[index] !== undefined) {
					input.value = values[index]
				}
			})
		},
		[inputRefs]
	)

	const getValue = useCallback(
		index => {
			return inputRefs.current[index]?.value || ''
		},
		[inputRefs]
	)

	const setValue = useCallback(
		(index, value) => {
			if (inputRefs.current[index]) {
				inputRefs.current[index].value = value
			}
		},
		[inputRefs]
	)

	const clearAll = useCallback(() => {
		inputRefs.current.forEach(input => {
			if (input) {
				input.value = ''
			}
		})
	}, [inputRefs])

	return {
		handleKeyDown,
		getAllValues,
		setAllValues,
		getValue,
		setValue,
		clearAll,
	}
}

export default useInputGroup
