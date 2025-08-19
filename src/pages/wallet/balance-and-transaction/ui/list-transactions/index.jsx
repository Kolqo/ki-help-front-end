import './styles.css'

import { Transaction } from '../../../../../entities'
import { ErrorMessage, Tgs } from '../../../../../shared/ui'
import { LoadingTransactions } from '../'

import { useSelectedTransactions } from '../../../../../shared/hooks'

import Moon from '../../assets/tgs/Moon.tgs'

export default function ListTransactions() {
	const { error, errorMessage, isLoading, selectedTransactions } =
		useSelectedTransactions(window.Telegram.WebApp.initDataUnsafe.user.id)

	const isAnyTransactions = selectedTransactions.length > 0
	return (
		<>
			<div className='style-list-transactions'>
				<ErrorMessage isError={error}>{errorMessage}</ErrorMessage>
				<p>ІСТОРІЯ ТРАНЗАКЦІЙ</p>
				{isLoading ? (
					<LoadingTransactions />
				) : isAnyTransactions ? (
					<div className='list-transactions'>
						{selectedTransactions.map(item => (
							<Transaction
								key={item.transactionId}
								transaction={item}
							></Transaction>
						))}
					</div>
				) : (
					<div className='empty-list'>
						<Tgs src={Moon} isLoop isAutoplay></Tgs>
						<p>Історії ще немає</p>
						<div>
							Історії ще немає. Щойно ви здійснете транзакцію, вона з’явиться
							тут.
						</div>
					</div>
				)}
			</div>
		</>
	)
}
