import './styles.css'

import { useEffect, useRef, useState } from 'react'

import {
	BottomSheet,
	BottomSheetHeader,
	Button,
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

	const inputRefs = useRef([])


	const replenishButtonText = paymentData.amount?.value
		? `Поповнити ${paymentData.amount.value} ${currency}`
		: 'Поповнити'

	const footerText = paymentData.paymentType?.provider === 'TELEGRAM_STARS'

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

	const handleOnClick = async () => {
		try {
			const response = await postDepositState.handlePost(
				paymentData.amount.value,
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

	useEffect(() => {
		const amount = Number(paymentData.amount.value)
		const paymentType = paymentData.paymentType.provider

		if (props.telegramId) {
			setIsActive(amount > 0 && !!paymentType)
		} else {
			setIsActive(amount >= 10 && !!paymentType)
		}
	}, [paymentData, props.telegramId])

	return (
		<>
			<ErrorMessage
				errors={[postDepositState.error, getCurrencyRatesState.error]}
			/>
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
									paymentData.paymentType.provider === item.provider ? 'active' : ''
								} ${item.isDisabled ? 'disabled' : ''}`}
								disabled={item.isDisabled}
								key={index}
								leftIcon={item.icon}
								onClick={() =>
									setPaymentData(prev => ({
										...prev,
										paymentType: item,
										amount: { text: '0', value: '0', type: null },
									}))
								}
							>
								{item.text}
							</Button>
						))}
					</SliderWrapper>
				</SectionWrapper>
				{paymentData.paymentType?.provider === 'TELEGRAM_STARS' && (
					<PaymentBreakdown
						rows={[
							{
								label: 'Сума поповнення',
								value: `${paymentData.amount.value} ${currency}`,
							},
							{
								label: 'Комісія',
								value: `${paymentData.amount.value * 0.35} ${currency}`,
							},
						]}
						total={{
							label: 'Повна сумма',
							value: `${paymentData.amount.value * 1.35} ${currency}`,
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
					onClick={handleOnClick}
				/>
			</BottomSheet>
		</>
	)
}
