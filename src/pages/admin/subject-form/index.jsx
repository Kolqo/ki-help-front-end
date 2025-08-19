import './styles.css'

import { useRef } from 'react'
import { useParams } from 'react-router-dom'

import {
	AdminHeader,
	ErrorMessage,
	GroupInput,
	FixedButton,
	OptionRow,
	ActionPopup,
} from '../../../shared/ui'

import { TwoArrowIcon } from '../../../shared/assets/svg'

import { useAddSubject, useEditSubject } from '../../../features/subject/model'
import { useSubjectData } from '../../../features/subject/hooks'
import { useGoBack, useInputGroup, useShowPopup } from '../../../shared/hooks'

import { subjectFormFields } from './const'
import { generateCoursePopupItems } from '../../../shared/lib'

export default function EditDeveloper() {
	useGoBack(`/`)
	const { action } = useParams()

	const inputRefs = useRef([])

	const { handleKeyDown, getAllValues, setAllValues } = useInputGroup(
		inputRefs,
		subjectFormFields.length
	)

	const subjectDataState = useSubjectData(action, setAllValues)
	const showPopupState = useShowPopup()
	const addSubjectState = useAddSubject()
	const editSubjectState = useEditSubject()

	return (
		<>
			<div className='container-add-subject'>
				<ErrorMessage
					errors={[addSubjectState.error, editSubjectState.error]}
				/>
				{showPopupState.position && (
					<ActionPopup
						ref={showPopupState.menuRef}
						items={generateCoursePopupItems(subjectDataState.updateData)}
						onClick={showPopupState.close}
						position={showPopupState.position}
					/>
				)}
				<AdminHeader text={{ header: 'Додати предмет' }} />
				<GroupInput
					fields={subjectFormFields}
					inputRefs={inputRefs}
					onKeyDown={handleKeyDown}
					onChange={() => subjectDataState.handleOnChange(getAllValues())}
				/>
				<OptionRow
					header='Курс'
					option={subjectDataState.data.courseNumber}
					rightIcon={<TwoArrowIcon />}
					onClick={showPopupState.handleLeftClick}
				/>
				<FixedButton
					text={{ default: 'Зберегти', loading: 'Виконується запит' }}
					isDisabled={addSubjectState.isLoading || editSubjectState.isLoading}
					isActive={subjectDataState.isActive}
					onClick={() => {
						if (action === 'add')
							addSubjectState.handlePost(subjectDataState.data)
						else editSubjectState.handlePatch(subjectDataState.data)
					}}
				/>
			</div>
		</>
	)
}
