import './styles.css'

import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import {
	Avatar,
	CategoriesWrapper,
	Checkbox,
	ErrorMessage,
	FixedButton,
	GrayInput,
	ListTemplate,
	ScrollTopButton,
} from '../../../shared/ui'
import { LoadingItem } from '../../../entities'

import { useCheckboxState } from '../../../entities/choice-item/model'
import { useDiscountData } from '../../../features/discount/hooks'
import { useGetUsers } from '../../../features/user/model'
import { useGoBack } from '../../../shared/hooks'

export default function DiscountUser(props) {
	const navigate = useNavigate()

	const { subjectId, teacherId, action } = useParams()
	useGoBack(
		`/settings/admin-panel/list-discount/path=/${subjectId}/${teacherId}/discount-form/${action}`
	)

	const [inputValue, setInputValue] = useState('')
	const discountDataState = useDiscountData(false)
	const getUsersState = useGetUsers()

	const checkboxState = useCheckboxState(
		getUsersState.users,
		discountDataState.data.users,
		action === 'add' ? false : true,
		'developer'
	)

	const isActive = Object.values(checkboxState.checkedState).includes(true)

	const filteredUsers = getUsersState.users.filter(user =>
		user.username.includes(inputValue)
	)

	const selectedUsers = Object.keys(checkboxState.checkedState)
		.filter(id => checkboxState.checkedState[id])
		.map(id => checkboxState.itemsMap[id])

	return (
		<>
			<div className='container-discount-user'>
				<ErrorMessage errors={[getUsersState.error]} />
				<ScrollTopButton />
				<GrayInput
					placeholder='Пошук по імені користувача'
					onChange={setInputValue}
				/>
				<div className='list-users'>
					{filteredUsers.map(item => (
						<CategoriesWrapper key={item.telegramId}>
							<ListTemplate
								leftData={<Avatar photo={item.photo} diameter={26} />}
								centerData={{ header: item.username, footer: item.telegramId }}
								rightData={
									<Checkbox
										isChecked={checkboxState.checkedState[item.telegramId]}
										setIsChecked={() =>
											checkboxState.changeCheckedState(item.telegramId)
										}
									/>
								}
							/>
						</CategoriesWrapper>
					))}
					{getUsersState.isLoading && <LoadingItem count={3} height={44} />}
				</div>
				<FixedButton
					text={{ default: 'Зберегти', loading: 'Виконується запит' }}
					isActive={isActive}
					onClick={() => {
						discountDataState.updateData({ users: selectedUsers })
						navigate(
							`/settings/admin-panel/list-discount/path=/${subjectId}/${teacherId}/discount-form/${action}`
						)
					}}
				/>
			</div>
		</>
	)
}
