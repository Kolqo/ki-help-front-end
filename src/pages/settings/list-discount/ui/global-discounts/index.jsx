import './styles.css'

import { DiscountCard, LoadingItem } from '../../../../../entities'
import { SectionWrapper } from '../../../../../shared/ui'

export default function GlobalDiscounts(props) {
	const { discounts, isLoading, sentinelRef } = props.getGlobalDiscountsState

	if (isLoading && !discounts.length) {
		return (
			<SectionWrapper section={{ header: 'ГЛОБАЛЬНІ ЗНИЖКИ' }}>
				<LoadingItem count={3} height={58}/>
			</SectionWrapper>
		)
	}

	if (!discounts.length) {
		return null
	}

	return (
		<>
			<div className='style-global-discounts'>
				<SectionWrapper section={{ header: 'ГЛОБАЛЬНІ ЗНИЖКИ' }}>
					<div className='global-list'>
						{discounts.map(item => (
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
						{isLoading && <LoadingItem count={3} height={58}/>}
						<div ref={sentinelRef} style={{ height: 1 }} />
					</div>
				</SectionWrapper>
			</div>
		</>
	)
}
