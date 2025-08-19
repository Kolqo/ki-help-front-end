import './styles.css'

export default function ListItem(props) {
	return (
		<div
			className='style-list-item no-select'
			{...(typeof props.bindTarget === 'function'
				? props.bindTarget(props.listItem)
				: {})}
		>
			{props.leftData}
			<div className='bottom-border'>
				<div className='center-data'>
					<div className='header-text'>{props.centerData?.header}</div>
					<div className='footer-text'>{props.centerData?.footer}</div>
				</div>
				{props.rightData}
			</div>
		</div>
	)
}
