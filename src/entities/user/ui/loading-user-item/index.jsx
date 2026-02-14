import "./styles.css";

export default function LoadingTransaction(props) {
  return (
		<>
			{Array.from({ length: props.count }).map((_, index) => (
				<div key={index} className='user-loading-item'>
					<div className='icon' />
					<div className='data'>
						<div className='center-data'>
							<div className='header-text'/>
							<div className='footer-text'/>
						</div>
						<div className='right-data'>
							<div className='checkbox'/>
						</div>
					</div>
				</div>
			))}
		</>
	)
}
