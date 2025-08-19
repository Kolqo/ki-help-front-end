import './styles.css'

export default function LoadingTask(props) {
	return (
		<>
			<div
				className={`style-loading-transaction-admin ${props.className || ''}`}
			>
				<div className='color-box' />
				<div className='color-box' />
				<div className='color-box' />
				<div className='color-box' />
				<div className='color-box' />
			</div>
		</>
	)
}
