import './styles.css'

import { ErrorMessage } from '../../../shared/ui'
import { Requests } from './ui'

import { useGetTransactionsWithdraw } from '../../../features/transaction/model'
import { useGoBack } from '../../../shared/hooks'

export default function Payments() {
	useGoBack(`/settings/admin-panel`)

  const getTrWithdrawState = useGetTransactionsWithdraw()
  console.log(getTrWithdrawState.transactions)

	return (
		<>
			<div className='container-request-payments'>
				<ErrorMessage errors={[getTrWithdrawState.error]} />
				<Requests getTrWithdrawState={getTrWithdrawState} />
			</div>
		</>
	)
}
