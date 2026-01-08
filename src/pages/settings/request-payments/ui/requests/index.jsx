import './styles.css'

import { useNavigate } from 'react-router-dom'

import { LoadingTransaction, Transaction } from '../../../../../entities'
import {
	CategoriesWrapper,
	EmptyList,
	SectionWrapper,
} from '../../../../../shared/ui'

import { MoonTgs } from '../../../../../shared/assets/tgs'

export default function Requests(props) {
	const navigate = useNavigate()
	const transactions = props.getTrWithdrawState.transactions

	if (transactions.length === 0 && !props.getTrWithdrawState.isLoading) {
		return (
			<SectionWrapper section={{ header: 'ЗАЯВКИ НА ВИПЛАТИ' }}>
				<EmptyList
					icon={MoonTgs}
					text={{
						header: 'Список заявок на виплату',
						footer: 'Щойно прийде заявка на виплату, вона з’явиться тут.',
					}}
				/>
			</SectionWrapper>
		)
	}

	return (
		<>
			<div className='style-transactions'>
				<SectionWrapper section={{ header: "ЗАЯВКИ НА ВИПЛАТИ'" }}>
					<CategoriesWrapper>
						{transactions.map(item => (
							<Transaction
								key={item.id}
								item={item}
								isDevMode={props.isDevMode}
								onClick={() => {
									navigate('/settings/admin-panel/request-payments/process'),
										localStorage.setItem('requestPayment', JSON.stringify(item))
								}}
							/>
						))}
					</CategoriesWrapper>
				</SectionWrapper>
				{props.getTrWithdrawState.isLoading && <LoadingTransaction count={5} />}
			</div>
		</>
	)
}
