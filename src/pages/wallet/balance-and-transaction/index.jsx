import './styles.css'

import { useState } from 'react'

import { ActionSwitch, ErrorMessage } from '../../../shared/ui'
import { Balance, BottomSheetReplenish, Buttons, Transactions } from './ui'

import { useGetWallet } from '../../../features/user/model'
import { useGetTransactions } from '../../../features/transaction/model'
import { useBottomSheet, useRoles } from '../../../shared/hooks'

export default function BalanceAndTransaction() {
	const [isDevMode, setIsDevMode] = useState(false)
	const { isDeveloper } = useRoles()
	const telegramId = window.Telegram.WebApp.initDataUnsafe.user.id

	const bottomSheetState = useBottomSheet()
	const getWalletState = useGetWallet(telegramId)
	const chooseWallet = isDevMode ? getWalletState.wallet[1] : getWalletState.wallet[0]
	const getTransactionsState = useGetTransactions(chooseWallet?.id)
	console.log(chooseWallet?.id, getTransactionsState.transactions);

	return (
		<>
			<div className='container-balance-and-transaction'>
				<ErrorMessage
					errors={[getWalletState.error, getWalletState.error]}
				/>
				{isDeveloper() && (
					<ActionSwitch
						toggle={isDevMode}
						setToggle={setIsDevMode}
						text={{ left: 'Загальний', right: 'Dev' }}
					/>
				)}
				<Balance balance={isDevMode ? '1' : getWalletState.wallet[0]?.balance} />
				<Buttons isDevMode={isDevMode} bottomSheetState={bottomSheetState} />
				<Transactions getTransactionsState={getTransactionsState} isDevMode={isDevMode}/>
				<BottomSheetReplenish bottomSheetState={bottomSheetState} />
			</div>
		</>
	)
}
