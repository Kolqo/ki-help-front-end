import './styles.css'

export default function ButtonItem(props) {
	return (
		<button
			className={`style-button-item no-focus-and-active no-select no-underline ${
				props.className || ''
			}`}
			onClick={props.onClick}
		>
			{props.leftData}
			<div className='bottom-border'>
				<div className='center-data'>
					<p className='header-text'>{props.centerData?.header}</p>
					<p className='footer-text'>{props.centerData?.footer}</p>
				</div>
				<div className='right-data'>{props.rightData}</div>
			</div>
		</button>
	)
}
