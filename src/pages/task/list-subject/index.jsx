import './styles.css'

import { useEffect, useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Courses, Slider, Subjects } from './ui'
import { ErrorMessage, Adder, ScrollTopButton, CategoriesWrapper } from '../../../shared/ui'

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
				<button onClick={() => navigate('/chat-ai')}>chat</button>
				<Subjects
					showPopupState={showPopupState}
					selectedSubjectsState={selectedSubjectsState}
					deleteSubject={deleteSubject}
				/>
				<CategoriesWrapper>
					<Adder
						centerText='Додати предмет'
						onClick={() => navigate(`/subject-form/add`)}
						isVisible={isAdmin()}
					/>
				</CategoriesWrapper>
			</div>
		</>
	)
}
