import './styles.css'

import { useNavigate } from 'react-router-dom'

import {
	Adder,
	AdminHeader,
	CategoriesWrapper,
	ErrorMessage,
} from '../../../shared/ui'
import { EntityPopup } from '../../../features/entity/ui'
import { GlobalDiscounts, LocalDiscounts } from './ui'

import {
	useDeleteDiscount,
	useGetDiscounts,
} from '../../../features/discount/model'
import { useGoBack, useShowPopup } from '../../../shared/hooks'
import { useDeleteHandler } from '../../../shared/lib'

export default function ListDiscount() {
	useGoBack('/settings/admin-panel')
	const navigate = useNavigate()

	const getGlobalDiscountsState = useGetDiscounts('GLOBAL')
	const getLocalDiscountsState = useGetDiscounts('LOCAL')
	const deleteDiscountState = useDeleteDiscount()
	const showPopupState = useShowPopup()

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
					text={{ header: 'Знижки', footer: 'Створюйте знижки на завдання.' }}
				/>
				<GlobalDiscounts
					getGlobalDiscountsState={getGlobalDiscountsState}
					bindTarget={showPopupState.bindTarget}
				/>
				<LocalDiscounts
					getLocalDiscountsState={getLocalDiscountsState}
					bindTarget={showPopupState.bindTarget}
				/>
				<CategoriesWrapper>
					<Adder
						centerText='Додати знижку'
						onClick={() =>
							navigate('/settings/admin-panel/list-discount/path=')
						}
						isVisible
					/>
				</CategoriesWrapper>
			</div>
		</>
	)
}
