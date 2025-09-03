import './styles.css'

import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { ActionPopup, ErrorMessage, ScrollTopButton } from '../../../shared/ui'
import { BottomSheetHistory, HistoryTasks } from './ui'

import {
	useGetHistoryDev,
	useGetTaskInProgress,
	usePatchFile,
} from '../../../features/task/model'
import { useBottomSheet, useGoBack, useShowPopup } from '../../../shared/hooks'
import { filterHistoryPopupItems } from './lib'

export default function DevHistory() {
	useGoBack('/settings/dev-panel')
	const { taskStatus } = useParams()

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
    console.log(state.tasks)
		tasks = state.tasks.filter(
			item => item.task?.autoGenerate === mode.autoGenerate
		)
	}

	const patchFileState = usePatchFile()

	const bottomSheetState = useBottomSheet(setHistory)
	const showPopupState = useShowPopup()

	return (
		<>
			<div className='container-history-task'>
				<ErrorMessage errors={[state.error, patchFileState.error]} />
				<ScrollTopButton />
				{showPopupState.position && (
					<ActionPopup
						ref={showPopupState.menuRef}
						items={filterHistoryPopupItems(setMode, state.refetch)}
						onClick={showPopupState.close}
						position={showPopupState.position}
					/>
				)}
				<HistoryTasks
					state={state}
					tasks={tasks}
					history={history}
					setHistory={setHistory}
					bottomSheetState={bottomSheetState}
					showPopupState={showPopupState}
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
