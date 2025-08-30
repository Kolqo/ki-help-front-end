import { useNavigate, useParams } from 'react-router-dom'

import {
	Adder,
	Avatar,
	CategoriesWrapper,
	ListTemplate,
	SectionWrapper,
	StatusSwitch,
} from '../../../../../shared/ui'

export default function PrivateActivation(props) {
	const { subjectId, teacherId, action } = useParams()
	const navigate = useNavigate()
	return (
		<>
			<SectionWrapper
				section={{ footer: 'По замовчуванню знижка буде дійсна всім.' }}
			>
				<CategoriesWrapper>
					<ListTemplate
						centerData={{ header: 'Приватна активація ' }}
						rightData={
							<StatusSwitch
								isSwitch={props.discountDataState.data?.isActivation}
								setIsSwitch={() =>
									props.discountDataState.updateData({
										isActivation: !props.discountDataState.data?.isActivation,
									})
								}
							/>
						}
					/>
					{props.discountDataState.data?.isActivation && (
						<>
							{props.discountDataState.data.users.map(item => (
								<ListTemplate
									key={item.telegramId}
									leftData={<Avatar photo={item.photo} diameter={26} />}
									centerData={{
										header: item.username,
										footer: item.telegramId,
									}}
								/>
							))}
							<Adder
								centerText='Додати користувачів'
								isVisible
								onClick={() =>
									navigate(
										`/settings/admin-panel/list-discount/path=/${subjectId}/${teacherId}/discount-form/${action}/discount-user`
									)
								}
							/>
						</>
					)}
				</CategoriesWrapper>
			</SectionWrapper>
		</>
	)
}
