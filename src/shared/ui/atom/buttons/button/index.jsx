import './styles.css'

export default function Button(props) {
	return (
		<>
			<button
				className={`${props.className || ''} class-button no-select`}
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
