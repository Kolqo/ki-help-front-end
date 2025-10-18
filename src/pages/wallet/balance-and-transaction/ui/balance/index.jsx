import './styles.css'

import { Stars } from '../../assets'

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
				<p className='amount'>
					<Stars/>
					<div>
						<span className='integer'>{balance.integer}</span>
						<span className='fractional'>.{balance.fractional}</span>
					</div>
				</p>
			</div>
		</>
	)
}
