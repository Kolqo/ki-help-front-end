import './styles.css'

export default function Button(props) {
	return (
		<>
			<button
				className={`class-button no-select ${props.className || ''}`}
				disabled={props.disabled}
				style={props.style}
				onClick={props.onClick}
			>
				{props.leftIcon}
				{props.children}
				{props.rightIcon}
			</button>
		</>
	)
}
