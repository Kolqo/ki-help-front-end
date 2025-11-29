import './styles.css'

import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { ActionPopup, ErrorMessage, ScrollTopButton } from '../../../shared/ui'
import { BottomSheetHistory, HistoryTasks } from './ui'

import {
	useGetHistoryDev,
	useGetTaskInProgress,
	usePatchFile,
} from '../../../features/task/model'
import { useBottomSheet, useGoBack, useShowPopup } from '../../../shared/hooks'
import { filterHistoryPopupItems, itemHistoryPopupItems } from './lib'

export default function DevHistory() {
	useGoBack('/settings/dev-panel')
	const { taskStatus } = useParams()
  const navigate = useNavigate()

	const [history, setHistory] = useState()
	const [mode, setMode] = useState({
		name: 'З АВТОГЕНЕРАЦІЄЮ',
		autoGenerate: true,
	})

	let state
	let tasks
	if (taskStatus === 'INPROGRESS') {
		state = useGetTaskInProgress()
    tasks = state.tasks
	} else {
		state = useGetHistoryDev(mode)
		tasks = state.tasks.filter(
			item => item.task?.autoGenerate === mode.autoGenerate
		)
	}

	const patchFileState = usePatchFile()

	const bottomSheetState = useBottomSheet(setHistory)
	const showPopupFilterState = useShowPopup()
  const showPopupHistoryState = useShowPopup()

	return (
		<>
			<div className='container-history-task'>
				<ErrorMessage errors={[state.error, patchFileState.error]} />
				<ScrollTopButton />
				{showPopupFilterState.position && (
					<ActionPopup
						ref={showPopupFilterState.menuRef}
						items={filterHistoryPopupItems(setMode, state.refetch)}
						onClick={showPopupFilterState.close}
						position={showPopupFilterState.position}
					/>
				)}
				{showPopupHistoryState.position && (
					<ActionPopup
						ref={showPopupHistoryState.menuRef}
						items={itemHistoryPopupItems(
							() =>
								navigate(
									`/settings/dev-panel/history/${taskStatus}/edit-history-file`
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
					state={state}
					tasks={tasks}
					history={history}
					setHistory={setHistory}
					bottomSheetState={bottomSheetState}
					showPopupFilterState={showPopupFilterState}
					showPopupHistoryState={showPopupHistoryState}
					mode={mode}
					taskStatus={taskStatus}
				/>
				<BottomSheetHistory
					bottomSheetState={bottomSheetState}
					patchFileState={patchFileState}
					historyRefetch={state.refetch}
					taskStatus={taskStatus}
					history={history}
				/>
			</div>
		</>
	)
}
