import './styles.css'

import { DiscountCard, LoadingItem } from '../../../../../entities'
import { SectionWrapper } from '../../../../../shared/ui'

export default function LocalDiscounts(props) {
	const { isLoading, sentinelRef } = props.getLocalDiscountsState

	if (isLoading && !props.discounts.length) {
		return (
			<SectionWrapper section={{ header: 'ЛОКАЛЬНІ ЗНИЖКИ' }}>
				<LoadingItem count={3} height={83} isLeft/>
			</SectionWrapper>
		)
	}

	if (!props.discounts.length) {
		return null
	}

	return (
		<>
			<div className='style-local-discounts'>
				<SectionWrapper section={{ header: 'ЛОКАЛЬНІ ЗНИЖКИ' }}>
					<div className='local-list'>
						{props.discounts.map(item => (
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
						{isLoading && <LoadingItem count={3} height={83} isLeft/>}
						<div ref={sentinelRef} style={{ height: 1 }} />
					</div>
				</SectionWrapper>
			</div>
		</>
	)
}
