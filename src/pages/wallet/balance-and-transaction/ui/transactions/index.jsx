import './styles.css'

import { EmptyList, SectionWrapper } from '../../../../../shared/ui'
import { MoonTgs } from '../../../../../shared/assets/tgs'

export default function Transactions(props) {

  if (true) {
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
          f
					{/*{props.selectedTransactions.map(item => 1)}*/}
				</SectionWrapper>
			</div>
		</>
	)
}
