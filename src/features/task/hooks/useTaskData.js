import { useState, useEffect } from 'react'

const STORAGE_CURRENT_KEY = 'taskCurrent'
const STORAGE_DRAFT_KEY = 'taskDraft'

// Виправлена функція для порівняння значень
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
    // ⚠️ ВИПРАВЛЕННЯ: Спочатку порівнюємо довжину масивів
    if (val1.length !== val2.length) return false
    
    // Якщо обидва пусті
    if (val1.length === 0) return true
    
    // Порівнюємо перші елементи тільки якщо довжина однакова
    return compareValues(val1[0], val2[0])
  }
  
  // Якщо один масив, другий ні
  if (Array.isArray(val1) || Array.isArray(val2)) return false
  
  // Якщо це об'єкти - порівнюємо тільки першу властивість
  const keys1 = Object.keys(val1)
  const keys2 = Object.keys(val2)
  
  if (keys1.length === 0 && keys2.length === 0) return true
  if (keys1.length === 0 || keys2.length === 0) return false
  
  const firstKey1 = keys1[0]
  const firstKey2 = keys2[0]
  
  // Якщо перші ключі різні
  if (firstKey1 !== firstKey2) return false
  
  // Порівнюємо значення першого ключа
  return compareValues(val1[firstKey1], val2[firstKey2])
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
			identifier: inputValues[3],
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
				stored.identifier,
			])
		}
	}, [setAllValues])

	useEffect(() => {
		if (data.type || data.developer || data.args) {
			handleOnChange([
				data.title,
				data.description,
				data.price,
				data.identifier,
			])
		}
	}, [data.type, data.developer, data.args])

	return {
		data,
		isActive,
		updateData,
		handleOnChange,
	}
}

export default useTaskData
