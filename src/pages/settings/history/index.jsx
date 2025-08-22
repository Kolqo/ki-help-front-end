import './styles.css'

import { useState } from 'react'

import { ActionPopup, ErrorMessage } from '../../../shared/ui'
import { BottomSheetHistory, HistoryTasks } from './ui'

import { useSelectedUserHistoryTasks } from '../../../features/task/model'
import { useBottomSheet, useGoBack, useShowPopup } from '../../../shared/hooks'
import { filterHistoryPopupItems } from './lib'

export default function History() {
	useGoBack('/settings')
	const [history, setHistory] = useState()
	const [mode, setMode] = useState({
		name: 'З АВТОГЕНЕРАЦІЄЮ',
		autoGenerate: true,
	})

	const telegramId = window.Telegram.WebApp.initDataUnsafe.user.id

	const selectedUserHistoryTasksState = useSelectedUserHistoryTasks(telegramId)
	const filterSelectedHistory =
		selectedUserHistoryTasksState.selectedUserHistoryTasks.filter(
			item => item.task.autoGenerate === mode.autoGenerate
		)

  console.log(filterSelectedHistory)
	const bottomSheetState = useBottomSheet(setHistory)
	const showPopupState = useShowPopup()

	return (
		<>
			<div className='container-history-task'>
				<ErrorMessage errors={[selectedUserHistoryTasksState.error]} />
				{showPopupState.position && (
					<ActionPopup
						ref={showPopupState.menuRef}
						items={filterHistoryPopupItems(setMode)}
						onClick={showPopupState.close}
						position={showPopupState.position}
					/>
				)}
				<HistoryTasks
					isLoading={selectedUserHistoryTasksState.isLoading}
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
