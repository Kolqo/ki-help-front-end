import './styles.css'

export default function PropertyItem(props) {
	return (
		<>
			<div
				className={`class-property-item ${props.className || ''}`}
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
