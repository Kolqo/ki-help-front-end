import {
	CategoriesWrapper,
	ListTemplate,
	StatusSwitch,
} from '../../../../../shared/ui'

export default function SwitchItem(props) {

	return (
		<>
			<CategoriesWrapper>
				<ListTemplate
					centerData={{ header: 'Відхилити' }}
					rightData={
						<StatusSwitch
							isSwitch={props.isSwitch}
							setIsSwitch={() =>
								props.setIsSwitch(prevState => ({
									...prevState,
									errorMessage: '',
									isReject: !prevState.isReject,
									status: prevState.isReject ? 'SUCCESS' : 'FAILED',
								}))
							}
						/>
					}
				/>
			</CategoriesWrapper>
		</>
	)
}
