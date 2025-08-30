import './styles.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
	ActionPopup,
	ButtonTemplate,
	CategoriesWrapper,
	EmptyList,
	ErrorMessage,
	SectionWrapper,
} from '../../../shared/ui'

import { ArrowIcon, TwoArrowIcon } from '../../../shared/assets/svg'

import { useGoBack, useShowPopup } from '../../../shared/hooks'
import { useSelectedSubjects } from '../../../features/subject/model'
import { LoadingItem } from '../../../entities'

import { generateCoursePopupItems } from '../../../shared/lib'

import { SadSmileTgs } from '../../../shared/assets/tgs'

export default function DiscountSubject() {
	useGoBack('/settings/admin-panel/list-discount')

	const [course, setCourse] = useState({ courseNumber: 1 })
	const navigate = useNavigate()
	const selectedSubjectState = useSelectedSubjects(course.courseNumber)
	const showPopupState = useShowPopup()

	const handleUpdateNotification = update => {
		setCourse(update)
	}

	const EmptySubjectList = () => {
		return (
			<>
				<EmptyList
					text={{
						header: 'Немає предмети',
						footer: 'Не знайдено предметів, перевірте пізніше',
					}}
					icon={SadSmileTgs}
				/>
			</>
		)
	}

	return (
		<>
			<div className='container-discount-subject'>
				<ErrorMessage errors={[selectedSubjectState.error]} />
				{showPopupState.position && (
					<ActionPopup
						ref={showPopupState.menuRef}
						items={generateCoursePopupItems(handleUpdateNotification)}
						onClick={showPopupState.close}
						position={showPopupState.position}
					/>
				)}
				<SectionWrapper
					section={{ header: 'ПРЕДМЕТИ' }}
					actionHeader={
						<div
							className='action-header'
							onClick={showPopupState.handleLeftClick}
						>
							{course.courseNumber}
							<TwoArrowIcon />
						</div>
					}
				>
					{selectedSubjectState.selectedSubjects.length === 0 &&
					!selectedSubjectState.isLoading ? (
						<EmptySubjectList />
					) : (
						<CategoriesWrapper>
							{selectedSubjectState.selectedSubjects.map(item => (
								<ButtonTemplate
									key={item.id}
									centerData={{ header: item.name }}
									rightData={<ArrowIcon />}
									onClick={() =>
										navigate(
											`/settings/admin-panel/list-discount/path=/${item.id}`
										)
									}
								/>
							))}
						</CategoriesWrapper>
					)}

					{selectedSubjectState.isLoading && <LoadingItem count={5} />}
				</SectionWrapper>
			</div>
		</>
	)
}
