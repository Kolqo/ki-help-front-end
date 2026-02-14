import "./styles.css";

export default function LoadingChoose(props) {
  return (
		<>
			{Array.from({ length: props.count }).map((_, index) => (
				<div key={index} className='choose-loading'>
					<div className="box">
						<div className='left-text' />
						<div className='right-icon' />
					</div>
				</div>
			))}
		</>
	)
}
