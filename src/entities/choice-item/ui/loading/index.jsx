import './styles.css'

export default function LoadingChoiceItem(props) {
	return (
		<>
			<div className={`style-loading-ui ${props.className || ''}`}>
				<div className='loading-ui'>
					<div className='loading-ui-box1' />
					<div className='loading-ui-box2' />
				</div>
				<div className='loading-ui'>
					<div className='loading-ui-box1' />
					<div className='loading-ui-box2' />
				</div>
				<div className='loading-ui'>
					<div className='loading-ui-box1' />
					<div className='loading-ui-box2' />
				</div>
			</div>
		</>
	)
}
