import { useState, useEffect, useRef } from 'react'

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

	// важливо: Хук завжди існує → порядок не порушується
	const initializedFromSaved = useRef(false)

	const idConfigs = {
		default: item => item.id,
		developer: item => item.telegramId,
	}

	//----------------------------------------------------------------
	// 1) Коли приходять items → оновлюємо itemsMap та allItemsMap
	//----------------------------------------------------------------
	useEffect(() => {
		if (!Array.isArray(items)) return

		const newMap = {}
		for (const item of items) {
			if (!item) continue
			const id = idConfigs[config](item)
			if (!id) continue
			newMap[id] = item
		}

		setItemsMap(newMap)

		setAllItemsMap(prev => {
			const merged = { ...prev }
			for (const [id, value] of Object.entries(newMap)) {
				merged[id] = value
			}
			return merged
		})
	}, [items, config])

	//----------------------------------------------------------------
	// 2) Один раз ініціалізуємо checkedState від savedState
	//----------------------------------------------------------------
	useEffect(() => {
		if (!Array.isArray(savedState)) return
		if (initializedFromSaved.current) return

		const initialChecked = {}
		const order = []

		for (const item of savedState) {
			if (!item) continue
			const id = idConfigs[config](item)
			if (!id) continue
			initialChecked[id] = true
			order.push(id)
		}

		setCheckedState(initialChecked)
		setSelectionOrder(order)

		setAllItemsMap(prev => {
			const merged = { ...prev }
			for (const item of savedState) {
				const id = idConfigs[config](item)
				if (id) merged[id] = item
			}
			return merged
		})

		initializedFromSaved.current = true
	}, [savedState, config])

	//----------------------------------------------------------------
	// 3) Клік по елементу
	//----------------------------------------------------------------
	const changeCheckedState = id => {
		setCheckedState(prev => {
			if (isRadio) {
				const newState = {}
				for (const key of Object.keys(prev)) newState[key] = false
				newState[id] = true
				setSelectionOrder([id])
				return newState
			}

			const newState = { ...prev, [id]: !prev[id] }

			setSelectionOrder(prevOrder => {
				if (!newState[id]) {
					return prevOrder.filter(x => x !== id)
				} else if (!prevOrder.includes(id)) {
					return [...prevOrder, id]
				}
				return prevOrder
			})

			return newState
		})
	}

	//----------------------------------------------------------------
	// 4) Обчислення selectedItems
	//----------------------------------------------------------------
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
