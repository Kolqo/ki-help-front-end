import {
	CategoriesWrapper,
	ListTemplate,
	StatusSwitch,
} from '../../../../../shared/ui'

export default function LimitActivation(props) {
	return (
		<>
			<CategoriesWrapper>
				<ListTemplate
					centerData={{ header: 'Ліміт активацій' }}
					rightData={
						<StatusSwitch
							isSwitch={props.discountDataState?.data?.isLimit}
							setIsSwitch={() =>
								props.discountDataState.updateData({
									isLimit: !props.discountDataState?.data?.isLimit,
								})
							}
						/>
					}
				/>
			</CategoriesWrapper>
		</>
	)
}
