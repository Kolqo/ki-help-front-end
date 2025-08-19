import { useState, useEffect } from 'react'

const STORAGE_CURRENT_KEY = 'teacherCurrent'
const STORAGE_DRAFT_KEY = 'teacherDraft'

function useTeacherData(action, setAllValues, subjectId) {
	const DEFAULT_DATA = {
		id: '',
		name: '',
		subjectId: subjectId,
	}

	const [isActive, setIsActive] = useState(false)
	const [data, setData] = useState(() => {
		const draftStored = localStorage.getItem(STORAGE_DRAFT_KEY)
		const currentStored = localStorage.getItem(STORAGE_CURRENT_KEY)

		if (draftStored) {
			return JSON.parse(draftStored)
		}
		if (currentStored) {
			const stored = JSON.parse(currentStored)
			localStorage.setItem(STORAGE_DRAFT_KEY, JSON.stringify(stored))
			return stored
		}
		localStorage.setItem(STORAGE_DRAFT_KEY, JSON.stringify(DEFAULT_DATA))
		return DEFAULT_DATA
	})

	const updateData = updates => {
		setData(prev => {
			const updated = { ...prev, ...updates }
			localStorage.setItem(STORAGE_DRAFT_KEY, JSON.stringify(updated))
			return updated
		})
	}

	const handleOnChange = inputValues => {
		const updated = { ...data, name: inputValues[0] }
		updateData(updated)

		let isOriginal = false

		if (action === 'edit') {
			const draftValues = Object.values(updated)
			const currentValues = Object.values(
				JSON.parse(localStorage.getItem(STORAGE_CURRENT_KEY))
			)

			isOriginal = currentValues.every((value, index) => {
				if (index === 2) return true
				return value === draftValues[index]
			})
		}

		const { id, ...deconstructionData } = updated
		setIsActive(
			Object.values(deconstructionData).every(val => {
				return val != null && String(val).trim() !== ''
			}) && !isOriginal
		)
	}

	useEffect(() => {
		if (!setAllValues) return

		const draftStored = localStorage.getItem(STORAGE_DRAFT_KEY)
		if (draftStored) {
			const stored = JSON.parse(draftStored)
			setAllValues([stored.name])
		}
	}, [setAllValues])

	return {
		data,
		isActive,
		updateData,
		handleOnChange,
	}
}

export default useTeacherData
