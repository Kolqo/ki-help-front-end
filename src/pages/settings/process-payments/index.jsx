import './styles.css'

import { useRef, useState } from 'react'

import {
	AdminHeader,
	Avatar,
	ErrorMessage,
	FixedButton,
	GroupInput,
	Table,
	UsernameWrapper,
} from '../../../shared/ui'
import { SwitchItem } from './ui'

import { usePatchConfirmWithdraw } from '../../../features/transaction/model'
import { useGoBack, useInputGroup } from '../../../shared/hooks'

import { requestPaymentFields } from './const'

export default function ProcessPayments() {
  useGoBack('/settings/admin-panel/request-payments')
	const requestPayment = JSON.parse(localStorage.getItem('requestPayment'))
  console.log('requestPayment', requestPayment)
	const tableData = {
		ID: requestPayment.transactionId,
		Користувач: (
			<div className='user-avatar'>
				<Avatar diameter='20' photo={requestPayment.source?.user.photo} />
				<UsernameWrapper>
					{requestPayment.source?.user.username}
				</UsernameWrapper>
			</div>
		),
		Гаманець: requestPayment.source?.cardNumber,
		Сума: `${requestPayment.amount} STARS - ${+(
			requestPayment.amount * 0.013
		).toFixed(3)} USDT`,
	}

	const [payment, setPayment] = useState({
		id: requestPayment.transactionId,
		errorMessage: '',
		isReject: false,
		status: 'SUCCESS',
	})
	const inputRefs = useRef([])

  const patchConfirmWithdrawState = usePatchConfirmWithdraw()

	const { handleKeyDown, getValue } = useInputGroup(
		inputRefs,
		requestPaymentFields.length
	)

	const handleOnChange = value => {
		setPayment(prevState => ({ ...prevState, errorMessage: value }))
	}

	return (
		<>
			<div className='container-process-payments'>
				<ErrorMessage errors={[patchConfirmWithdrawState.error]} />
				<AdminHeader text={{ header: 'Виплата' }} />
				<Table data={tableData} />
				{payment.isReject && (
					<GroupInput
						fields={requestPaymentFields}
						inputRefs={inputRefs}
						onKeyDown={handleKeyDown}
						onChange={() => handleOnChange(getValue(0))}
					/>
				)}
				<SwitchItem isSwitch={payment.isReject} setIsSwitch={setPayment} />
				<FixedButton
					text={{
						default: `Зберегти`,
						loading: 'Виконується запит',
					}}
					isDisabled={patchConfirmWithdrawState.isLoading}
					isActive={payment.errorMessage || !payment.isReject}
					onClick={() => patchConfirmWithdrawState.handlePatch(payment)}
				/>
			</div>
		</>
	)
}
