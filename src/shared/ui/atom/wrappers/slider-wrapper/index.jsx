import { useRef, useState } from 'react'
import './styles.css'

export default function SliderWrapper({scrollPower = 1, ...props}) {
	const sliderRef = useRef(null)
	const [isDown, setIsDown] = useState(false)
	const [startX, setStartX] = useState(0)
	const [scrollLeft, setScrollLeft] = useState(0)

	const handleMouseDown = event => {
		setIsDown(true)
		setStartX(event.pageX - sliderRef.current.offsetLeft)
		setScrollLeft(sliderRef.current.scrollLeft)
	}

	const handleMouseLeaveOrUp = () => {
		setIsDown(false)
	}

	const handleMouseMove = event => {
		if (!isDown) return
		event.preventDefault()

		const x = event.pageX - sliderRef.current.offsetLeft
		const walk = (x - startX) * scrollPower

		sliderRef.current.scrollLeft = scrollLeft - walk
	}

	return (
		<div
			className={`slider-wrapper ${props.className || ''}`}
			ref={sliderRef}
			onMouseDown={handleMouseDown}
			onMouseLeave={handleMouseLeaveOrUp}
			onMouseUp={handleMouseLeaveOrUp}
			onMouseMove={handleMouseMove}
		>
			{props.children}
		</div>
	)
}
