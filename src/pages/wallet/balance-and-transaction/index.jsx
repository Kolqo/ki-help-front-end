import './styles.css'

import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { ActionSwitch, ErrorMessage } from '../../../shared/ui'
import { Balance, BottomSheetReplenish, Buttons, Transactions } from './ui'

import { useGetWallet } from '../../../features/user/model'
import { useGetTransactions } from '../../../features/transaction/model'
import { useBottomSheet, useGoBack, useRoles } from '../../../shared/hooks'

export default function BalanceAndTransaction() {
	const { telegramId } = useParams()
	useGoBack(telegramId && '/settings/admin-panel/profile')
	const [isDevMode, setIsDevMode] = useState(false)
	const [isMoreTr, setIsMoreTr] = useState(false)
	const { isDeveloper } = useRoles()

  localStorage.removeItem('userWallet')

	const initUserTgId = telegramId
		? telegramId
		: window.Telegram.WebApp.initDataUnsafe.user.id

	const bottomSheetState = useBottomSheet()
	const getWalletState = useGetWallet(initUserTgId)

	const chooseWallet = isDevMode
		? getWalletState.wallet[1]
		: getWalletState.wallet[0]

	const getTransactionsState = useGetTransactions(chooseWallet?.id, isMoreTr)
	console.log(chooseWallet?.id, getTransactionsState.transactions)

	return (
		<>
			<div className='container-balance-and-transaction'>
				<ErrorMessage errors={[getWalletState.error, getWalletState.error]} />
				{isDeveloper() && (
					<ActionSwitch
						toggle={isDevMode}
						setToggle={setIsDevMode}
						text={{ left: 'Загальний', right: 'Dev' }}
					/>
				)}
				<Balance balance={chooseWallet?.balance || 0} />
				{!telegramId && (
					<Buttons
						isDevMode={isDevMode}
						bottomSheetState={bottomSheetState}
						chooseWallet={chooseWallet}
					/>
				)}
				<Transactions
					getTransactionsState={getTransactionsState}
					isDevMode={isDevMode}
					setIsMoreTr={setIsMoreTr}
					isMoreTr={isMoreTr}
				/>
				<BottomSheetReplenish bottomSheetState={bottomSheetState} />
			</div>
		</>
	)
}
