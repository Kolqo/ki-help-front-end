import { useRef, useState, useEffect } from 'react'

const useShowPopup = () => {
	const [item, setItem] = useState(null)
	const [position, setPosition] = useState(null)
	const menuRef = useRef(null)
	const timeoutRef = useRef(null)

  console.log(item?.banned)

	const handleContextMenu = (e, item) => {
		e.preventDefault()
		setPosition({ x: e.clientX, y: e.clientY })
		setItem(item)
	}

	const handleTouchStart = (e, item) => {
		const touch = e.touches[0]
		timeoutRef.current = setTimeout(() => {
			setPosition({ x: touch.clientX, y: touch.clientY })
			setItem(item)
		}, 600)
	}

	const handleTouchEnd = () => {
		clearTimeout(timeoutRef.current)
	}

  const handleLeftClick = (e, item = null) => {
		if (e.button === 0) {
			setPosition({ x: e.clientX, y: e.clientY })
			setItem(item)
		}
	}

	const close = () => {
		setPosition(null)
	}

	useEffect(() => {
		const handleClickOutside = event => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				close()
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	const bindTarget = (item = null) => ({
		onContextMenu: e => handleContextMenu(e, item),
		onTouchStart: e => handleTouchStart(e, item),
		onTouchEnd: handleTouchEnd,
	})

	return {
		position,
		menuRef,
		item,
		bindTarget,
		close,
		handleLeftClick,
	}
}

export default useShowPopup
