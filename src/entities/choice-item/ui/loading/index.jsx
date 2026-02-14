import './styles.css'

export default function LoadingChoiceItem(props) {
	return (
		<>
			{Array.from({ length: props.count }).map((_, index) => (
				<div key={index} className={`choice-item-loading ${props.className || ''}`}>
					<div className='checkbox' />
					<div className='text-box'>
						<div className='text' />
					</div>
				</div>
			))}
		</>
	)
}
