import "./styles.css";

export default function LoadingIdentifierCard(props) {
	const fileCards = Array.from({ length: props.count }, (_, index) => (
		<div key={index} className='loading-identifier-cards'>
			<div className='identifier-card-header'>
				<div className='identifier-card-header-left'>
					<div className='identifier-card-header-left-box1' />
					<div className='identifier-card-header-left-box2' />
				</div>
			</div>
			<div className='identifier-card-bottom'>
				<div className='identifier-card-bottom-box' />
			</div>
		</div>
	))

	return (
		<div className={`style-loading-identifier-card ${props.className || ''}`}>
			{fileCards}
		</div>
	)
}