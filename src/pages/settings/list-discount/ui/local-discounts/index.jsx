import './styles.css'

import { DiscountCard, LoadingItem } from '../../../../../entities'
import { SectionWrapper } from '../../../../../shared/ui'

export default function LocalDiscounts(props) {
	if (props.getLocalDiscountsState.isLoading) {
		return (
			<SectionWrapper section={{ header: 'ЛОКАЛЬНІ ЗНИЖКИ' }}>
				<LoadingItem count={3} height={60} />
			</SectionWrapper>
		)
	}

	return (
		<>
			<div className='style-local-discounts'>
				<SectionWrapper section={{ header: 'ЛОКАЛЬНІ ЗНИЖКИ' }}>
					<div className='local-list'>
						{props.getLocalDiscountsState.discounts.map(item => (
							<DiscountCard
								key={item.id}
								item={item}
								bindTarget={props.bindTarget}
								onClick={() => {
									props.setDiscount(item), props.bottomSheetState.openSheet()
								}}
								discount={props.discount}
							/>
						))}
					</div>
				</SectionWrapper>
			</div>
		</>
	)
}
