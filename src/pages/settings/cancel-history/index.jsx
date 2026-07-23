import './styles.css'

import { useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import {
	AdminHeader,
	ErrorMessage,
	FixedButton,
	GroupInput,
} from '../../../shared/ui'

import { useCancelHistory } from '../../../features/task/model'
import { useGoBack, useInputGroup } from '../../../shared/hooks'

import { cancelHistoryFields } from './const'

export default function CancelHistory() {
	const { taskStatus } = useParams()
	const navigate = useNavigate()
	const navUrl = `/settings/dev-panel/history/${taskStatus}`
	useGoBack(navUrl)

	const historyItem = JSON.parse(localStorage.getItem('cancelHistory'))

	const [reason, setReason] = useState('')
	const inputRefs = useRef([])

	const cancelHistoryState = useCancelHistory()

	const { handleKeyDown, getValue } = useInputGroup(
		inputRefs,
		cancelHistoryFields.length
	)

	return (
		<>
			<div className='container-cancel-history'>
				<ErrorMessage errors={[cancelHistoryState.error]} />
				<AdminHeader text={{ header: 'Скасувати завдання' }} />
				<GroupInput
					fields={cancelHistoryFields}
					inputRefs={inputRefs}
					onKeyDown={handleKeyDown}
					onChange={() => setReason(getValue(0))}
				/>
				<FixedButton
					text={{ default: 'Скасувати завдання', loading: 'Виконується запит' }}
					isDisabled={cancelHistoryState.isLoading}
					isActive={reason.trim() !== ''}
					onClick={() =>
						cancelHistoryState.handlePatch(historyItem.id, reason, () =>
							navigate(navUrl)
						)
					}
				/>
			</div>
		</>
	)
}
