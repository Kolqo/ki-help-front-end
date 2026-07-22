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
import usePatchPaymentDetails from '../../../features/user/model/usePatchPaymentDetails.js'

const paymentTypeLabels = {
	BANK_CARD: 'Банківська картка',
	CRYPTO: 'Криптогаманець',
}

export default function SettingPayments() {
	useGoBack(`/wallet/payments`)
	const wallet = JSON.parse(localStorage.getItem('userWallet'))
  const developerWallet = wallet.find(item => item.walletType === 'DEVELOPER')
	const [isActive, setIsActive] = useState(false)
	const [paymentDetails, setPaymentDetails] = useState(
		developerWallet.paymentDetails || ''
	)
	const [paymentDetailsType, setPaymentDetailsType] = useState(
		developerWallet.paymentDetailsType || 'CRYPTO'
	)

	const inputRefs = useRef([])
	const prevValueRef = useRef('')

	const showPopupState = useShowPopup()
	const patchPaymentDetails = usePatchPaymentDetails()
	const { handleKeyDown, getValue, setValue } = useInputGroup(
		inputRefs,
		settingsPaymentsFields(paymentDetailsType).length
	)

	const handleOnChange = value => {
		const prevValue = prevValueRef.current
		prevValueRef.current = value

		if (
			prevValue &&
			value &&
			value.includes('*') &&
			value.length < prevValue.length
		) {
			setValue(0, '')
			setPaymentDetails('')
			setIsActive(false)
			return
		}

		if (paymentDetailsType === 'BANK_CARD') {
			const digits = (value || '').replace(/\D/g, '').slice(0, 16)
			const formatted = digits.replace(/(.{4})/g, '$1 ').trim()

			setValue(0, formatted)
			setPaymentDetails(digits)
			setIsActive(digits.length === 16)
			return
		}

		const clean = (value || '').replace(/[^a-zA-Z0-9]/g, '')

		setValue(0, clean)
		setPaymentDetails(clean)

		setIsActive(clean.length >= 10)
	}

	useEffect(() => {
		handleOnChange(paymentDetails)
	}, [paymentDetailsType])

	return (
		<>
			<div className='container-setting-payments'>
				<ErrorMessage errors={[patchPaymentDetails.error]} />
				{showPopupState.position && (
					<ActionPopup
						ref={showPopupState.menuRef}
						items={typePaymentsPopupItems(setPaymentDetailsType)}
						onClick={showPopupState.close}
						position={showPopupState.position}
					/>
				)}
				<SectionWrapper section={{ header: 'НАЛАШТУВАННЯ ВИПЛАТ' }}>
					<OptionRow
						header='Спосіб оплати'
						option={paymentTypeLabels[paymentDetailsType]}
						rightIcon={<TwoArrowIcon />}
						onClick={showPopupState.handleLeftClick}
					/>
				</SectionWrapper>
				<GroupInput
					fields={settingsPaymentsFields(paymentDetailsType)}
					inputRefs={inputRefs}
					onKeyDown={handleKeyDown}
					onChange={() => handleOnChange(getValue(0))}
				/>
				<FixedButton
					text={{
						default: `Змінити дані для виплат`,
						loading: 'Виконується запит',
					}}
					isDisabled={patchPaymentDetails.isLoading}
					isActive={isActive}
					onClick={() =>
						patchPaymentDetails.handlePatch(
							developerWallet.id,
							paymentDetails,
							paymentDetailsType
						)
					}
				/>
			</div>
		</>
	)
}
