import './styles.css'

import { useNavigate, useParams } from 'react-router-dom'

import { ChoiceItemList } from '../../../entities'

import { FixedButton, ErrorMessage } from '../../../shared/ui'

import { useCheckboxState } from '../../../entities/choice-item/model'
import { useSelectedUserByRole } from '../../../features/user/model'
import { useTaskData } from '../../../features/task/hooks'
import { useGoBack } from '../../../shared/hooks'

export default function ChooseDeveloper() {
	const { subjectID, action } = useParams()
	const navigate = useNavigate()

	useGoBack(`/list-task/${subjectID}/task-form/${action}`)

	const selectedDeveloperState = useSelectedUserByRole('ROLE_DEVELOPER')
	const taskDataState = useTaskData()

	const checkboxState = useCheckboxState(
		selectedDeveloperState.selectedUserByRole,
		taskDataState.data.developer,
		true,
		'developer'
	)

	const isActive = Object.values(checkboxState.checkedState).includes(true)

	const selectedDeveloper = Object.keys(checkboxState.checkedState)
		.filter(id => checkboxState.checkedState[id])
		.map(id => checkboxState.itemsMap[id])

	return (
		<>
			<div className='container-choose-developer'>
				<ErrorMessage errors={[selectedDeveloperState.error]} />
				<ChoiceItemList
					section={{ header: 'РОЗРОБНИК' }}
					isChecked={checkboxState.checkedState}
					setIsChecked={checkboxState.changeCheckedState}
					objectList={selectedDeveloperState.selectedUserByRole}
					isLoading={selectedDeveloperState.isLoading}
					displayMode={'developer'}
				/>
				<FixedButton
					text={{ default: 'Підтвердити', loading: 'Виконується запит' }}
					isDisabled={false}
					isActive={isActive}
					onClick={() => {
						taskDataState.updateData({ developer: selectedDeveloper[0] })
						navigate(`/list-task/${subjectID}/task-form/${action}`)
					}}
				/>
			</div>
		</>
	)
}
