import './styles.css'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { DeletePopup, ErrorMessage, TopIconButton } from '../../../../../shared/ui'

import { Replenish, Statistics, Wallet } from '../../assets'


export default function Buttons(props) {
	const navigate = useNavigate()

  const [isClicked, setIsClicked] = useState(false);
  const [isDeletePopup, setIsDeletePopup] = useState(false)

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
								navigate('/wallet/payments'),
									localStorage.setItem(
										'userWallet',
										JSON.stringify(props.chooseWallet)
									)
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
				{isDeletePopup && (
					<DeletePopup
						textInfo={
							'Якщо ви купуєте старси через Google Pay або Apple Pay на телефоні, платіжні системи цих сервісів утримують близько 20% комісії. Використуйте ПК чи ноутбук для уникнення комісії'
						}
						onClickCancel={() => setIsDeletePopup(false)}
						onClickConfirm={() => {
							setIsDeletePopup(false)
							props.bottomSheetState.openSheet()
						}}
					/>
				)}
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
					onClick={() => {
						if (props.isMobile) {
              setIsDeletePopup(true)
            } else {
              props.bottomSheetState.openSheet()
            }
					}}
				>
					Поповнити
				</TopIconButton>
			</div>
		</>
	)
}
