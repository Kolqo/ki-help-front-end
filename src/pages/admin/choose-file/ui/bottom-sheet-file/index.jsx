import { useNavigate, useParams } from 'react-router-dom'
import { FileItem } from '../../../../../shared/ui'
import {
  Avatar,
	BottomSheet,
	BottomSheetHeader,
	CategoriesWrapper,
	FixedButton,
	SectionWrapper,
	Table,
} from '../../../../../shared/ui'

export default function BottomSheetFile(props) {
	const { subjectID, action } = useParams()
  const navigate = useNavigate()

	const tableData = {
		ID: props.file?.documentId,
		Створено: (
			<div className='user-avatar'>
				<Avatar diameter='20' photo={props.file?.createdBy.photo} />
				{props.file?.createdBy.username}
			</div>
		),
		Використовується: props.file?.tasks.map(({ title }) => title),
	}

	return (
		<>
			<BottomSheet bottomSheetState={props.bottomSheetState}>
				<BottomSheetHeader
					text={{
						header: 'Інформація про файл',
						footer: 'Дізнатися більше інформаці про файл',
					}}
				/>
				<Table data={tableData} />
				<SectionWrapper section={{ header: 'ФАЙЛ ДЛЯ ПОЯСНЕННЯ' }}>
					<CategoriesWrapper>
						<FileItem centerData={{ header: props.file?.fileName }} />
					</CategoriesWrapper>
				</SectionWrapper>
				<FixedButton
					text={{ default: 'Додати', loading: 'Виконується запит' }}
					isActive={true}
					onClick={() => {
						props.taskDataState.updateData({ document: props.file })
						navigate(`/list-task/${subjectID}/task-form/${action}`)
					}}
				/>
			</BottomSheet>
		</>
	)
}
