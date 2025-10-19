import './styles.css'

export default function Price() {
	return (
		<>
			<div className='style-price-fixed'>
				<div className='price'>
					<p>
						Ціна за одне питання {'2'} STARS - {+(2 * 0.84).toFixed(3)} UAH
					</p>
				</div>
			</div>
		</>
	)
}
