import './styles.css'

import { useState } from 'react'

import { TextHeader, LinkText } from './ui'
import {
	ActionPopup,
	ErrorMessage,
	ListTemplate,
	FixedButton,
	OptionRow,
	CategoriesWrapper,
	Checkbox,
} from '../../../shared/ui'

import { useSubmitUserCourse } from '../../../features/user/model'
import { useShowPopup } from '../../../shared/hooks'
import { generateCoursePopupItems } from '../../../shared/lib'

import { TwoArrowIcon } from '../../../shared/assets/svg'

export default function ChooseCourse(props) {
	const [course, setCourse] = useState('')
	const [isReadRoles, setIsReadRoles] = useState(false)

	const showPopupState = useShowPopup()
	const stateSubmitUserCourse = useSubmitUserCourse()

	return (
		<>
			<div className='container-choose-course'>
				<ErrorMessage errors={[stateSubmitUserCourse.error]} />
				{showPopupState.position && (
					<ActionPopup
						ref={showPopupState.menuRef}
						items={generateCoursePopupItems(setCourse)}
						onClick={showPopupState.close}
						position={showPopupState.position}
					/>
				)}
				<TextHeader />
				<OptionRow
					header='Курс'
					option={course.courseNumber}
					rightIcon={<TwoArrowIcon />}
					onClick={showPopupState.handleLeftClick}
				/>
				<CategoriesWrapper>
					<ListTemplate
						leftData={
							<Checkbox setIsChecked={setIsReadRoles} isChecked={isReadRoles} />
						}
						centerData={{
							header: <LinkText />,
						}}
					/>
				</CategoriesWrapper>
				<FixedButton
					text={{ default: 'Підтвердити', loading: 'Виконується запит' }}
					isDisabled={stateSubmitUserCourse.isLoading}
					isActive={isReadRoles && course}
					onClick={() => {
						stateSubmitUserCourse.handlePatch(
							course.courseNumber,
							props.setUserCourse
						)
					}}
				/>
			</div>
		</>
	)
}
