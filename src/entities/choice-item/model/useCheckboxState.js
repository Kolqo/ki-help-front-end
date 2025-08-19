import { useState, useEffect } from 'react'

const useCheckboxState = (items, savedState, isRadio = false, config='default') => {
	const [checkedState, setCheckedState] = useState({})
	const [itemsMap, setItemsMap] = useState({})

  const idConfigs = {
		default: item => item.id,
		developer: item => item.telegramId,
	}

	useEffect(() => {
		const newItemsMap = items.reduce((acc, item) => {
			acc[idConfigs[config](item)] = item
			return acc
		}, {})
		setItemsMap(newItemsMap)

		const initialChecked = items.reduce((acc, item) => {
			acc[idConfigs[config](item)] =
				savedState && Array.isArray(savedState)
					? savedState.some(saved => idConfigs[config](saved) === idConfigs[config](item))
					: false
			return acc
		}, {})
		setCheckedState(initialChecked)
	}, [items])

	const changeCheckedState = id => {
		setCheckedState(prev => {
			if (isRadio) {
				const newState = Object.keys(prev).reduce((acc, key) => {
					acc[key] = key === id ? !prev[id] : false
					return acc
				}, {})
				return newState
			} else {
				return {
					...prev,
					[id]: !prev[id],
				}
			}
		})
	}

	return {
		checkedState,
		itemsMap,
		setCheckedState,
		changeCheckedState,
	}
}

export default useCheckboxState
