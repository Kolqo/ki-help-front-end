import './styles.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Courses, Slider, Subjects } from './ui'
import { ErrorMessage, ScrollTopButton, FixedAdder } from '../../../shared/ui'

import {
	useDeleteSubject,
	useSelectedSubjects,
} from '../../../features/subject/model'
import { useShowPopup, useRoles } from '../../../shared/hooks'
import { useDeleteHandler } from '../../../shared/lib'

export default function ListSubject(props) {
	const [course, setCourse] = useState(props?.userCourse)

	const navigate = useNavigate()
	const { isAdmin } = useRoles()

	const selectedSubjectsState = useSelectedSubjects(course)
	const deleteSubjectState = useDeleteSubject()
	const deleteSubject = useDeleteHandler(
		deleteSubjectState.handleDelete,
		selectedSubjectsState.refetch
	)

	const showPopupState = useShowPopup()

	localStorage.removeItem('subjectCurrent')
	localStorage.removeItem('subjectDraft')
	localStorage.removeItem('choseTeacher')



	return (
		<>
			<div className='container-list-subject'>
				<ErrorMessage
					errors={[selectedSubjectsState.error, deleteSubjectState.error]}
				/>
				<ScrollTopButton />
				<Slider />
				<Courses toggle={course} setToggle={setCourse} />
				<Subjects
					showPopupState={showPopupState}
					selectedSubjectsState={selectedSubjectsState}
					deleteSubject={deleteSubject}
				/>
				<FixedAdder
					bottom='110'
					centerText='Додати предмет'
					onClick={() => navigate(`/subject-form/add`)}
					isVisible={isAdmin()}
				/>
			</div>
		</>
	)
}
