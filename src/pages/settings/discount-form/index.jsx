import './styles.css'

import { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import {
	AdminHeader,
	ErrorMessage,
	FixedButton,
	GroupInput,
} from '../../../shared/ui'
import { LimitActivation, PeriodValidation, PrivateActivation } from './ui'

import {
	useAddDiscount,
	useEditDiscount,
} from '../../../features/discount/model'
import { useDiscountData } from '../../../features/discount/hooks'
import { useGoBack, useInputGroup } from '../../../shared/hooks'

import { discountFormFields } from './const'

export default function DiscountForm() {
	const { subjectId, teacherId, action } = useParams()
	useGoBack(
		action === 'edit'
			? '/settings/admin-panel/list-discount'
			: `/settings/admin-panel/list-discount/path=/${subjectId}/${teacherId}`
	)

	const [isLimit, setIsLimit] = useState(false)
	const inputRefs = useRef([])

	const { handleKeyDown, getAllValues, setAllValues } = useInputGroup(
		inputRefs,
		discountFormFields.length
	)

	const addDiscountState = useAddDiscount()
	const editDiscountState = useEditDiscount()
	const discountDataState = useDiscountData(true, action, setAllValues)

	return (
		<>
			<div className='container-discount-form'>
				<ErrorMessage
					errors={[addDiscountState.error, editDiscountState.error]}
				/>
				<AdminHeader text={{ header: 'Створити знижку' }} />
				<GroupInput
					fields={discountFormFields(discountDataState.data?.isLimit)}
					inputRefs={inputRefs}
					onKeyDown={handleKeyDown}
					onChange={() => discountDataState.handleOnChange(getAllValues())}
				/>
				<PeriodValidation discountDataState={discountDataState} />
				<PrivateActivation discountDataState={discountDataState} />
				<LimitActivation
					isSwitch={isLimit}
					setIsSwitch={setIsLimit}
					discountDataState={discountDataState}
				/>
				<FixedButton
					text={{ default: 'Зберегти', loading: 'Виконується запит' }}
					isDisabled={addDiscountState.isLoading || editDiscountState.isLoading}
					isActive={discountDataState.isActive}
					onClick={() => {
						if (action === 'add') addDiscountState.handlePost(discountDataState.data)
            if (action === 'edit') editDiscountState.handlePatch(discountDataState.data)
					}}
				/>
			</div>
		</>
	)
}
