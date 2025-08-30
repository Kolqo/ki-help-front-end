import './styles.css'

import { useNavigate } from 'react-router-dom'

import { TopIconButton } from '../../../../../shared/ui'

import { Replenish, Statistics, Wallet } from '../../assets'

export default function Buttons(props) {
  const navigate = useNavigate()

	if (props.isDevMode) {
		return (
			<>
				<div className='style-buttons'>
					<TopIconButton
						className='button gray-button'
						leftIcon={<Wallet />}
						onClick={() => {navigate('/wallet/payments'),
							localStorage.setItem(
								'userWallet',
								JSON.stringify(props.chooseWallet)
							)}}
					>
						Виплати
					</TopIconButton>
					{/*<TopIconButton
						className='button gray-button'
						leftIcon={<Statistics />}
					>
						Статистика
					</TopIconButton>*/}
				</div>
			</>
		)
	}

	return (
		<>
			<div className='style-buttons'>
				{/*<TopIconButton
					className='button gray-button'
					leftIcon={<Wallet />}
					onClick={() => {navigate('/wallet/payments'),
						localStorage.setItem(
							'userWallet',
							JSON.stringify(props.chooseWallet)
						)}}
				>
					Виплати
				</TopIconButton>*/}
				<TopIconButton
					className='button gray-button'
					leftIcon={<Replenish />}
					onClick={() => props.bottomSheetState.openSheet()}
				>
					Поповнити
				</TopIconButton>
			</div>
		</>
	)
}
