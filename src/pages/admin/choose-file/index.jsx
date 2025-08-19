import './styles.css'

import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { BottomSheetFile, Files } from './ui'
import { Adder, ErrorMessage, ScrollTopButton } from '../../../shared/ui'

import { useDeleteFile, useSelectedFiles } from '../../../features/file/model'
import { useTaskData } from '../../../features/task/hooks'
import { useGoBack, useBottomSheet, useShowPopup } from '../../../shared/hooks'
import { useDeleteHandler } from '../../../shared/lib'

export default function ChooseFile() {
	const { subjectID, action } = useParams()
	const navigate = useNavigate()

	useGoBack(`/list-task/${subjectID}/task-form/${action}`)

	const [file, setFile] = useState()

	const taskDataState = useTaskData()
	const bottomSheetState = useBottomSheet(setFile)
	const showPopupState = useShowPopup()
	const selectedFilesState = useSelectedFiles()
	const deleteFileState = useDeleteFile()
	const deleteFile = useDeleteHandler(
		deleteFileState.handleDelete,
		selectedFilesState.refetch
	)

	return (
		<>
			<div className='container-choose-file'>
				<ErrorMessage
					errors={[selectedFilesState.error, deleteFileState.error]}
				/>
				<ScrollTopButton />
				<Files
					selectedFilesState={selectedFilesState}
					bottomSheetState={bottomSheetState}
					setFile={setFile}
					file={file}
					deleteFile={deleteFile}
					showPopupState={showPopupState}
				/>
				<Adder
					centerText='Додати пояснення'
					onClick={() =>
						navigate(
							`/list-task/${subjectID}/task-form/${action}/choose-file/add-file`
						)
					}
					isVisible={true}
				/>
				<BottomSheetFile
					taskDataState={taskDataState}
					bottomSheetState={bottomSheetState}
					file={file}
				/>
			</div>
		</>
	)
}
