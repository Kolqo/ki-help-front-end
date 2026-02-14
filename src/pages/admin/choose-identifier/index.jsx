import './styles.css'

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import {  BottomSheetIdentifier, Identifiers } from './ui'
import {
	ErrorMessage,
	FixedAdder,
	ScrollTopButton,
} from '../../../shared/ui'

import {
	useDeleteIdentifier,
	usePutIdentifier,
	useSelectedIdentifiers,
} from '../../../features/identifier/model'
import { useTaskData } from '../../../features/task/hooks'
import { useGoBack, useBottomSheet, useShowPopup } from '../../../shared/hooks'
import { useDeleteHandler } from '../../../shared/lib'

export default function ChooseIdentifier() {
	const { subjectID, action } = useParams()
	const navigate = useNavigate()

	useGoBack(`/list-task/${subjectID}/task-form/${action}`)
  
  const chooseIdentifier = JSON.parse(localStorage.getItem('chooseIdentifier'))

	const [identifier, setIdentifier] = useState(chooseIdentifier || null)

  const bottomSheetState = useBottomSheet(setIdentifier)
	const taskDataState = useTaskData()
	const showPopupState = useShowPopup()

	const putIdentifierState = usePutIdentifier()
	const selectedIdentifiersState = useSelectedIdentifiers()
	const deleteIdentifierState = useDeleteIdentifier()
	const deleteFile = useDeleteHandler(
		deleteIdentifierState.handleDelete,
		selectedIdentifiersState.refetch
	)

  useEffect(() => {
		if (chooseIdentifier) {
			bottomSheetState.openSheet()
		}
	}, [])
  

	return (
		<>
			<div className='container-choose-file'>
				<ErrorMessage
					errors={[
						selectedIdentifiersState.error,
						deleteIdentifierState.error,
						putIdentifierState.error,
					]}
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
				<FixedAdder
					centerText='Додати ідентифікатор'
					onClick={() =>
						navigate(
							`/list-task/${subjectID}/task-form/${action}/choose-identifier/add-identifier`
						)
					}
					isVisible={true}
				/>
				<BottomSheetIdentifier
					taskDataState={taskDataState}
          putIdentifierState={putIdentifierState}
					bottomSheetState={bottomSheetState}
					identifier={identifier}
				/>
			</div>
		</>
	)
}
