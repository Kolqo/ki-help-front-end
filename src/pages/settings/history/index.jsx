import './styles.css'

import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { ActionPopup, ErrorMessage, ScrollTopButton } from '../../../shared/ui'
import { BottomSheetHistory, HistoryTasks } from './ui'

import { usePutHistoryReprocess, useSelectedUserHistoryTasks } from '../../../features/task/model'
import { useBottomSheet, useGoBack, useRoles, useShowPopup } from '../../../shared/hooks'
import { filterHistoryPopupItems, itemHistoryPopupItems } from './lib'

export default function History() {
	const { telegramId } = useParams()
  const navigate = useNavigate()
  const { isAdmin } = useRoles()
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

  const putHistoryReprocess = usePutHistoryReprocess()
    
	const filterSelectedHistory =
		selectedUserHistoryTasksState.selectedUserHistoryTasks.filter(
			item => item.task.autoGenerate === mode.autoGenerate
		)

	const bottomSheetState = useBottomSheet(setHistory)
	const showPopupFilterState = useShowPopup()
  const showPopupHistoryState = useShowPopup()

	return (
		<>
			<div className='container-history-task'>
				<ErrorMessage
					errors={[
						selectedUserHistoryTasksState.error,
						putHistoryReprocess.error,
					]}
				/>
				<ScrollTopButton />
				{showPopupFilterState.position && (
					<ActionPopup
						ref={showPopupFilterState.menuRef}
						items={filterHistoryPopupItems(
							setMode,
							selectedUserHistoryTasksState.refetch
						)}
						onClick={showPopupFilterState.close}
						position={showPopupFilterState.position}
					/>
				)}
				{isAdmin() && telegramId && showPopupHistoryState.position && (
					<ActionPopup
						ref={showPopupHistoryState.menuRef}
						items={itemHistoryPopupItems(
							() =>
								navigate(
									`/settings/admin-panel/profile/history/${telegramId}/edit-history-file`
								),
							localStorage.setItem(
								'historyFile',
								JSON.stringify(showPopupHistoryState.item)
							)
						)}
						onClick={showPopupHistoryState.close}
						position={showPopupHistoryState.position}
					/>
				)}
				<HistoryTasks
					selectedUserHistoryTasksState={selectedUserHistoryTasksState}
					filterSelectedHistory={filterSelectedHistory}
					history={history}
					setHistory={setHistory}
					bottomSheetState={bottomSheetState}
					showPopupFilterState={showPopupFilterState}
					showPopupHistoryState={showPopupHistoryState}
					mode={mode}
				/>
				<BottomSheetHistory
					bottomSheetState={bottomSheetState}
					putHistoryReprocess={putHistoryReprocess}
					historyRefetch={selectedUserHistoryTasksState.refetch}
					history={history}
				/>
			</div>
		</>
	)
}
