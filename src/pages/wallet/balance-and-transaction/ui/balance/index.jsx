import './styles.css'

import Loading from '../../../../../shared/ui/atom/loading'

function HeaderText(props) {
  if (props.getWalletState?.isLoading || !props.getWalletState.wallet?.length) {
    return (
			<div className='header-loading'>
				<Loading size={20} />
				<p className='header'>Оновлення балансу</p>
			</div>
		)
  }

  return (
    <p className='header'>Загальний баланс</p>
  )
}

export default function Balance(props) {
	const [integer, fractional] = String(props.balance).split(/[\.,]/)

	const balance = {
		integer,
		fractional: fractional || '00'
	}

	return (
		<>
			<div className='style-balance'>
				<HeaderText getWalletState={props.getWalletState} />
				<p className='amount'>
					<div>
						<span className='integer'>{balance.integer}</span>
						<span className='fractional'>.{balance.fractional}</span>
					</div>
					<span className='currency'>UAH</span>
				</p>
			</div>
		</>
	)
}
