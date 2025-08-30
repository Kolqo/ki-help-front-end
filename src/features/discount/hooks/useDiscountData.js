import { useState, useEffect } from 'react'

const STORAGE_CURRENT_KEY = 'discountCurrent'
const STORAGE_DRAFT_KEY = 'discountDraft'

function useDiscountData(onlyOneTime, action, setAllValues) {
	const tasks = JSON.parse(localStorage.getItem('choseTasks'))

	const DEFAULT_DATA = {
		discountId: '',
		value: 0,
		tasks: tasks || [],
		users: null,
		activationLimits: 0,
		validFrom: new Date().toISOString(),
		validTo: new Date().toISOString(),
		isLimit: false,
		isValidation: false,
		isActivation: false,
	}

	const [isActive, setIsActive] = useState(false)
	const [data, setData] = useState(() => {
		const draftStored = localStorage.getItem(STORAGE_DRAFT_KEY)
		let currentStored = localStorage.getItem(STORAGE_CURRENT_KEY)
		console.log('before', currentStored)
		if (currentStored && onlyOneTime) {
      currentStored = JSON.parse(currentStored)
			currentStored = {
				discountId: currentStored.id,
				value: currentStored.value,
				tasks: currentStored.task ? [currentStored.task] : [],
				users: currentStored.user ? [currentStored.user] : [],
				activationLimits: currentStored.activationLimits,
				validFrom: currentStored.validFrom || '',
				validTo: currentStored.validTo || '',
				isLimit: !!currentStored.activationLimits,
				isValidation: !!(currentStored.validFrom || currentStored.validTo),
				isActivation: !!currentStored.user,
			}
			console.log('after', currentStored)
      localStorage.setItem(STORAGE_CURRENT_KEY, JSON.stringify(currentStored))
		}

		if (draftStored) return JSON.parse(draftStored)
		if (currentStored) {
			localStorage.setItem(STORAGE_DRAFT_KEY, JSON.stringify(currentStored))
			return currentStored
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
			value: Number(inputValues[0]),
			activationLimits: data.isLimit ? Number(inputValues[1]) : 0,
			users: data.isActivation ? data.users : [],
			validFrom: data.isValidation ? data.validFrom : '',
			validTo: data.isValidation ? data.validTo : '',
		}

		updateData(updated)

		let isOriginal = false

		if (action === 'edit') {
			const current = JSON.parse(localStorage.getItem(STORAGE_CURRENT_KEY))

			const keysToCompare = [
				'discountId',
				'value',
				'activationLimits',
				'validFrom',
				'validTo',
				'isLimit',
				'isValidation',
				'isActivation',
			]

			isOriginal = keysToCompare.every(key => {
				const draftVal = updated[key]
				const currentVal = current[key]

				if (key === 'validFrom' || key === 'validTo') {
					return new Date(draftVal).getTime() === new Date(currentVal).getTime()
				}
				return draftVal === currentVal
			})
		}

		const { tasks, discountId, ...rest } = updated
		let deconstructionData = { ...rest }

		if (!updated.isLimit) {
			delete deconstructionData.activationLimits
		}
		if (!updated.isActivation) {
			delete deconstructionData.users
		}
		if (!updated.isValidation) {
			delete deconstructionData.validFrom
			delete deconstructionData.validTo
		}

		setIsActive(
			Object.values(deconstructionData).every(
				val => val != null && String(val).trim() !== '' && val !== 0
			) && !isOriginal
		)
	}

	useEffect(() => {
		if (!setAllValues) return
		const draftStored = localStorage.getItem(STORAGE_DRAFT_KEY)
		if (draftStored) {
			const stored = JSON.parse(draftStored)
			setAllValues([stored.value, stored.activationLimits])
		}
	}, [setAllValues])

	useEffect(() => {
		handleOnChange([data.value, data.activationLimits])
	}, [
		data.validFrom,
		data.validTo,
		data.isActivation,
		data.isValidation,
		data.isLimit,
	])

	return {
		data,
		isActive,
		updateData,
		handleOnChange,
	}
}

export default useDiscountData
