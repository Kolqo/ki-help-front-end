import './styles.css'

import { useNavigate, useParams } from 'react-router-dom'

import {
	ButtonTemplate,
	CategoriesWrapper,
	EmptyList,
	ErrorMessage,
	SectionWrapper,
} from '../../../shared/ui'

import { ArrowIcon } from '../../../shared/assets/svg'

import { useGoBack } from '../../../shared/hooks'
import { useSelectedTeachers } from '../../../features/teacher/model'
import { LoadingItem } from '../../../entities'

import { SadSmileTgs } from '../../../shared/assets/tgs'

export default function DiscountTeacher() {
	const { subjectId } = useParams()
	useGoBack(`/settings/admin-panel/list-discount/path=/`)
	const navigate = useNavigate()

	const selectedTeacherState = useSelectedTeachers(subjectId)

	const EmptyTeacherList = () => {
		return (
			<>
				<EmptyList
					text={{
						header: 'Немає вчителя',
						footer:
							'Не знайдено вчителя, виберіть інше предмет або перевірте пізніше',
					}}
					icon={SadSmileTgs}
				/>
			</>
		)
	}

	return (
		<>
			<div className='container-discount-teacher'>
				<ErrorMessage errors={[selectedTeacherState.error]} />
				<SectionWrapper section={{ header: 'ВИКЛАДАЧІ' }}>
					{selectedTeacherState.selectedTeachers.length === 0 &&
					!selectedTeacherState.isLoading ? (
						<EmptyTeacherList />
					) : (
						<CategoriesWrapper>
							{selectedTeacherState.selectedTeachers.map(item => (
								<ButtonTemplate
									key={item.id}
									centerData={{ header: item.name }}
									rightData={<ArrowIcon />}
									onClick={() =>
										navigate(
											`/settings/admin-panel/list-discount/path=/${subjectId}/${item.id}`
										)
									}
								/>
							))}
						</CategoriesWrapper>
					)}

					{selectedTeacherState.isLoading && <LoadingItem count={5} />}
				</SectionWrapper>
			</div>
		</>
	)
}
