import './styles.css'

import { useNavigate, useParams } from 'react-router-dom'

import { ChoiceItemList } from '../../../entities'

import { EntityPopup } from '../../../features/entity/ui'
import { FixedButton, ErrorMessage, Adder } from '../../../shared/ui'

import { useCheckboxState } from '../../../entities/choice-item/model'
import {
	useSelectedArguments,
	useDeleteArgument,
} from '../../../features/argument/model'
import { useTaskData } from '../../../features/task/hooks'
import { useGoBack, useRoles, useShowPopup } from '../../../shared/hooks'
import { useDeleteHandler } from '../../../shared/lib'

export default function ChooseArguments() {
	const { subjectID, action } = useParams()
	const navigate = useNavigate()
	const { isAdmin } = useRoles()

	useGoBack(`/list-task/${subjectID}/task-form/${action}`)

	localStorage.removeItem('argumentCurrent')
	localStorage.removeItem('argumentDraft')

	const selectedArgumentsState = useSelectedArguments()
	const deleteArgumentState = useDeleteArgument()
	const showPopupState = useShowPopup()
	const taskDataState = useTaskData()

	const deleteArgument = useDeleteHandler(
		deleteArgumentState.handleDelete,
		selectedArgumentsState.refetch
	)

	const checkboxState = useCheckboxState(
		selectedArgumentsState.selectedArguments,
		taskDataState.data.arguments,
		false
	)

	const isActive = Object.values(checkboxState.checkedState).includes(true)

	const selectedArguments = Object.keys(checkboxState.checkedState)
		.filter(id => checkboxState.checkedState[id])
		.map(id => checkboxState.itemsMap[id])


	return (
		<>
			<div className='container-choose-arguments'>
				<ErrorMessage
					errors={[selectedArgumentsState.error, deleteArgumentState.error]}
				/>
				<EntityPopup
					deleteSubject={deleteArgument}
					showPopupState={showPopupState}
					editLink={`/list-task/${subjectID}/task-form/${action}/choose-arguments/argument-form/edit`}
					localStorageName={'argumentCurrent'}
				/>
				<ChoiceItemList
					section={{ header: 'АРГУМЕНТ' }}
					isChecked={checkboxState.checkedState}
					setIsChecked={checkboxState.changeCheckedState}
					objectList={selectedArgumentsState.selectedArguments}
					bindTarget={showPopupState.bindTarget}
					isLoading={
						selectedArgumentsState.isLoading || deleteArgumentState.isLoading
					}
					displayMode={'argument'}
				/>
				<Adder
					centerText='Додати аргумент'
					onClick={() =>
						navigate(
							`/list-task/${subjectID}/task-form/${action}/choose-arguments/argument-form/add`
						)
					}
					isVisible={isAdmin()}
				/>
				<FixedButton
					text={{ default: 'Підтвердити', loading: 'Виконується запит' }}
					isDisabled={false}
					isActive={isActive}
					onClick={() => {
						taskDataState.updateData({ arguments: selectedArguments })
						navigate(`/list-task/${subjectID}/task-form/${action}`)
					}}
				/>
			</div>
		</>
	)
}
