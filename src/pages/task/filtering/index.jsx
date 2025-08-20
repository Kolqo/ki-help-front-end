import './styles.css'

import { useNavigate, useParams } from 'react-router-dom'

import { ChoiceItemList } from '../../../entities'

import { EntityPopup } from '../../../features/entity/ui'
import { FixedButton, Adder, ErrorMessage } from '../../../shared/ui'

import { useCheckboxState } from '../../../entities/choice-item/model'
import {
	useSelectedTeachers,
	useDeleteTeacher,
} from '../../../features/teacher/model'
import { useGoBack, useShowPopup, useRoles } from '../../../shared/hooks'
import { useDeleteHandler } from '../../../shared/lib'

export default function Filtering() {
	const { subjectID } = useParams()
	const { isAdmin } = useRoles()
	const navigate = useNavigate()

	useGoBack(`/list-task/${subjectID}`)

	const selectedTeacherState = useSelectedTeachers(subjectID)
	const deleteTeacherState = useDeleteTeacher()
	const showPopupState = useShowPopup()

	const deleteArgument = useDeleteHandler(
		deleteTeacherState.handleDelete,
		selectedTeacherState.refetch
	)

  const teacher = JSON.parse(localStorage.getItem('choseTeacher'))

	const checkboxState = useCheckboxState(
		selectedTeacherState.selectedTeachers,
		teacher,
		true
	)

	localStorage.removeItem('teacherCurrent')
	localStorage.removeItem('teacherDraft')


	const isActive = Object.values(checkboxState.checkedState).includes(true)

	const selectedTeacher = Object.keys(checkboxState.checkedState)
		.filter(id => checkboxState.checkedState[id])
		.map(id => checkboxState.itemsMap[id])

	return (
		<>
			<div className='container-filter'>
				<ErrorMessage
					errors={[selectedTeacherState.error, deleteTeacherState.error]}
				/>
				<EntityPopup
					deleteSubject={deleteArgument}
					showPopupState={showPopupState}
					editLink={`/list-task/${subjectID}/filtering/teacher-form/edit`}
					localStorageName={'teacherCurrent'}
				/>
				<ChoiceItemList
					section={{ header: 'ВИКЛАДАЧ' }}
					isChecked={checkboxState.checkedState}
					setIsChecked={checkboxState.changeCheckedState}
					objectList={selectedTeacherState.selectedTeachers}
					bindTarget={showPopupState.bindTarget}
					isLoading={
						selectedTeacherState.isLoading || deleteTeacherState.isLoading
					}
					displayMode='default'
				/>
				<Adder
					centerText='Додати викладача'
					onClick={() =>
						navigate(`/list-task/${subjectID}/filtering/teacher-form/add`)
					}
					isVisible={isAdmin()}
				/>
				<FixedButton
					text={{ default: 'Підтвердити', loading: 'Виконується запит' }}
					isActive={isActive}
					onClick={() => {
						localStorage.setItem(
							'choseTeacher',
							JSON.stringify(selectedTeacher[0])
						)
						navigate(`/list-task/${subjectID}`)
					}}
				/>
			</div>
		</>
	)
}
