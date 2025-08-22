import './styles.css'

import { useRef, useState } from 'react'

import {
	CategoriesWrapper,
	ErrorMessage,
	FixedButton,
	GroupInput,
	NavigationItem,
} from '../../../shared/ui'

import { useGoBack, useInputGroup } from '../../../shared/hooks/index.js'

import { paymentsFields } from './const'
import { RedWalletIcon } from './assets'

export default function Withdraw() {
	useGoBack(`/wallet`)
	const [isActive, setIsActive] = useState(false)
	const [amount, setAmount] = useState('')

	const inputRefs = useRef([])

	const { handleKeyDown, getValue, setValue } = useInputGroup(
		inputRefs,
		paymentsFields.length
	)

	const handleOnChange = value => {
    let digits = value.replace(/\D/g, '')
    setValue(0, digits)
		setAmount(Number(digits))
		setIsActive(digits > 0)
	}

	return (
		<>
			<div className='container-payments'>
				<GroupInput
					fields={paymentsFields}
					inputRefs={inputRefs}
					onKeyDown={handleKeyDown}
					onChange={() => handleOnChange(getValue(0))}
				/>
				<CategoriesWrapper>
					<NavigationItem
						leftData={<RedWalletIcon />}
						centerData={{ header: 'Налаштування виплат' }}
						url='/wallet/payments/setting-payments'
					/>
				</CategoriesWrapper>
				<FixedButton
					text={{
						default: `Створити заявку на виплату`,
						loading: 'Виконується запит',
					}}
					isActive={isActive}
				/>
			</div>
		</>
	)
}
