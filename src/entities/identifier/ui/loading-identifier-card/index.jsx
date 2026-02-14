import "./styles.css";

export default function LoadingIdentifierCard(props) {
	const identifierCard = Array.from({ length: props.count }, (_, index) => (
		<div key={index} className='loading-identifier-card'>
			<div className='header'>
				<div className='name' />
				<div className='id' />
			</div>
			<div className='bottom'>
				<div className='time' />
			</div>
		</div>
	))

	return (
		<>
			{identifierCard}
		</>
	)
}