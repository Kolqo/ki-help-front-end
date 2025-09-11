import { useState, useEffect } from 'react'

const useCheckboxState = (
	items,
	savedState,
	isRadio = false,
	config = 'default'
) => {
	const [checkedState, setCheckedState] = useState({})
	const [itemsMap, setItemsMap] = useState({})
	const [selectionOrder, setSelectionOrder] = useState([])

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
			const id = idConfigs[config](item)
			const isChecked =
				savedState && Array.isArray(savedState)
					? savedState.some(saved => idConfigs[config](saved) === id)
					: false
			acc[id] = isChecked
			return acc
		}, {})

		setCheckedState(initialChecked)

		// відновлюємо порядок, якщо є savedState
		if (savedState && Array.isArray(savedState)) {
			setSelectionOrder(savedState.map(saved => idConfigs[config](saved)))
		}
	}, [items])

	const changeCheckedState = id => {
		setCheckedState(prev => {
			if (isRadio) {
				const newState = Object.keys(prev).reduce((acc, key) => {
					acc[key] = key === id ? !prev[id] : false
					return acc
				}, {})

				setSelectionOrder(newState[id] ? [id] : [])
				return newState
			} else {
				const newState = {
					...prev,
					[id]: !prev[id],
				}

				setSelectionOrder(prevOrder => {
					if (!newState[id]) {
						// якщо зняли галочку — видаляємо з порядку
						return prevOrder.filter(itemId => itemId !== id)
					} else {
						// якщо поставили — додаємо в кінець
						return [...prevOrder, id]
					}
				})

				return newState
			}
		})
	}

	const selectedItems = selectionOrder.map(id => itemsMap[id])

	return {
		checkedState,
		itemsMap,
		selectionOrder,
		selectedItems,
		setCheckedState,
		changeCheckedState,
	}
}

export default useCheckboxState
