import './styles.css'

import { useRef, useState } from 'react'

import {
	BottomSheet,
	BottomSheetHeader,
	Button,
	ErrorMessage,
	FixedButton,
	GroupInput,
	LinkWrapper,
	SectionWrapper,
} from '../../../../../shared/ui'

import { useInputGroup } from '../../../../../shared/hooks'

import { replenishFields, quickAmountButtonItems } from '../../const'
import {
	useGetBankJar,
	usePatchBalance,
} from '../../../../../features/user/model'
import { useGetCurrencyRates } from '../../../../../features/transaction/model'

function isIOS() {
	return /iPad|iPhone|iPod/.test(navigator.userAgent)
}

export default function BottomSheetReplenish(props) {
	const [isActive, setIsActive] = useState(false)
	const [amount, setAmount] = useState('')

	const inputRefs = useRef([])

	const { handleKeyDown, getValue, setValue } = useInputGroup(
		inputRefs,
		replenishFields.length
	)

	const getBankJarState = useGetBankJar()
	const getCurrencyRatesState = useGetCurrencyRates()
	const patchBalanceState = usePatchBalance()

	const handleOnChange = value => {
		let digits
		if (!props.telegramId) {
			digits = value.replace(/\D/g, '')
			if (Number(digits) > 2500) digits = '2500'
			setValue(0, digits)
			setAmount(Number(digits))
			setIsActive(Number(digits) >= 10)
		} else {
			digits = value
			setAmount(digits)
			setIsActive(digits != '')
		}
	}

	const handleOnClick = async () => {
		try {
			const link = await getBankJarState.fetchGet(amount)
			if (isIOS()) {
				window.location.href = link
			} else {
				window.open(link, '_blank')
			}
		} catch (err) {
			console.error('Помилка:', err)
		}
	}

	return (
		<>
			<ErrorMessage
				errors={[
					getBankJarState.error,
					patchBalanceState.error,
					getCurrencyRatesState.error,
				]}
			/>
			<BottomSheet bottomSheetState={props.bottomSheetState}>
				<BottomSheetHeader
					text={{
						header: 'Поповнити гаманець',
						footer: (
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
				<GroupInput
					fields={replenishFields}
					inputRefs={inputRefs}
					onKeyDown={handleKeyDown}
					onChange={() => handleOnChange(getValue(0))}
				/>
				<p className='info-text'></p>
				<SectionWrapper
					section={{
						header: 'СУМА',
						footer: 'Актуальний курс 1 STARS = 0.84 UAH',
					}}
				>
					<div className='quick-amounts'>
						{quickAmountButtonItems.map((item, index) => (
							<Button
								key={index}
								className='button gray-button'
								onClick={() => {
									setValue(0, item.value)
									setAmount(item.value)
									setIsActive(item.value !== '')
								}}
							>
								{item.value} STARS
							</Button>
						))}
					</div>
				</SectionWrapper>
				<FixedButton
					text={{
						default: amount
							? `Поповнити ${amount} STARS - ${+(amount * 0.84).toFixed(3)} UAH`
							: 'Поповнити',
						loading: 'Виконується запит',
					}}
					isDisabled={getBankJarState.isLoading || patchBalanceState.isLoading}
					isActive={isActive}
					onClick={() => {
						if (!props.telegramId) handleOnClick()
						else {
							patchBalanceState.handlePatch(
								props.chooseWallet.id,
								amount,
								props.bottomSheetState.closeSheet,
								props.getWalletState.refetch
							)
						}
					}}
				/>
			</BottomSheet>
		</>
	)
}
