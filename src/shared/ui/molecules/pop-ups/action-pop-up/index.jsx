import './styles.css'

import { forwardRef } from 'react'

const ActionPopup = forwardRef((props, ref) => {
	const popupWidth = 175
	const popupHeight = props.items.length * 33
	const windowWidth = window.innerWidth
	const windowHeight = window.innerHeight

	const rightBoundary = windowWidth - popupWidth - 10
	const bottomBoundary = windowHeight - popupHeight - 10

	const adjustedX =
		props.position.x > rightBoundary
			? props.position.x - popupWidth
			: props.position.x

	const adjustedY =
		props.position.y > bottomBoundary
			? props.position.y - popupHeight
			: props.position.y

	const adjustedPosition = {
		x: adjustedX,
		y: adjustedY,
	}

	return (
		<div
			ref={ref}
			style={{ top: adjustedPosition.y, left: adjustedPosition.x }}
			className='style-action-popup'
			onClick={props.onClick}
		>
			{props.items.map((item, index) => (
				<div className='item no-select' key={index} onClick={item.onClick}>
					{item.text}
				</div>
			))}
		</div>
	)
})

export default ActionPopup
