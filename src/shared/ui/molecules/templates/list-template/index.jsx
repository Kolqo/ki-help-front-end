import './styles.css'

export default function ListTemplate(props) {
	return (
		<div
			className={`style-list-item no-select ${
				(props.className && props.className) || '0'
			}`}
			{...(typeof props.bindTarget === 'function'
				? props.bindTarget(props.listItem)
				: {})}
      onClick={props.onClick}
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
