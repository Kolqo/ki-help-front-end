import './styles.css'

import { ErrorMessage, ScrollTopButton } from '../../../shared/ui'
import { Requests } from './ui'

import { useGetTransactionsWithdraw } from '../../../features/transaction/model'
import { useGoBack } from '../../../shared/hooks'

export default function Payments() {
	useGoBack(`/settings/admin-panel`)

  const getTrWithdrawState = useGetTransactionsWithdraw()

	return (
		<>
			<div className='container-request-payments'>
				<ErrorMessage errors={[getTrWithdrawState.error]} />
				<ScrollTopButton />
				<Requests getTrWithdrawState={getTrWithdrawState} />
			</div>
		</>
	)
}
