import './styles.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
	Adder,
	AdminHeader,
	CategoriesWrapper,
	ErrorMessage,
	FixedAdder,
	GrayInput,
} from '../../../shared/ui'
import { EntityPopup } from '../../../features/entity/ui'
import { GlobalDiscounts, LocalDiscounts, BottomSheetDiscount } from './ui'

import {
	useDeleteDiscount,
	useGetDiscounts,
} from '../../../features/discount/model'
import { useBottomSheet, useGoBack, useShowPopup } from '../../../shared/hooks'
import { useDeleteHandler } from '../../../shared/lib'

export default function ListDiscount() {
	useGoBack('/settings/admin-panel')
	const navigate = useNavigate()

  const [inputValue, setInputValue] = useState('')
	const [discount, setDiscount] = useState()

	const getGlobalDiscountsState = useGetDiscounts('GLOBAL')
	const getLocalDiscountsState = useGetDiscounts('LOCAL')
	const deleteDiscountState = useDeleteDiscount()
	const showPopupState = useShowPopup()
	const bottomSheetState = useBottomSheet(setDiscount)

	const deleteDiscount = useDeleteHandler(deleteDiscountState.handleDelete, [
		getGlobalDiscountsState.refetch,
		getLocalDiscountsState.refetch,
	])

	localStorage.removeItem('discountDraft')
	localStorage.removeItem('discountCurrent')

	return (
		<>
			<div className='container-list-discount'>
				<ErrorMessage
					errors={[getGlobalDiscountsState.error, getLocalDiscountsState.error]}
				/>
				<EntityPopup
					deleteSubject={deleteDiscount}
					showPopupState={showPopupState}
					editLink={`/settings/admin-panel/list-discount/path=/${null}/${null}/discount-form/edit`}
					localStorageName={'discountCurrent'}
				/>
				<AdminHeader
					text={{ header: 'Знижки', footer: 'Створюйте знижки на завдання' }}
				/>
				<div className='gray-input'>
					<GrayInput placeholder='Пошук по імені' onChange={setInputValue} />
				</div>
				<GlobalDiscounts
					getGlobalDiscountsState={getGlobalDiscountsState}
					bindTarget={showPopupState.bindTarget}
					setDiscount={setDiscount}
					bottomSheetState={bottomSheetState}
					discount={discount}
				/>
				<LocalDiscounts
					discounts={getLocalDiscountsState.discounts.filter(discount =>
						discount.user.username
							.toLowerCase()
							.includes(inputValue.toLowerCase())
					)}
					getLocalDiscountsState={getLocalDiscountsState}
					bindTarget={showPopupState.bindTarget}
					setDiscount={setDiscount}
					bottomSheetState={bottomSheetState}
					discount={discount}
				/>
				<FixedAdder
					centerText='Додати знижку'
					onClick={() => navigate('/settings/admin-panel/list-discount/path=')}
					isVisible
				/>
				<BottomSheetDiscount
					bottomSheetState={bottomSheetState}
					discount={discount}
				/>
			</div>
		</>
	)
}
