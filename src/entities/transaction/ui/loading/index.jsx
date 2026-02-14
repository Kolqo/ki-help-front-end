import "./styles.css";

export default function LoadingTransaction(props) {
  return (
		<>
			{Array.from({ length: props.count }).map((_, index) => (
				<div key={index} className='transaction-color-box'>
          <div className="icon"/>
					<div className='data'>
						<div className='center-data'>
							<div className='header-text'>{props.centerData?.header}</div>
							<div className='footer-text'>{props.centerData?.footer}</div>
						</div>
						<div className="right-data">
							<div className='header-text'>{props.centerData?.header}</div>
							<div className='footer-text'>{props.centerData?.footer}</div>
						</div>
					</div>
				</div>
			))}
		</>
	)
}
