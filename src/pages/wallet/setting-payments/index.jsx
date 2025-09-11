import './styles.css'

import { useEffect, useRef, useState } from 'react'

import {
	ActionPopup,
	ErrorMessage,
	FixedButton,
	GroupInput,
	OptionRow,
	SectionWrapper,
} from '../../../shared/ui/index.jsx'

import { TwoArrowIcon } from '../../../shared/assets/svg'

import {
	useGoBack,
	useInputGroup,
	useShowPopup,
} from '../../../shared/hooks/index.js'
import { typePaymentsPopupItems } from './lib'

import { settingsPaymentsFields } from './const'
import usePatchCardNumber from '../../../features/user/model/usePatchCardNumber.js'

export default function SettingPayments() {
	useGoBack(`/wallet/payments`)
	const wallet = JSON.parse(localStorage.getItem('userWallet'))
	const [isActive, setIsActive] = useState(false)
	const [cardNumber, setCardNumber] = useState(wallet.cardNumber)
	const [typePayments, setTypePayments] = useState('Банківська картка')

	const inputRefs = useRef([])
  const prevValueRef = useRef('')

	const showPopupState = useShowPopup()
	const patchCardNumber = usePatchCardNumber()
	const { handleKeyDown, getValue, setValue } = useInputGroup(
		inputRefs,
		settingsPaymentsFields.length
	)

	const handleOnChange = value => {
		const prevValue = prevValueRef.current

		prevValueRef.current = value

		let digits = (value || '').replace(/[^0-9*]/g, '')

		if (
			prevValue &&
			value &&
			value.includes('*') &&
			value.length < prevValue.length
		) {
			setValue(0, '')
			setCardNumber('')
			setIsActive(false)
			return
		}

		if (digits.length > 16) {
			digits = digits.slice(0, 16)
		}
		let formatted = digits.match(/.{1,4}/g)?.join(' ') || digits

		setValue(0, formatted)
		setCardNumber(digits)
		setIsActive(digits.length === 16 && typePayments != '')
	}

	useEffect(() => {
		handleOnChange(cardNumber)
	}, [typePayments])

	return (
		<>
			<div className='container-setting-payments'>
				<ErrorMessage errors={[patchCardNumber.error]} />
				{showPopupState.position && (
					<ActionPopup
						ref={showPopupState.menuRef}
						items={typePaymentsPopupItems(setTypePayments)}
						onClick={showPopupState.close}
						position={showPopupState.position}
					/>
				)}
				<SectionWrapper section={{ header: 'НАЛАШТУВАННЯ ВИПЛАТ' }}>
					<OptionRow
						header='Спосіб оплати'
						option={typePayments}
						rightIcon={<TwoArrowIcon />}
						onClick={showPopupState.handleLeftClick}
					/>
				</SectionWrapper>
				<GroupInput
					fields={settingsPaymentsFields}
					inputRefs={inputRefs}
					onKeyDown={handleKeyDown}
					onChange={() => handleOnChange(getValue(0))}
				/>
				<FixedButton
					text={{
						default: `Змінити дані для виплат`,
						loading: 'Виконується запит',
					}}
					isDisabled={patchCardNumber.isLoading}
					isActive={isActive}
					onClick={() => patchCardNumber.handlePatch(wallet.id, cardNumber)}
				/>
			</div>
		</>
	)
}
