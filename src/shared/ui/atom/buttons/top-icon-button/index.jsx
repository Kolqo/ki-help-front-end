import './styles.css'

export default function TopIconButton(props) {
	return (
		<>
			<button
				className={`class-top-icon-button no-select ${props.className || ''}`}
				style={props.style}
				onClick={props.onClick}
			>
				<div className='left-icon'>{props.leftIcon}</div>
				{props.children}
			</button>
		</>
	)
}
