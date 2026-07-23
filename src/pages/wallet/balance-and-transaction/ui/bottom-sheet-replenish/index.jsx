import './styles.css'

import { useEffect, useRef, useState } from 'react'

import {
	BottomSheet,
	BottomSheetHeader,
	Button,
	DeletePopup,
	ErrorMessage,
	FixedButton,
	GroupInput,
	LinkWrapper,
	SectionWrapper,
	SliderWrapper,
} from '../../../../../shared/ui'

import { useInputGroup } from '../../../../../shared/hooks'

import {
	replenishFields,
	quickAmountButtonItems,
	quickPaymentMethodItems,
} from '../../const'
import { usePostDeposite } from '../../../../../features/user/model'
import { useGetCurrencyRates } from '../../../../../features/transaction/model'

function isIOS() {
	return /iPad|iPhone|iPod/.test(navigator.userAgent)
}

const PaymentBreakdown = ({ rows = [], total }) => {
	return (
		<div className='payment-breakdown'>
			<div className='payment-breakdown-details'>
				{rows.map((row, index) => (
					<div className='payment-breakdown-row' key={index}>
						<span className='payment-breakdown-label'>{row.label}</span>
						<span className='payment-breakdown-value muted'>{row.value}</span>
					</div>
				))}
			</div>
			<div className='payment-breakdown-row payment-breakdown-total'>
				<span className='payment-breakdown-label'>{total?.label}</span>
				<span className='payment-breakdown-value'>{total?.value}</span>
			</div>
		</div>
	)
}

export default function BottomSheetReplenish(props) {
	const currency = 'UAH'

	const [isActive, setIsActive] = useState(false)
	const [paymentData, setPaymentData] = useState({
		amount: quickAmountButtonItems(currency)[0],
		paymentType: quickPaymentMethodItems[0],
	})
	const [isDeletePopup, setIsDeletePopup] = useState(false)
	const [pendingConfirmAction, setPendingConfirmAction] = useState(null)

	const inputRefs = useRef([])

	const isStars = paymentData.paymentType?.provider === 'TELEGRAM_STARS'

	const baseAmount = Number(paymentData.amount.value)

	const amountWithCommission = isStars
		? Math.ceil(baseAmount * 1.35 * 100) / 100
		: baseAmount

	const commission = isStars
		? Math.round((amountWithCommission - baseAmount) * 100) / 100
		: 0

	const replenishButtonText = paymentData.amount?.value
		? `Поповнити ${amountWithCommission} ${currency}`
		: 'Поповнити'

	const footerText = isStars

	const { handleKeyDown, getValue, setValue } = useInputGroup(
		inputRefs,
		replenishFields.length,
	)

	const getCurrencyRatesState = useGetCurrencyRates()
	const postDepositState = usePostDeposite()

	const handleOnChange = value => {
		let digits
		if (!props.telegramId) {
			digits = value.replace(/\D/g, '')
			if (Number(digits) > 2500) digits = '2500'
			setValue(0, digits)
			setPaymentData(prev => ({
				...prev,
				amount: { ...prev.amount, value: Number(digits) },
			}))
		} else {
			digits = value
			setPaymentData(prev => ({
				...prev,
				amount: { ...prev.amount, value: digits },
			}))
		}
	}

	const selectPaymentType = item => {
		setPaymentData(prev => ({
			...prev,
			paymentType: item,
			amount: quickAmountButtonItems(currency)[0],
		}))
	}

	const openStarsWarning = onConfirm => {
		setPendingConfirmAction(() => onConfirm)
		setIsDeletePopup(true)
	}

	const submitDeposit = async () => {
		try {
			const requestAmount = isStars
				? amountWithCommission
				: paymentData.amount.value

			const response = await postDepositState.handlePost(
				requestAmount,
				paymentData.paymentType.provider,
				props.bottomSheetState.closeSheet,
				props.getWalletState.refetch,
			)
			const link = response?.paymentLink
			if (link) {
				if (isIOS()) {
					window.location.href = link
				} else {
					window.open(link, '_blank')
				}
			}
		} catch (err) {
			console.error('Помилка:', err)
		}
	}

	const handleReplenishClick = () => {
		if (isStars && props.isMobile) {
			openStarsWarning(() => submitDeposit())
		} else {
			submitDeposit()
		}
	}

	useEffect(() => {
		const amount = Number(paymentData.amount.value)
		const paymentType = paymentData.paymentType.provider

		if (props.telegramId) {
			setIsActive(amount > 0 && !!paymentType)
		} else {
			setIsActive(amount >= 1 && !!paymentType)
		}
	}, [paymentData, props.telegramId])

	return (
		<>
			<ErrorMessage
				errors={[postDepositState.error, getCurrencyRatesState.error]}
			/>
			{isDeletePopup && (
				<DeletePopup
					textInfo={
						'Якщо ви купуєте старси через Google Pay або Apple Pay на телефоні, платіжні системи цих сервісів утримують близько 20% комісії. Використуйте ПК чи ноутбук для уникнення комісії'
					}
					onClickCancel={() => setIsDeletePopup(false)}
					onClickConfirm={() => {
						setIsDeletePopup(false)
						pendingConfirmAction && pendingConfirmAction()
					}}
				/>
			)}
			<BottomSheet bottomSheetState={props.bottomSheetState}>
				<BottomSheetHeader
					text={{
						header: 'Поповнити гаманець',
						footer: footerText && (
							<>
								Для купівлі <span className='stars'>STARS</span> криптовалютою,
								скористайтеся платформою{' '}
								<LinkWrapper href='https://split.tg/?ref=UQCpAm-PRaXc5QeRjRAvMKmvlACADmmvbtnw8giqo1SlSapK'>
									Split
								</LinkWrapper>
								.
							</>
						),
					}}
				/>
				{paymentData.amount?.type !== 'custom-amount' && (
					<SectionWrapper
						section={{
							header: 'СУМА ПОПОВНЕННЯ',
						}}
					>
						<SliderWrapper className='quick-amounts'>
							{quickAmountButtonItems(currency).map((item, index) => (
								<Button
									key={index}
									className={`quick-amounts-button gray-button ${
										paymentData.amount.text === item.text ? 'active' : ''
									}`}
									onClick={() => {
										setValue(0, item.value)
										setPaymentData(prev => ({ ...prev, amount: item }))
									}}
								>
									{item.text}
								</Button>
							))}
						</SliderWrapper>
					</SectionWrapper>
				)}
				{paymentData.amount?.type === 'custom-amount' && (
					<GroupInput
						fields={replenishFields}
						inputRefs={inputRefs}
						onKeyDown={handleKeyDown}
						onChange={() => handleOnChange(getValue(0))}
					/>
				)}
				<SectionWrapper
					section={{
						header: 'МЕТОД ОПЛАТИ',
					}}
				>
					<SliderWrapper className='quick-payment-method'>
						{quickPaymentMethodItems.map((item, index) => (
							<Button
								className={`payment-method-button gray-button ${
									paymentData.paymentType.provider === item.provider
										? 'active'
										: ''
								} ${item.isDisabled ? 'disabled' : ''}`}
								disabled={item.isDisabled}
								key={index}
								leftIcon={item.icon}
								onClick={() => selectPaymentType(item)}
							>
								{item.text}
							</Button>
						))}
					</SliderWrapper>
				</SectionWrapper>
				{isStars && (
					<PaymentBreakdown
						rows={[
							{
								label: 'Сума поповнення',
								value: `${paymentData.amount.value} ${currency}`,
							},
							{
								label: 'Комісія',
								value: `${commission} ${currency}`,
							},
						]}
						total={{
							label: 'Повна сумма',
							value: `${amountWithCommission} ${currency}`,
						}}
					/>
				)}
				<p className='info-text'>
					Завершуючи цю транзакцію, ви погоджуєтеся з{' '}
					<LinkWrapper href='https://kihelp.gitbook.io/kihelp-docs'>
						Користувацькою угодою
					</LinkWrapper>
					.
				</p>
				<FixedButton
					text={{
						default: replenishButtonText,
						loading: 'Виконується запит',
					}}
					isDisabled={postDepositState.isLoading}
					isActive={isActive}
					onClick={handleReplenishClick}
				/>
			</BottomSheet>
		</>
	)
}
