import { useState, useEffect } from 'react'

const STORAGE_CURRENT_KEY = 'taskCurrent'
const STORAGE_DRAFT_KEY = 'taskDraft'

const compareValues = (val1, val2) => {
	// Якщо обидва null або undefined
	if (val1 == null && val2 == null) return true
	if (val1 == null || val2 == null) return false

	// Якщо це примітивні типи (string, number, boolean)
	if (typeof val1 !== 'object' || typeof val2 !== 'object') {
		return val1 === val2
	}

	// Якщо це масиви
	if (Array.isArray(val1) && Array.isArray(val2)) {
		// Порівнюємо довжину масивів
		if (val1.length !== val2.length) return false

		// Порівнюємо ВСІ елементи, а не тільки перший
		for (let i = 0; i < val1.length; i++) {
			if (!compareValues(val1[i], val2[i])) {
				return false
			}
		}
		return true
	}

	// Якщо один масив, другий ні
	if (Array.isArray(val1) || Array.isArray(val2)) return false

	// Якщо це об'єкти - порівнюємо ВСІ властивості
	const keys1 = Object.keys(val1)
	const keys2 = Object.keys(val2)

	// Порівнюємо кількість властивостей
	if (keys1.length !== keys2.length) return false

	// Порівнюємо всі ключі та їх значення
	for (const key of keys1) {
		if (!keys2.includes(key)) return false
		if (!compareValues(val1[key], val2[key])) return false
	}

	return true
}

// Функція для порівняння масивів Object.values()
const compareObjectValues = (draftValues, currentValues) => {
	if (draftValues.length !== currentValues.length) return false

	for (let i = 0; i < draftValues.length; i++) {
		if (!compareValues(draftValues[i], currentValues[i])) {
			return false
		}
	}

	return true
}

function useTaskData(action, setAllValues) {
	const teacher = JSON.parse(localStorage.getItem('choseTeacher'))

	const DEFAULT_DATA = {
		id: '',
		title: '',
		description: '',
		identifier: '',
		price: null,
		discount: null,
		visible: false,
		type: '',
		autoGenerate: false,
		createdAt: null,
		developer: null,
		teacher: teacher,
		document: null,
		arguments: null,
	}

	const [isActive, setIsActive] = useState(false)
	const [data, setData] = useState(() => {
		const draftStored = localStorage.getItem(STORAGE_DRAFT_KEY)
		const currentStored = localStorage.getItem(STORAGE_CURRENT_KEY)

		if (draftStored) return JSON.parse(draftStored)
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
		const updated = {
			...data,
			title: inputValues[0],
			description: inputValues[1],
			price: Number(inputValues[2]),
		}
		updateData(updated)

		let isOriginal = false

		if (action === 'edit') {
			const draftValues = Object.values(updated)
			const currentValues = Object.values(
				JSON.parse(localStorage.getItem(STORAGE_CURRENT_KEY))
			)

			isOriginal = compareObjectValues(draftValues, currentValues)

			console.log('🔍 Порівняння:', {
				isOriginal,
				draftLength: draftValues.length,
				currentLength: currentValues.length,
			})
		}

		const {
			id,
			discount,
			visible,
			autoGenerate,
			createdAt,
      identifier,
			document,
			...deconstructionData
		} = updated

		setIsActive(
			Object.values(deconstructionData).every(val => {
				return val != null && String(val).trim() !== '' && val !== 0
			}) && !isOriginal
		)
	}

	useEffect(() => {
		if (!setAllValues) return

		const draftStored = localStorage.getItem(STORAGE_DRAFT_KEY)
		if (draftStored) {
			const stored = JSON.parse(draftStored)
			setAllValues([
				stored.title,
				stored.description,
				stored.price,
			])
		}
	}, [setAllValues])

	useEffect(() => {
		if (data.type || data.developer || data.args) {
			handleOnChange([
				data.title,
				data.description,
				data.price,
			])
		}
	}, [data.type, data.developer, data.args, data.identifier, data.document, data.autoGenerate])

	return {
		data,
		isActive,
		updateData,
		handleOnChange,
	}
}

export default useTaskData
