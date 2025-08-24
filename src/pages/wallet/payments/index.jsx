import './styles.css'

import { useRef, useState } from 'react'

import {
	CategoriesWrapper,
	ErrorMessage,
	FixedButton,
	GroupInput,
	NavigationItem,
} from '../../../shared/ui'

import { usePostWithdraw } from '../../../features/user/model'
import { useGoBack, useInputGroup } from '../../../shared/hooks/index.js'

import { paymentsFields } from './const'
import { RedWalletIcon } from './assets'

export default function Withdraw() {
	useGoBack(`/wallet`)
	const [isActive, setIsActive] = useState(false)
	const [amount, setAmount] = useState('')

	const inputRefs = useRef([])

  const postWithdrawState = usePostWithdraw()

	const { handleKeyDown, getValue, setValue } = useInputGroup(
		inputRefs,
		paymentsFields.length
	)

  const wallet = JSON.parse(localStorage.getItem('userWallet'))

	const handleOnChange = value => {
    let digits = value.replace(/\D/g, '')
    setValue(0, digits)
		setAmount(Number(digits))
		setIsActive(digits >= 1000)
	}

	return (
		<>
			<div className='container-payments'>
				<ErrorMessage errors={[postWithdrawState.error]} />
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
					isDisabled={postWithdrawState.isLoading}
					isActive={isActive && wallet.cardNumber}
					onClick={() => postWithdrawState.handlePost(amount, wallet.id)}
				/>
			</div>
		</>
	)
}
