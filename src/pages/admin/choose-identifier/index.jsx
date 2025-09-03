import './styles.css'

import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import {  BottomSheetIdentifier, Identifiers } from './ui'
import {
	Adder,
	CategoriesWrapper,
	ErrorMessage,
	ScrollTopButton,
} from '../../../shared/ui'

import {
	useDeleteIdentifier,
	useSelectedIdentifiers,
} from '../../../features/identifier/model'
import { useTaskData } from '../../../features/task/hooks'
import { useGoBack, useBottomSheet, useShowPopup } from '../../../shared/hooks'
import { useDeleteHandler } from '../../../shared/lib'

export default function ChooseIdentifier() {
	const { subjectID, action } = useParams()
	const navigate = useNavigate()

	useGoBack(`/list-task/${subjectID}/task-form/${action}`)

	const [identifier, setIdentifier] = useState()

	const taskDataState = useTaskData()
	const bottomSheetState = useBottomSheet(setIdentifier)
	const showPopupState = useShowPopup()
	const selectedIdentifiersState = useSelectedIdentifiers()
	const deleteIdentifierState = useDeleteIdentifier()
	const deleteFile = useDeleteHandler(
		deleteIdentifierState.handleDelete,
		selectedIdentifiersState.refetch
	)

	return (
		<>
			<div className='container-choose-file'>
				<ErrorMessage
					errors={[selectedIdentifiersState.error, deleteIdentifierState.error]}
				/>
				<ScrollTopButton />
				<Identifiers
					selectedIdentifiersState={selectedIdentifiersState}
					bottomSheetState={bottomSheetState}
					setIdentifier={setIdentifier}
					identifier={identifier}
					deleteFile={deleteFile}
					showPopupState={showPopupState}
				/>
				<CategoriesWrapper>
					<Adder
						centerText='Додати ідентифікатор'
						onClick={() =>
							navigate(
								`/list-task/${subjectID}/task-form/${action}/choose-identifier/add-identifier`
							)
						}
						isVisible={true}
					/>
				</CategoriesWrapper>
				<BottomSheetIdentifier
					taskDataState={taskDataState}
					bottomSheetState={bottomSheetState}
					identifier={identifier}
				/>
			</div>
		</>
	)
}
