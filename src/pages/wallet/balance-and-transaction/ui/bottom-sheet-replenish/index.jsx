import './styles.css'

import { useRef, useState } from 'react'

import {
	BottomSheet,
	BottomSheetHeader,
	Button,
	ErrorMessage,
	FixedButton,
	GroupInput,
	SectionWrapper,
} from '../../../../../shared/ui'

import { useInputGroup } from '../../../../../shared/hooks'

import { replenishFields, quickAmountButtonItems } from '../../const'
import {
	useGetBankJar,
	usePatchBalance,
} from '../../../../../features/user/model'

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
	const patchBalanceState = usePatchBalance()

	const handleOnChange = value => {
		let digits
		if (!props.telegramId) {
      digits = value.replace(/\D/g, '')
			if (Number(digits) > 2500) digits = '2500'
			setValue(0, digits)
			setAmount(Number(digits))
			setIsActive(Number(digits) >= 100)
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
			<ErrorMessage errors={[getBankJarState.error, patchBalanceState.error]} />
			<BottomSheet bottomSheetState={props.bottomSheetState}>
				<BottomSheetHeader
					text={{
						header: 'Поповнити гаманець',
					}}
				/>
				<GroupInput
					fields={replenishFields}
					inputRefs={inputRefs}
					onKeyDown={handleKeyDown}
					onChange={() => handleOnChange(getValue(0))}
				/>
				<SectionWrapper section={{ header: 'СУМА' }}>
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
								{item.value} UAH
							</Button>
						))}
					</div>
				</SectionWrapper>
				<FixedButton
					text={{
						default: amount ? `Поповнити ${amount} UAH` : 'Поповнити',
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
