import './styles.css'

export default function Balance(props) {
	const [integer, fractional] = String(props.balance).split(/[\.,]/)

	const balance = {
		integer,
		fractional: fractional || '00'
	}

	return (
		<>
			<div className='style-balance'>
				<p className='header'>Загальний баланс</p>
				<p>
					<span className='sign'>₴</span>
					<span className='integer'>{balance.integer}</span>
					<span className='fractional'>.{balance.fractional}</span>
				</p>
			</div>
		</>
	)
}
