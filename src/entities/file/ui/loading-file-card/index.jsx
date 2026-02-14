import "./styles.css";

export default function LoadingFileCard(props) {
	const fileCards = Array.from({ length: props.count }, (_, index) => (
		<div key={index} className='loading-file-cards'>
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
			{fileCards}
		</>
	)
}