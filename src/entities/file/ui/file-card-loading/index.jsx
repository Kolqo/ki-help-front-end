import "./styles.css";

export default function FileCardLoading(props) {
	const fileCards = Array.from({ length: props.count }, (_, index) => (
		<div key={index} className='loading-file-cards'>
			<div className='file-card-header'>
				<div className='file-card-header-left'>
					<div className='file-card-header-left-box1' />
					<div className='file-card-header-left-box2' />
				</div>
			</div>
			<div className='file-card-bottom'>
				<div className='file-card-bottom-box' />
			</div>
		</div>
	))

	return (
		<div className={`style-loading-file-card ${props.className || ''}`}>
			{fileCards}
		</div>
	)
}