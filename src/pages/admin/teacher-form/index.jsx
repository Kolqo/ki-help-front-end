import './styles.css'

import { useRef } from 'react'
import { useParams } from 'react-router-dom'

import {
	AdminHeader,
	ErrorMessage,
	GroupInput,
	FixedButton,
} from '../../../shared/ui'

import { useAddTeacher, useEditTeacher } from '../../../features/teacher/model'
import { useTeacherData } from '../../../features/teacher/hooks'
import { useGoBack, useInputGroup } from '../../../shared/hooks'

import { teacherFormFields } from './const'

export default function TeacherForm() {
	const { subjectID, action } = useParams()
	useGoBack(`/list-task/${subjectID}/filtering`)
	const inputRefs = useRef([])

	const { handleKeyDown, getAllValues, setAllValues } = useInputGroup(
		inputRefs,
		teacherFormFields.length
	)

	const teacherDataState = useTeacherData(action, setAllValues, subjectID)
	const addTeacherState = useAddTeacher()
	const editTeacherState = useEditTeacher()

	return (
		<>
			<div className='container-add-subject'>
				<ErrorMessage
					errors={[addTeacherState.error, editTeacherState.error]}
				/>
				<AdminHeader text={{ header: 'Додати викладача' }} />
				<GroupInput
					fields={teacherFormFields}
					inputRefs={inputRefs}
					onKeyDown={handleKeyDown}
					onChange={() => teacherDataState.handleOnChange(getAllValues())}
				/>
				<FixedButton
					text={{ default: 'Зберегти', loading: 'Виконується запит' }}
					isDisabled={addTeacherState.isLoading || editTeacherState.isLoading}
					isActive={teacherDataState.isActive}
					onClick={() => {
						if (action === 'add')
							addTeacherState.handlePost(teacherDataState.data)
						else editTeacherState.handlePut(teacherDataState.data)
					}}
				/>
			</div>
		</>
	)
}
