import { useState } from 'react'

const useBottomSheet = (setFile = () => {}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [isVisible, setIsVisible] = useState(false)

	const openSheet = () => {
		setIsVisible(true)
		requestAnimationFrame(() => setIsOpen(true))
	}

	const closeSheet = () => {
		setIsOpen(false)
		setTimeout(() => (setIsVisible(false), setFile(null)), 250)
	}

	return { isOpen, isVisible, openSheet, closeSheet }
}

export default useBottomSheet
