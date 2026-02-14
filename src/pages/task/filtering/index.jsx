import './styles.css'
import { useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { ChoiceItemList } from '../../../entities'
import { EntityPopup } from '../../../features/entity/ui'
import {
	FixedButton,
	Adder,
	ErrorMessage,
	CategoriesWrapper,
	SectionWrapper,
} from '../../../shared/ui'

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

	// teacher з localStorage — один раз
	const teacher = useMemo(() => {
		try {
			return JSON.parse(localStorage.getItem('choseTeacher'))
		} catch {
			return null
		}
	}, [])

	// ✅ ці хуки МАЮТЬ викликатися завжди
	const deleteArgument = useDeleteHandler(
		deleteTeacherState.handleDelete,
		selectedTeacherState.refetch,
	)

	const teachersList = selectedTeacherState.selectedTeachers ?? []

	const checkboxState = useCheckboxState(
		teachersList,
		teacher ? [teacher] : null,
		true,
	)

	const isActive = Object.values(checkboxState.checkedState).includes(true)
	const selectedTeacher = checkboxState.selectedItems

	useEffect(() => {
		if (selectedTeacherState.isLoading) return

		if (teachersList.length === 1 && teacher == null) {
			localStorage.setItem('choseTeacher', JSON.stringify(teachersList[0]))
			navigate(`/list-task/${subjectID}`, { replace: true })
			return
		}

		localStorage.removeItem('teacherCurrent')
		localStorage.removeItem('teacherDraft')
	}, [
		selectedTeacherState.isLoading,
		teachersList.length,
		teacher,
		navigate,
		subjectID,
	])

	const shouldBlockRender =
		selectedTeacherState.isLoading ||
		(teachersList.length === 1 && teacher == null)

	if (shouldBlockRender) return null

	return (
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

			<SectionWrapper section={{ header: 'ВИКЛАДАЧ' }}>
				<CategoriesWrapper>
					<Adder
						centerText='Додати викладача'
						onClick={() =>
							navigate(`/list-task/${subjectID}/filtering/teacher-form/add`)
						}
						isVisible={isAdmin()}
					/>
				</CategoriesWrapper>

				<ChoiceItemList
					section={{ header: 'ВИКЛАДАЧ' }}
					isChecked={checkboxState.checkedState}
					setIsChecked={checkboxState.changeCheckedState}
					objectList={teachersList}
					bindTarget={showPopupState.bindTarget}
					isLoading={
						selectedTeacherState.isLoading || deleteTeacherState.isLoading
					}
					displayMode='default'
				/>
			</SectionWrapper>

			<FixedButton
				text={{ default: 'Підтвердити', loading: 'Виконується запит' }}
				isActive={isActive}
				onClick={() => {
					localStorage.setItem(
						'choseTeacher',
						JSON.stringify(selectedTeacher[0]),
					)
					navigate(`/list-task/${subjectID}`)
				}}
			/>
		</div>
	)
}
