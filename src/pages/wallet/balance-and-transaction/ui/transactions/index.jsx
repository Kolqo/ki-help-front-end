import './styles.css'

import { LoadingTransaction, Transaction } from '../../../../../entities'
import {
	CategoriesWrapper,
	EmptyList,
	SectionWrapper,
} from '../../../../../shared/ui'

import { MoonTgs } from '../../../../../shared/assets/tgs'
import { ArrowIcon } from '../../../../../shared/assets/svg'

export default function Transactions(props) {
	const { transactions, isLoading } = props.getTransactionsState
	const { isMoreTr, setIsMoreTr, isDevMode } = props

	const visibleTransactions = isMoreTr ? transactions : transactions.slice(0, 5)

	if (transactions.length === 0 && !isLoading) {
		return (
			<SectionWrapper section={{ header: 'ІСТОРІЯ ТРАНЗАКЦІЙ' }}>
				<EmptyList
					icon={MoonTgs}
					text={{
						header: 'Історії ще немає',
						footer: 'Щойно ви здійснете транзакцію, вона з’явиться тут.',
					}}
				/>
			</SectionWrapper>
		)
	}

	return (
		<>
			<div className='style-transactions'>
				<SectionWrapper section={{ header: 'ІСТОРІЯ ТРАНЗАКЦІЙ' }}>
					<CategoriesWrapper>
						{visibleTransactions.map(item => (
							<Transaction key={item.id} item={item} isDevMode={isDevMode} />
						))}
					</CategoriesWrapper>

					{!isMoreTr && !isLoading && transactions.length > 5 && (
						<div
							className='transactions-footer'
							onClick={() => setIsMoreTr(true)}
						>
							Більше транзакцій <ArrowIcon />
						</div>
					)}
				</SectionWrapper>

				{isLoading && <LoadingTransaction count={5} />}
			</div>
		</>
	)
}
