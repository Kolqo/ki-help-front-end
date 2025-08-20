import './styles.css'

export default function ActionSwitch(props) {
	return (
		<button
			className='style-action-switch'
			onClick={() => props.setToggle(prev => !prev)}
		>
			<div className={`option ${!props.toggle && 'active'}`}>{props.text.left}</div>
			<div className={`option ${props.toggle && 'active'}`}>{props.text.right}</div>
		</button>
	)
}
