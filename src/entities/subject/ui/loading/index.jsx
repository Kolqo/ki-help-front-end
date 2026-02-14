import "./styles.css";

export default function LoadingSubject(props) {
  return (
		<div className='style-loading-subjects'>
			{Array.from({ length: props.count }).map((_, index) => (
				<div key={index} className='subject-color-box'>
					<div className='left-text' />
					<div className='right-icon' />
				</div>
			))}
		</div>
	)
}
