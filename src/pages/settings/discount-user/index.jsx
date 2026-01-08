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
import { useGetSearch } from '../../../features/user/model'
import { useDebounce, useGoBack } from '../../../shared/hooks'

export default function DiscountUser() {
	const navigate = useNavigate()

	const { subjectId, teacherId, action } = useParams()
	useGoBack(
		`/settings/admin-panel/list-discount/path=/${subjectId}/${teacherId}/discount-form/${action}`
	)

	const [inputValue, setInputValue] = useState('')
	const discountDataState = useDiscountData(false)
  const debouncedValue = useDebounce(inputValue, 400)
	const getSearchState = useGetSearch(debouncedValue)

	const checkboxState = useCheckboxState(
		getSearchState.users,
		discountDataState.data.users,
		action === 'add' ? false : true,
		'developer'
	)

	const isActive = Object.values(checkboxState.checkedState).includes(true)

  const selectedUsers = checkboxState.selectedItems

	return (
		<>
			<div className='container-discount-user'>
				<ErrorMessage errors={[getSearchState.error]} />
				<ScrollTopButton />
				<GrayInput
					placeholder='Пошук по імені користувача'
					onChange={setInputValue}
				/>
				<div className='list-users'>
					{getSearchState.users.map(item => (
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
					<div ref={getSearchState.sentinelRef} style={{ height: 1 }} />
					{getSearchState.isLoading && <LoadingItem count={3} height={44} />}
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
