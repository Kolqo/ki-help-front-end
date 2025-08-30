import {
	CategoriesWrapper,
	ListTemplate,
	SectionWrapper,
	StatusSwitch,
} from '../../../../../shared/ui'

export default function SwitchItem(props) {

	return (
		<>
			<SectionWrapper
				section={props.section}
			>
				<CategoriesWrapper>
					<ListTemplate
						centerData={props.centerData}
						rightData={
							<StatusSwitch
								isSwitch={props.isSwitch}
								setIsSwitch={props.setIsSwitch}
							/>
						}
					/>
				</CategoriesWrapper>
			</SectionWrapper>
		</>
	)
}
