import './styles.css'

export default function LoadingTask(props) {
	const tasks = Array.from({ length: props.count }, (_, index) => (
		<div key={index} className='loading-users'>
			<div className='circle'></div>

			{Array.from({ length: 4 }, (_, i) => (
				<div key={i} className='single-row'>
					<div className='color-box'></div>
				</div>
			))}

			<div className='three-columns'>
				{Array.from({ length: 3 }, (_, j) => (
					<div key={j} className='color-box'></div>
				))}
			</div>
		</div>
	))

	return (
		<div className={`style-loading-user ${props.className || ''}`}>{tasks}</div>
	)
}
