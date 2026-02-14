import './styles.css'

export default function LoadingTask(props) {
	const tasks = Array.from({ length: props.count }, (_, index) => (
		<div key={index} className='loading-user'>
			<div className='icon' />
			<div className='info-row'>
				<div className='line-5' />
				<div className='line-4' />
			</div>
			<div className='info-row'>
				<div className='line-3' />
				<div className='line-6' />
			</div>
			<div className='info-row'>
				<div className='line-4' />
				<div className='line-3' />
			</div>
			<div className='info-row'>
				<div className='line-2' />
				<div className='line-5' />
			</div>
			<div className='buttons'>
				<div className='button' />
				<div className='button' />
				<div className='button' />
			</div>
		</div>
	))

	return <>{tasks}</>
}
