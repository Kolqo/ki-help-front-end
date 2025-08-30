import './styles.css'
import { ArrowIcon } from '../../../../assets/svg'
import { useEffect, useState } from 'react'

export default function Button({
	containerRef = '.container',
	mode = 'top',
	right = 25,
	bottom = 120,
}) {
	const [scrollTop, setScrollTop] = useState(0)
	const [scrollHeight, setScrollHeight] = useState(0)
	const [clientHeight, setClientHeight] = useState(0)

	useEffect(() => {
		const containerElement = document.querySelector(containerRef)
		if (!containerElement) return

		const updateScroll = () => {
			setScrollTop(containerElement.scrollTop)
			setScrollHeight(containerElement.scrollHeight)
			setClientHeight(containerElement.clientHeight)
		}

		updateScroll()
		containerElement.addEventListener('scroll', updateScroll)
		return () => containerElement.removeEventListener('scroll', updateScroll)
	}, [containerRef])

	// умови відображення кнопки
	if (mode === 'top' && scrollTop < 150) return null
	if (mode === 'bottom' && scrollTop + clientHeight >= scrollHeight - 150)
		return null

	const handleClick = () => {
		const container = document.querySelector(containerRef)
		if (!container) return

		if (mode === 'top') {
			container.scrollTo({ top: 0, behavior: 'smooth' })
		} else {
			container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' })
		}
	}

	return (
		<button
			className={`style-scroll-button ${mode}`}
			onClick={handleClick}
			style={{ right: `${right}px`, bottom: `${bottom}px` }}
		>
			<ArrowIcon height={19} width={12} />
		</button>
	)
}
