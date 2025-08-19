import './styles.css'

export default function PropertyItem(props) {
	return (
		<>
			<div
				className={`class-property-item ${props.className || ''}`}
				onContextMenu={props.menuState?.handleContextMenu}
				onTouchStart={props.menuState?.handleTouchStart}
				onTouchEnd={props.menuState?.handleTouchEnd}
				onTouchMove={props.menuState?.handleTouchMove}
				onClick={props.onClick}
			>
				<p>{props.propertyItem.propertyName}</p>
				{props.propertyItem.content ? (
					props.propertyItem.rightComponent
				) : (
					<div className='right-component'>
						{props.propertyItem.rightComponent}
					</div>
				)}
			</div>
		</>
	)
}
