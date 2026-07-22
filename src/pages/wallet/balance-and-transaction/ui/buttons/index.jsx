import './styles.css'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ErrorMessage, TopIconButton } from '../../../../../shared/ui'

import { Replenish, Statistics, Wallet } from '../../assets'


export default function Buttons(props) {
	const navigate = useNavigate()

  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
		if (isClicked && props.isMobile) {
			const timer = setTimeout(() => setIsClicked(false), 5000)
			return () => clearTimeout(timer)
		}
	}, [isClicked])

	if (props.isDevMode) {
		return (
			<>
				<div className='style-buttons'>
					{!props.telegramId && (
						<TopIconButton
							className='button gray-button'
							leftIcon={<Wallet />}
							onClick={() => {
								navigate('/wallet/payments')
							}}
						>
							Виплати
						</TopIconButton>
					)}
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
