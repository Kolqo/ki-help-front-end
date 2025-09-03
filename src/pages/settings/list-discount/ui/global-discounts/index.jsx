import './styles.css'

import { DiscountCard, LoadingItem } from '../../../../../entities'
import { SectionWrapper } from '../../../../../shared/ui'

export default function GlobalDiscounts(props) {
	if (props.getGlobalDiscountsState.isLoading) {
		return (
			<SectionWrapper section={{ header: 'ГЛОБАЛЬНІ ЗНИЖКИ' }}>
				<LoadingItem count={3} height={60} />
			</SectionWrapper>
		)
	}

	return (
		<>
			<div className='style-global-discounts'>
				<SectionWrapper section={{ header: 'ГЛОБАЛЬНІ ЗНИЖКИ' }}>
					<div className='global-list'>
						{props.getGlobalDiscountsState.discounts.map(item => (
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
