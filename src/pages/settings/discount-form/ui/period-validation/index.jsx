import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './styles.css'

import {
	CategoriesWrapper,
	ListTemplate,
	SectionWrapper,
	StatusSwitch,
} from '../../../../../shared/ui'

export default function PeriodValidation(props) {
	const handleChange = (key, value) => {
    props.discountDataState.updateData({
			[key]: value ? value.toISOString() : null,
		})
	}

	return (
		<SectionWrapper
			section={{ footer: 'По замовчуванню знижка буде дійсна безлімітно.' }}
		>
			<CategoriesWrapper>
				<ListTemplate
					centerData={{ header: 'Період валідації' }}
					rightData={
						<StatusSwitch
							isSwitch={props.discountDataState.data?.isValidation}
							setIsSwitch={() =>
								props.discountDataState.updateData({
									isValidation: !props.discountDataState.data?.isValidation,
								})
							}
						/>
					}
				/>

				{props.discountDataState.data?.isValidation && (
					<>
						<ListTemplate
							centerData={{ header: 'Від' }}
							rightData={
								<DatePicker
									selected={
										props.discountDataState.data.validFrom
											? new Date(props.discountDataState.data?.validFrom)
											: null
									}
									onChange={date => handleChange('validFrom', date)}
									showTimeSelect
									timeFormat='HH:mm'
									timeIntervals={15}
									dateFormat='yyyy-MM-dd HH:mm'
									className='custom-datepicker'
									popperPlacement='bottom-start'
									popperClassName='custom-datepicker-popper'
								/>
							}
						/>
						<ListTemplate
							centerData={{ header: 'До' }}
							rightData={
								<DatePicker
									selected={
										props.discountDataState.data.validTo
											? new Date(props.discountDataState.data?.validTo)
											: null
									}
									onChange={date => handleChange('validTo', date)}
									showTimeSelect
									timeFormat='HH:mm'
									timeIntervals={15}
									dateFormat='yyyy-MM-dd HH:mm'
									className='custom-datepicker'
									popperPlacement='bottom-start'
									popperClassName='custom-datepicker-popper'
								/>
							}
						/>
					</>
				)}
			</CategoriesWrapper>
		</SectionWrapper>
	)
}
