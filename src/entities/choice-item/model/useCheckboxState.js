import { useState, useEffect } from 'react'

const useCheckboxState = (
	items = [],
	savedState,
	isRadio = false,
	config = 'default'
) => {
	const [checkedState, setCheckedState] = useState({})
	const [itemsMap, setItemsMap] = useState({})
	const [allItemsMap, setAllItemsMap] = useState({})
	const [selectionOrder, setSelectionOrder] = useState([])

	const idConfigs = {
		default: item => item.id,
		developer: item => item.telegramId,
	}

	// ⚡ 1) оновлюємо itemsMap та allItemsMap, але НЕ чіпаємо checkedState
	useEffect(() => {
		if (!items || !Array.isArray(items)) {
			setItemsMap({})
			return
		}

		const newItemsMap = {}
		items.forEach(item => {
			if (!item) return
			const id = idConfigs[config](item)
			if (!id) return
			newItemsMap[id] = item
		})
		setItemsMap(newItemsMap)

		// накопичуємо всі елементи, які колись бачили
		setAllItemsMap(prev => {
			const merged = { ...prev }
			items.forEach(item => {
				if (!item) return
				const id = idConfigs[config](item)
				if (!id) return
				merged[id] = item
			})
			return merged
		})
	}, [items, config])

	// ⚡ 2) ініціалізуємо стан з savedState (початково вибрані)
	useEffect(() => {
		if (!savedState || !Array.isArray(savedState)) return

		setAllItemsMap(prev => {
			const merged = { ...prev }
			savedState.forEach(item => {
				if (!item) return
				const id = idConfigs[config](item)
				if (!id) return
				merged[id] = item
			})
			return merged
		})

		setCheckedState(prev => {
			const newState = { ...prev }
			savedState.forEach(item => {
				if (!item) return
				const id = idConfigs[config](item)
				if (!id) return
				newState[id] = true
			})
			return newState
		})

		setSelectionOrder(prev => {
			const initialIds = savedState
				.map(item => idConfigs[config](item))
				.filter(Boolean)

			// уникаємо дублів, зберігаємо порядок
			const rest = prev.filter(id => !initialIds.includes(id))
			return [...initialIds, ...rest]
		})
	}, [savedState, config])

	const changeCheckedState = id => {
		if (!id) return

		setCheckedState(prev => {
			if (isRadio) {
				const currentlyChecked = !!prev[id]
				const newState = {}

				// всі в false
				Object.keys(prev).forEach(key => {
					newState[key] = false
				})

				// перемикаємо тільки один
				newState[id] = !currentlyChecked

				setSelectionOrder(newState[id] ? [id] : [])
				return newState
			}

			// multi-select
			const newState = {
				...prev,
				[id]: !prev[id],
			}

			setSelectionOrder(prevOrder => {
				if (!newState[id]) {
					// зняли галочку — прибираємо з порядку
					return prevOrder.filter(x => x !== id)
				} else {
					// поставили — додаємо в кінець
					if (prevOrder.includes(id)) return prevOrder
					return [...prevOrder, id]
				}
			})

			return newState
		})
	}

	// 🔥 ТЕПЕР selectedItems НЕ ЗАЛЕЖИТЬ ВІД ПОТОЧНОГО СПИСКУ items
	const selectedItems = selectionOrder
		.map(id => allItemsMap[id])
		.filter(Boolean)

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
