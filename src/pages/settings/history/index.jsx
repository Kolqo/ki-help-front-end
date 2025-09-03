import './styles.css'

import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { ActionPopup, ErrorMessage, ScrollTopButton } from '../../../shared/ui'
import { BottomSheetHistory, HistoryTasks } from './ui'

import { useSelectedUserHistoryTasks } from '../../../features/task/model'
import { useBottomSheet, useGoBack, useShowPopup } from '../../../shared/hooks'
import { filterHistoryPopupItems } from './lib'

export default function History() {
	const { telegramId } = useParams()
	useGoBack(telegramId ? '/settings/admin-panel/profile' : '/settings')
	const [history, setHistory] = useState()
	const [mode, setMode] = useState({
		name: 'З АВТОГЕНЕРАЦІЄЮ',
		autoGenerate: true,
	})

	const initUserTgId = telegramId
		? telegramId
		: window.Telegram.WebApp.initDataUnsafe.user.id

	const selectedUserHistoryTasksState = useSelectedUserHistoryTasks(
		initUserTgId,
		mode
	)
    
	const filterSelectedHistory =
		selectedUserHistoryTasksState.selectedUserHistoryTasks.filter(
			item => item.task.autoGenerate === mode.autoGenerate
		)

	const bottomSheetState = useBottomSheet(setHistory)
	const showPopupState = useShowPopup()

	return (
		<>
			<div className='container-history-task'>
				<ErrorMessage errors={[selectedUserHistoryTasksState.error]} />
				<ScrollTopButton />
				{showPopupState.position && (
					<ActionPopup
						ref={showPopupState.menuRef}
						items={filterHistoryPopupItems(
							setMode,
							selectedUserHistoryTasksState.refetch
						)}
						onClick={showPopupState.close}
						position={showPopupState.position}
					/>
				)}
				<HistoryTasks
					selectedUserHistoryTasksState={selectedUserHistoryTasksState}
					filterSelectedHistory={filterSelectedHistory}
					history={history}
					setHistory={setHistory}
					bottomSheetState={bottomSheetState}
					showPopupState={showPopupState}
					mode={mode}
				/>
				<BottomSheetHistory
					bottomSheetState={bottomSheetState}
					history={history}
				/>
			</div>
		</>
	)
}
