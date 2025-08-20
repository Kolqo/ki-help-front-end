import './styles.css'

import { useState } from 'react'

import { ActionSwitch } from '../../../shared/ui'
import { Balance, BottomSheetReplenish, Buttons, Transactions } from './ui'
import { useBottomSheet, useRoles } from '../../../shared/hooks'

export default function BalanceAndTransaction() {
	const [isDevMode, setIsDevMode] = useState(false)
	const { isDeveloper } = useRoles()

	const bottomSheetState = useBottomSheet()

	return (
		<>
			<div className='container-balance-and-transaction'>
				{isDeveloper() && (
					<ActionSwitch
						toggle={isDevMode}
						setToggle={setIsDevMode}
						text={{ left: 'Загальний', right: 'Dev' }}
					/>
				)}
				<Balance balance='426.43' />
				<Buttons isDevMode={isDevMode} bottomSheetState={bottomSheetState} />
				<Transactions />
				<BottomSheetReplenish bottomSheetState={bottomSheetState} />
			</div>
		</>
	)
}
