import { useState } from 'react'

const useBottomSheet = (resetItem = () => {}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [isVisible, setIsVisible] = useState(false)

	const openSheet = () => {
		setIsVisible(true)
		requestAnimationFrame(() => setIsOpen(true))
	}

	const closeSheet = () => {
		setIsOpen(false)
		setTimeout(() => (setIsVisible(false), resetItem(null)), 250)
	}

	return { isOpen, isVisible, openSheet, closeSheet }
}

export default useBottomSheet
