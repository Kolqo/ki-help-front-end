import './styles.css'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { ActionSwitch, ErrorMessage, ScrollTopButton } from '../../../shared/ui'
import { Balance, BottomSheetReplenish, Buttons, Transactions } from './ui'

import { useGetWallet } from '../../../features/user/model'
import { useGetTransactions } from '../../../features/transaction/model'
import { useBottomSheet, useGoBack, useRoles } from '../../../shared/hooks'
import { Loading } from '../../task'

export default function BalanceAndTransaction() {
	const { telegramId } = useParams()
	useGoBack(telegramId && '/settings/admin-panel/profile')
	const [isDevMode, setIsDevMode] = useState(false)
	const [isMoreTr, setIsMoreTr] = useState(false)
	const { isDeveloper } = useRoles()

	const initUserTgId = telegramId
		? telegramId
		: window.Telegram.WebApp.initDataUnsafe.user.id

	const bottomSheetState = useBottomSheet()
	const getWalletState = useGetWallet(initUserTgId)

	const userAgent = navigator.userAgent
	const isMobile =
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			userAgent,
		)

  let chooseWallet
	if ((getWalletState.isLoading || !getWalletState.wallet?.length) && localStorage.getItem('userWallet')) {
		chooseWallet = JSON.parse(localStorage.getItem('userWallet')).find(
			wallet => wallet.walletType === (isDevMode ? 'DEVELOPER' : 'DEFAULT'),
		)
	} else {
    chooseWallet = getWalletState.wallet.find(
			wallet => wallet.walletType === (isDevMode ? 'DEVELOPER' : 'DEFAULT'),
		)
  }

	const getTransactionsState = useGetTransactions(chooseWallet?.id, isMoreTr)

	return (
		<>
			<div className='container-balance-and-transaction'>
				<ErrorMessage errors={[getWalletState.error, getWalletState.error]} />
				<ScrollTopButton />
				{isDeveloper() && (
					<ActionSwitch
						toggle={isDevMode}
						setToggle={setIsDevMode}
						setIsMoreTr={setIsMoreTr}
						text={{ left: 'Загальний', right: 'Dev' }}
					/>
				)}
				<Balance
					balance={chooseWallet?.balance || 0}
					getWalletState={getWalletState}
				/>
				<Buttons
					isDevMode={isDevMode}
					bottomSheetState={bottomSheetState}
					chooseWallet={chooseWallet}
					telegramId={telegramId}
					isMobile={isMobile}
				/>
				<Transactions
					getTransactionsState={getTransactionsState}
					isDevMode={isDevMode}
					setIsMoreTr={setIsMoreTr}
					isMoreTr={isMoreTr}
				/>
				<BottomSheetReplenish
					bottomSheetState={bottomSheetState}
					chooseWallet={chooseWallet}
					telegramId={telegramId}
					getWalletState={getWalletState}
				/>
			</div>
		</>
	)
}
